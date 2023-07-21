function Beatmap () {
	this.initialize.apply(this, arguments);
}

Beatmap.RELATED_EXPRESSIONS_WITHOUT_X = {
	title: function () {
		return this.title;
	},
	musicAuthor: function () {
		return this.musicAuthor;
	},
	artist: function () {
		return this.musicAuthor;
	},
	beatmapAuthor: function () {
		return this.beatmapAuthor;
	},
	beatmapper: function () {
		return this.beatmapAuthor;
	},
	difficulty: function () {
		return this.difficulty;
	},
	start: function () {
		return this.start;
	}
};

Beatmap.TRUE_LENGTH_CALC = fracmath.parse('(1/2)^length*(2-(1/2)^dots)').compile();
Beatmap.TRUE_LENGTH_CALC = Beatmap.TRUE_LENGTH_CALC.evaluate.bind(Beatmap.TRUE_LENGTH_CALC);

Beatmap.prototype.initialize = function (url) {
	this.url = url;
};

Beatmap.prototype.load = async function () {
	let [head, data] = eol.lf(await fetch(this.url).then(r => r.text())).split('---\n');
	head = head.split('\n').map(s => s.split(': '));
	const dataLineno = head.length + 1;
	for (let i = 0; i < head.length; i++) {
		head[i][0] = head[i][0].trimStart();
		if (head[i].length > 2)
			head[i] = [head[i][0], head[i].slice(1).join(': ')];
		else if (head[i].length === 1)
			head[i][1] = '';
	}
	head = Object.fromEntries(head);
	data = data.split('\n');
	this.title = head.title || '';
	this.audioUrl = head.audioUrl;
	this.musicAuthor = head.musicAuthor || '';
	this.beatmapAuthor = head.beatmapAuthor || '';
	this.difficulty = head.difficulty || Strings.defaultDifficulty;
	this.title = this.title.trim();
	if (this.audioUrl)
		this.audioUrl = this.audioUrl.trim();
	this.musicAuthor = this.musicAuthor.trim();
	this.beatmapAuthor = this.beatmapAuthor.trim();
	this.difficulty = this.difficulty.trim();
	this.start = head.start ? parseFloat(head.start) : 0.0;
	this.end = head.end ? parseFloat(head.end) : this.audioUrl ? await TyphmUtils.getAudioDuration(this.audioUrl) || null : null;
	this.length = this.end && this.end - this.start;
	this.volume = head.volume ? parseFloat(head.volume) : 1.0;
	this.offset = head.offset ? parseFloat(head.offset) : 0.0;
	this.pseWarning = head.pseWarning === 'true';
	this.parse(data, dataLineno)
};

Beatmap.prototype.parse = function (data, dataLineno) {
	this.events = [];
	let voices = [];
	let isCommented = false;
	for (let lineno = 0; lineno < data.length; lineno++) {
		let line = data[lineno].trimStart();
		if (isCommented) {
			if (line === '=end')
				isCommented = false;
			continue;
		}
		if (line[0] === '#') { // comments
		} else if (line === '=begin') {
			isCommented = true;
		} else if (/[A-Z_].*/y.test(line)) { // control sentence
			if (voices.length > 0) {
				this.events.push({"event": "row", "voices": voices, "lineno": lineno + dataLineno});
				voices = [];
			}
			const [keyword, ...parameters] = line.split(' ');
			this.events.push({"event": "control", "keyword": keyword, "parameters": parameters, "lineno": lineno + dataLineno});
		} else if (line === '') { // empty line
			if (voices.length > 0) {
				this.events.push({"event": "row", "voices": voices, "lineno": lineno + dataLineno});
				voices = [];
			}
		} else { // voice
			voices.push([]);
			let stackLevel = 0;
			let position = 0;
			while (position < line.length) {
				if (line[position] === '#') {
					break;
				}
				if (line[position] === '(') { // group start
					voices.push([]); // use voices as a stack... will pop!
					position++;
					stackLevel++;
					continue;
				}
				if (line[position] === '|') { // barline
					voices.last().push({"event": "barline", "lineno": lineno + dataLineno, "column": position + 1});
					position++;
					continue;
				}
				if (line[position] === ' ') {
					position++;
					continue;
				}
				
				// start parsing a note here!
				const noteEvent = {"event": "note", "lineno": lineno + dataLineno, "column": position + 1};
				
				// note length
				let [isNumber, theNumber, newPosition] = this.parseNumberInBeatmap(line, position, lineno + dataLineno);
				if (isNumber) {
					noteEvent.length = theNumber;
					position = newPosition;
				} else
					throw new BeatmapError(lineno + dataLineno, position + 1, "expected [0-9a-z\\[], found " + line[position]);
				
				// dots
				let dots = 0;
				while (line[position] === '.') {
					dots++;
					position++;
				}
				noteEvent.dots = dots;
				
				// multiplicity
				[isNumber, theNumber, newPosition] = this.parseNumberInBeatmap(line, position, lineno + dataLineno);
				if (isNumber) {
					noteEvent.multiplicity = theNumber;
					position = newPosition;
				} else
					noteEvent.multiplicity = 1;
				
				// hold
				if (line[position] === '_') {
					noteEvent.hold = true;
					position++;
				} else
					noteEvent.hold = false;
				
				// big
				if (line[position] === '*') {
					noteEvent.big = true;
					position++;
				} else
					noteEvent.big = false;
				
				// tie
				if (line[position] === '~') {
					noteEvent.tie = true;
					position++;
				} else
					noteEvent.tie = false;
				
				// end parsing a note here!
				voices.last().push(noteEvent);
				
				while (line[position] === ')') { // group end
					position++;
					stackLevel--;
					if (stackLevel < 0) {
						throw new BeatmapError(lineno + dataLineno, position + 1, 'excess right parentheses');
					}
					const group = voices.pop();
					const groupEvent = {"event": "group", "notes": group, "lineno": lineno + dataLineno, "column": position + 1};
					[isNumber, theNumber, newPosition] = this.parseNumberInBeatmap(line, position, lineno + dataLineno);
					if (isNumber) {
						groupEvent.ratio1 = theNumber;
						position = newPosition;
						[isNumber, theNumber, newPosition] = this.parseNumberInBeatmap(line, position, lineno + dataLineno);
						if (isNumber) {
							position = newPosition;
							groupEvent.ratio2 = theNumber;
							groupEvent.ratio = frac(groupEvent.ratio2, groupEvent.ratio1);
						} else { // default value of ratio2 is 2 ** floor(log2(ratio1))
							groupEvent.ratio2 = null;
							let i = 0;
							for (let x = groupEvent.ratio1; x >>= 1; i++);
							groupEvent.ratio = frac(2).pow(i).div(groupEvent.ratio1);
						}
					} else {
						groupEvent.ratio1 = null;
						groupEvent.ratio2 = null;
						groupEvent.ratio = frac(1);
					}
					voices.last().push(groupEvent);
				}
			}
			if (stackLevel > 0) {
				throw new BeatmapError(lineno + dataLineno, position + 1, 'missed right parentheses');
			}
		}
	}
	if (voices.length > 0)
		this.events.push({"event": "row", "voices": voices, "lineno": data.length + 1 + dataLineno});
};

// returns: [isNumber, theNumber, newPosition]
Beatmap.prototype.parseNumberInBeatmap = function (line, position, lineno) {
	let charCode = line.charCodeAt(position);
	let theNumber = 0;
	if (charCode >= 48 && charCode < 58) { // 0--9
		theNumber = charCode - 48;
		position++;
		return [true, theNumber, position];
	} else if (charCode >= 97 && charCode < 123) { // a--z
		theNumber = charCode - 97 + 10;
		position++;
		return [true, theNumber, position];
	} else if (charCode === 91) { // [
		position++;
		while (true) {
			charCode = line.charCodeAt(position);
			position++;
			if (charCode === 93) { // ]
				return [true, theNumber, position];
			} else if (charCode >= 48 && charCode < 58) { // 0--9
				theNumber = theNumber * 10 + (charCode - 48);
			} else {
				throw new BeatmapError(lineno, position, "expected [0-9\\]], found " + String.fromCharCode(charCode));
			}
		}
	} else {
		return [false, theNumber, position];
	}
};

Beatmap.prototype.defineKeywordAlias = function (alias, original) {
	this.controlSentenceApplications[alias] = this.controlSentenceApplications[original];
};

Beatmap.prototype.deleteKeyword = function (keyword) {
	delete this.controlSentenceApplications[keyword];
};

Beatmap.prototype.hasKeyword = function (keyword) {
	return !!this.controlSentenceApplications[keyword];
};

Beatmap.prototype.setMirror = function (mirror, mirrorLowerRow) {
	if (mirror) {
		for (const row of this.rows)
			row.mirror = true;
	}
	if (mirrorLowerRow) {
		for (let i = 1; i < this.rows.length; i += 2)
			this.rows[i].mirror = !this.rows[i].mirror;
	}
};

Beatmap.prototype.prepare = function (level) {
	Row.prepare();
	this.currentX = 0;
	this.currentRow = null;
	this.controlSentenceApplications = {...ControlSentence.DEFAULT_APPLICATIONS};
	for (const [alias, original] of Object.entries(ControlSentence.DEFAULT_ALIASES))
		this.defineKeywordAlias(alias, original);
	this.expressions = {};
	this.expressionsWithoutX = {};
	this.setUpExpressionsWithoutXFrom(preferences);
	this.setUpExpressionsWithoutXFrom(Object.fromEntries(
		Object.entries(Scene_Preferences.DEFAULT_ALIASES).map(([alias, original]) => [alias, preferences[original]])));
	this.setUpBeatmapRelatedExpressions();
	this.setUpRowRelatedExpressions();
	this.setUpLevelRelatedExpressions(level);
};

Beatmap.prototype.drawRows = function (reverseVoices) {
	this.rows = [new Row(this, 0)];
	this.notes = [];
	this.barLines = [];
	const lastEnv = {
		rowNotes: [],
		rowEndTime: this.offset,
		BPM: undefined,
		beatLength: TyphmConstants.DEFAULT_BEAT_NOTE,
		beatDots: 0,
		millisecondsPerWhole: TyphmConstants.DEFAULT_MILLISECONDS_PER_WHOLE
	};
	const controlSentenceStack = [];
	const callers = [{caller: 'main'}];
	const block = {contents: []};
	for (let i = 0; i < this.events.length; i++) {
		const event = this.events[i];
		const row = this.currentRow = this.rows.last();
		if (event.event === 'control') {
			const blockOwner = controlSentenceStack.last();
			const controlSentence = new ControlSentence(event.keyword, event.parameters, event.lineno, this);
			controlSentence.lastEnv = lastEnv;
			let isInBlock = false;
			if (blockOwner) {
				isInBlock = true;
				blockOwner.addToBlock(controlSentence);
				if (!blockOwner.hasOpenBlock) {
					controlSentenceStack.pop();
					if (controlSentenceStack.length === 0) {
						block.contents.push(blockOwner);
					}
				}
			}
			if (controlSentence.hasOpenBlock) {
				controlSentenceStack.push(controlSentence);
			} else if (!isInBlock) {
				block.contents.push(controlSentence);
			}
		} else if (event.event === 'row') {
			const blockOwner = controlSentenceStack.last();
			if (blockOwner)
				blockOwner.throwRuntimeError(`${blockOwner.keyword}: missing END`, callers);
			row.initialSetUp(event.voices, lastEnv);
			const result = ControlSentence.executeBlock(block, row, callers);
			if (result && result.signal === 'break')
				throw new BeatmapRuntimeError(`BREAK: misplaced or too deep`, result.callers);
			block.contents = [];
			row.finalSetUp(reverseVoices, lastEnv);
			this.rows.push(new Row(this, this.rows.length));
		}
	}
	this.rows.pop();
	this.notes.sort((n1, n2) => n1.time - n2.time);
};

Beatmap.prototype.setUpExpressionsWithoutXFrom = function (object) {
	for (const identifier in object) {
		Object.defineProperty(this.expressionsWithoutX, identifier, {
			get: () => object[identifier],
			configurable: true,
			enumerable: true
		});
	}
};

Beatmap.prototype.setUpRowRelatedExpressions = function () {
	for (const identifier in Row.RELATED_EXPRESSIONS_WITHOUT_X) {
		Object.defineProperty(this.expressionsWithoutX, identifier, {
			get: () => Row.RELATED_EXPRESSIONS_WITHOUT_X[identifier].call(this.currentRow),
			configurable: true,
			enumerable: true
		})
	}
	for (const identifier in Row.RELATED_EXPRESSIONS) {
		Object.defineProperty(this.expressions, identifier, {
			get: () => Row.RELATED_EXPRESSIONS[identifier].call(this.currentRow),
			configurable: true,
			enumerable: true
		})
	}
};

Beatmap.prototype.setUpBeatmapRelatedExpressions = function () {
	for (const identifier in Beatmap.RELATED_EXPRESSIONS_WITHOUT_X) {
		Object.defineProperty(this.expressionsWithoutX, identifier, {
			get: () => Beatmap.RELATED_EXPRESSIONS_WITHOUT_X[identifier].call(this),
			configurable: true,
			enumerable: true
		})
	}
};

Beatmap.prototype.setUpLevelRelatedExpressions = function (level) {
	for (const identifier in Level.RELATED_EXPRESSIONS) {
		Object.defineProperty(this.expressions, identifier, {
			get: () => Level.RELATED_EXPRESSIONS[identifier].call(level),
			configurable: true,
			enumerable: true
		})
	}
};

Beatmap.prototype.deleteExpression = function (name) {
	if (name in this.expressions)
		delete this.expressions[name];
	if (name in this.expressionsWithoutX)
		delete this.expressionsWithoutX[name];
};

// with x, variable: let
// with x, function: def
// without x, variable: var
// with x, function: fun
Beatmap.prototype.letExpression = function (identifier, expression, expressionHolder, lineno, callers) {
	const formula = this.generateFunctionFromFormula(expressionHolder, lineno, callers, expression, [], true);
	this.deleteExpression(identifier);
	Object.defineProperty(this.expressions, identifier, {get: () => formula(this.currentX), configurable: true, enumerable: true});
};

Beatmap.prototype.defExpression = function (identifier, arguments, expression, expressionHolder, lineno, callers) {
	const formula = this.generateFunctionFromFormula(expressionHolder, lineno, callers, expression, arguments, true);
	this.deleteExpression(identifier);
	Object.setPropertyWithGetter(this.expressions, identifier, (...args) => formula(this.currentX, ...args));
};

Beatmap.prototype.varExpression = function (identifier, expression, expressionHolder, lineno, callers) {
	this.varValue(identifier, this.generateFunctionFromFormulaWithoutX(expressionHolder, lineno, callers, expression)());
};

Beatmap.prototype.funExpression = function (identifier, arguments, expression, expressionHolder, lineno, callers) {
	const formula = this.generateFunctionFromFormulaWithoutX(expressionHolder, lineno, callers, expression, arguments);
	this.deleteExpression(identifier);
	Object.setPropertyWithGetter(this.expressionsWithoutX, identifier, formula);
};

Beatmap.prototype.varValue = function (identifier, value) {
	this.deleteExpression(identifier);
	Object.setPropertyWithGetter(this.expressionsWithoutX, identifier, value);
};

Beatmap.prototype.recordHitEvent = function (rowIndex, note, y, shouldHit) {
	y -= (note.multiplicity - 1) * preferences.headsRadius;
	if (shouldHit) {
		note.hitEvents = [];
		for (let i = 0; i < note.multiplicity; i++) {
			const hitEvent = {"x": note.x, "hitX": note.hitX, "y": y+i*preferences.headsRadius*2, "xEnd": note.xEnd, "time": note.time, "timeEnd": note.timeEnd,
				"big": note.big, "hold": note.hold, "solid": note.length > 1, "rowIndex": rowIndex};
			note.hitEvents.push(hitEvent);
			this.notes.push(hitEvent);
		}
	} else {
		let tiedNote = note.tiedNote;
		while (tiedNote.tiedNote) {
			tiedNote = tiedNote.tiedNote;
		}
		for (let i = 0; i < note.multiplicity; i++) {
			tiedNote.hitEvents[i].ySwitches ||= [];
			tiedNote.hitEvents[i].timeEnd = note.timeEnd;
			tiedNote.hitEvents[i].xEnd = note.xEnd;
			tiedNote.hitEvents[i].ySwitches.push({"time": note.time, "y": y + i*preferences.headsRadius*2, "rowIndex": rowIndex});
		}
		note.hold = tiedNote.hold;
	}
};

Beatmap.prototype.trackHoldTo = function (now, xNow, hitEvent, judge, row) {
	let y = hitEvent.y;
	let x = hitEvent.x + preferences.headsRadius;
	let eventRowIndex = hitEvent.rowIndex;
	//let reachedEnd = true;
	if (hitEvent.ySwitches) {
		for (let i = 0; i < hitEvent.ySwitches.length; i++) {
			if (now >= hitEvent.ySwitches[i].time) {
				y = hitEvent.ySwitches[i].y;
				if (eventRowIndex !== hitEvent.ySwitches[i].rowIndex) {
					x = preferences.margin;
					eventRowIndex = hitEvent.ySwitches[i].rowIndex;
				}
			} else {
				//reachedEnd = false;
				break;
			}
		}
	}
	if (eventRowIndex !== row.index)
		return;
	//if (reachedEnd)
	//	xNow = Math.min(xNow, hitEvent.xEnd - preferences.headsRadius);
	row.trackHold(x, xNow, y, judge);
};

Beatmap.prototype.clearNote = function (event, judge) {
	this.rows[event.rowIndex].drawNoteHead(event.x, event.y, event.solid, false, Level.getColorFromJudge(judge));
};

Beatmap.prototype.generateFunctionFromFormula = function (expressionHolder, lineno, callers, formula, parameters, dontUpdateX) {
	parameters ||= [];
	const specificScope = {};
	let parsedNode;
	try {
		parsedNode = math.parse(formula);
	} catch (e) {
		Beatmap.throwExpressionError(expressionHolder, formula, e, callers, lineno);
	}
	const rootNode = parsedNode.transform((node, path, parent) => {
		if (node.isSymbolNode && node.name.startsWith('$')) {
			const identifier = node.name.slice(1);
			if (identifier in this.expressions)
				Object.defineProperty(specificScope, node.name, Object.getOwnPropertyDescriptor(this.expressions, identifier));
			else if (identifier in this.expressionsWithoutX)
				return new math.ConstantNode(this.expressionsWithoutX[identifier]);
		}
		return node;
	});
	const expression = rootNode.compile();
	const beatmap = this;
	const scope = new Proxy(specificScope, {
		get: function (target, p, receiver) {
			if (p in target) {
				return target[p];
			} else if (p in beatmap.expressions) {
				return beatmap.expressions[p];
			} else if (p in beatmap.expressionsWithoutX) {
				return beatmap.expressionsWithoutX[p];
			}
		},
		ownKeys: function (target) {
			return [...Object.getOwnPropertyNames(target), ...Object.getOwnPropertyNames(beatmap.expressions), ...Object.getOwnPropertyNames(beatmap.expressionsWithoutX)];
		},
		getOwnPropertyDescriptor: function (target, p) {
			if (p in target) {
				return Object.getOwnPropertyDescriptor(target, p);
			} else if (p in beatmap.expressions) {
				return Object.getOwnPropertyDescriptor(beatmap.expressions, p);
			} else if (p in beatmap.expressionsWithoutX) {
				return Object.getOwnPropertyDescriptor(beatmap.expressionsWithoutX, p);
			}
		},
		has: function (target, p) {
			return p in target || p in beatmap.expressions || p in beatmap.expressionsWithoutX;
		}
	});
	return (x, ...param) => {
		if (!dontUpdateX)
			this.currentX = x;
		specificScope.x = Number(x);
		Object.assign(specificScope, Object.fromKeysAndValues(parameters, param.map(a => Number(a))));
		try {
			return expression.evaluate(scope);
		} catch (e) {
			Beatmap.throwExpressionError(expressionHolder, formula, e, callers, lineno, x);
		}
	};
};

Beatmap.prototype.generateFunctionFromFormulaWithoutX = function (expressionHolder, lineno, callers, formula, parameters) {
	parameters ||= [];
	const specificScope = {};
	let parsedNode;
	try {
		parsedNode = math.parse(formula);
	} catch (e) {
		Beatmap.throwExpressionError(expressionHolder, formula, e, callers, lineno);
	}
	const rootNode = parsedNode.transform((node, path, parent) => {
		if (node.isSymbolNode && node.name.startsWith('$')) {
			const identifier = node.name.slice(1);
			if (identifier in this.expressionsWithoutX)
				return new math.ConstantNode(this.expressionsWithoutX[identifier]);
		}
		return node;
	});
	const expression = rootNode.compile();
	const beatmap = this;
	const scope = new Proxy(specificScope, {
		get: function (target, p, receiver) {
			if (p in target) {
				return target[p];
			} else if (p in beatmap.expressionsWithoutX) {
				return beatmap.expressionsWithoutX[p];
			}
		},
		ownKeys: function (target) {
			return [...Object.getOwnPropertyNames(target), ...Object.getOwnPropertyNames(beatmap.expressionsWithoutX)];
		},
		getOwnPropertyDescriptor: function (target, p) {
			if (p in target) {
				return Object.getOwnPropertyDescriptor(target, p);
			} else if (p in beatmap.expressionsWithoutX) {
				return Object.getOwnPropertyDescriptor(beatmap.expressionsWithoutX, p);
			}
		},
		has: function (target, p) {
			return p in target || p in beatmap.expressionsWithoutX;
		}
	});
	return (...param) => {
		Object.assign(specificScope, Object.fromKeysAndValues(parameters, param.map(a => Number(a))));
		try {
			return expression.evaluate(scope);
		} catch (e) {
			Beatmap.throwExpressionError(expressionHolder, formula, e, callers, lineno);
		}
	}
};

Beatmap.throwExpressionError = function (expressionHolder, formula, error, callers, lineno, currentX) {
	callers = [...callers]
	callers[0] = {lineno: lineno, caller: callers[0].caller};
	throw new BeatmapExpressionError(expressionHolder, formula, error, callers, currentX);
};
