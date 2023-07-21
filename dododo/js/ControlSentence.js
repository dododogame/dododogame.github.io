function ControlSentence () {
	this.initialize.apply(this, arguments);
}

ControlSentence.DEFAULT_ALIASES = {
	BEATS_PER_MINUTE: 'BPM',
	MILLISECONDS_PER_WHOLE: 'MS_PER_WHOLE',
	JUDGEMENT_LINE_OPACITY: 'JUDGEMENT_LINE_ALPHA',
	VARIABLE: 'VAR',
	DEFINE: 'DEF',
	FUNCTION: 'FUN',
	// FOLLOWING ARE OBSOLETE
	SPACE_X: 'JUDGEMENT_LINE_X',
	SPACE_Y: 'JUDGEMENT_LINE_Y',
	WIDTH: 'JUDGEMENT_LINE_WIDTH',
	HEIGHT: 'JUDGEMENT_LINE_HEIGHT',
	RED: 'JUDGEMENT_LINE_RED',
	GREEN: 'JUDGEMENT_LINE_GREEN',
	BLUE: 'JUDGEMENT_LINE_BLUE',
	ALPHA: 'JUDGEMENT_LINE_ALPHA',
	OPACITY: 'JUDGEMENT_LINE_ALPHA',
	BLEND_MODE: 'JUDGEMENT_LINE_BLEND_MODE',
	FAKE_JUDGE_LINE: 'FAKE_JUDGEMENT_LINE'
};

ControlSentence.BLOCK_SEPARATORS = {
	IF: ['ELSE', 'ELSE_IF'],
	WHILE: [],
	FOR: [],
	//TRY: ['RESCUE'],
	PROCEDURE: [],
	//SCHEDULE: []
};

ControlSentence.prototype.initialize = function (keyword, parameters, lineno, beatmap) {
	this.parameters = parameters;
	this.lineno = lineno;
	this._beatmap = beatmap;
	this.keyword = keyword;
	const blockSeparators = ControlSentence.BLOCK_SEPARATORS[keyword];
	if (blockSeparators) {
		this.blockSeparators = blockSeparators;
		this.currentBlock = {main: true, beginning: this, contents: []};
		this.blocks = [this.currentBlock];
		this.hasOpenBlock = true;
	} else {
		this.hasOpenBlock = false;
	}
};

ControlSentence.prototype.addToBlock = function (controlSentence) {
	if (this.blockSeparators.includes(controlSentence.keyword)) {
		this.currentBlock = {main: false, beginning: controlSentence, contents: []};
		this.blocks.push(this.currentBlock);
	} else if (controlSentence.keyword === 'END') {
		this.hasOpenBlock = false;
		this.currentBlock = null;
	} else {
		this.currentBlock.contents.push(controlSentence);
	}
};

ControlSentence.prototype.applyTo = function (row, callers) {
	return this._beatmap.controlSentenceApplications[this.keyword].call(this, row, callers);
};

ControlSentence.prototype.throwRuntimeError = function (message, callers) {
	callers = [...callers];
	callers[0] = {lineno: this.lineno, caller: callers[0].caller};
	throw new BeatmapRuntimeError(message, callers);
};

ControlSentence.DEFAULT_APPLICATIONS = {};

ControlSentence.DEFAULT_APPLICATIONS.BPM = function (row, callers) {
	let normalizationDenominator = 0;
	const positions = [frac(0)];
	const durations = [0];
	row.BPMMarkers = [];
	const BPMData = this.parameters;
	
	for (let i = 0; i < BPMData.length; i += 3) {
		// beat note
		const beatNote = BPMData[i];
		if (!/[\da-z]\.*/y.test(beatNote))
			this.throwRuntimeError(`BPM: invalid beat note: ${beatNote}`, callers);
		const length = TyphmUtils.parseDigit(beatNote[0]);
		const dots = beatNote.length - 1;
		
		// BPM
		const BPMString = BPMData[i + 1];
		const bpm = Number(BPMString);
		if (!bpm) {
			this.throwRuntimeError(`BPM: invalid BPM: ${BPMString}`, callers);
		} else if (bpm <= 0)
			this.throwRuntimeError(`BPM: BPM is zero or negative: ${BPMString}`, callers);
		
		// position
		const positionString = BPMData[i + 2];
		let position
		try {
			position = frac(positionString || 0);
		} catch (e) {
			if (e.message === 'Invalid argument') {
				this.throwRuntimeError(`BPM: invalid position of BPM indicator: ${positionString}`, callers);
			} else
				throw e;
		}
		if (position.compare(1) > 0 || position.compare(0) < 0)
			this.throwRuntimeError(`BPM: position of BPM indicator is out of range [0,1]: ${positionString}`, callers)
		
		row.BPMMarkers.push({'length': length, 'dots': dots, 'bpm': bpm, 'position': position});
		if (i === 0 && position.compare(0) <= 0) {
			this.lastEnv.BPM = bpm;
			this.lastEnv.beatLength = length;
			this.lastEnv.beatDots = dots;
			continue;
		}
		const beatTrueLength = Beatmap.TRUE_LENGTH_CALC({'length': this.lastEnv.beatLength, 'dots': this.lastEnv.beatDots});
		const duration = numre('bignumber((position-lastPosition)/trueLength)/lastBPM',
			{'lastBPM':this.lastEnv.BPM,'trueLength':beatTrueLength,'position':position,'lastPosition':positions.last()||0});
		durations.push(normalizationDenominator = normalizationDenominator + duration);
		positions.push(position);
		this.lastEnv.BPM = bpm;
		this.lastEnv.beatLength = length;
		this.lastEnv.beatDots = dots;
	}
	const beatTrueLength = Beatmap.TRUE_LENGTH_CALC({'length': this.lastEnv.beatLength, 'dots': this.lastEnv.beatDots});
	const duration = numre('bignumber((position-lastPosition)/trueLength)/lastBPM',
		{'lastBPM':this.lastEnv.BPM,'trueLength':beatTrueLength,'position':frac(1),'lastPosition':positions.last()||0});
	durations.push(normalizationDenominator = normalizationDenominator + duration);
	positions.push(frac(1));
	row.millisecondsPerWhole = 60000*Number(normalizationDenominator);
	
	row.timeFormula = x => {
		let i = 0;
		for (; i < positions.length-1; i++) {
			if (Number(x) <= Number(positions[i+1]))
				break;
		}
		return numre('((d2 - d1)*(x - p1)/(p2 - p1) + d1)/d',
			{'x':Number(x),p1:Number(positions[i]),p2:Number(positions[i+1]),d1:durations[i],d2:durations[i+1],d:normalizationDenominator});
	};
};

ControlSentence.DEFAULT_APPLICATIONS.MS_PER_WHOLE = function (row, callers) {
	row.millisecondsPerWhole = Number(math.re(ControlSentence.calculateValueWithoutX(this.keyword, this.lineno, callers, this.parameters, this._beatmap)));
	if (row.millisecondsPerWhole <= 0) {
		this.throwRuntimeError(`MS_PER_WHOLE: cannot be zero or negative: ${row.millisecondsPerWhole}`, callers);
	}
};

for (const judge of ['perfect', 'good', 'bad']) {
	const keyword = judge.toUpperCase();
	ControlSentence.DEFAULT_APPLICATIONS[keyword] = function (row, callers) {
		row[judge] = Number(math.re(ControlSentence.calculateValueWithoutX(this.keyword, this.lineno, callers, this.parameters, this._beatmap)));
		if (row[judge] < 0) {
			this.throwRuntimeError(`${keyword}: judgement window radius is negative: ${row[judge]}`, callers);
		}
	};
}

for (const judge of ['perfect', 'good', 'bad', 'miss', 'excess']) {
	const keyword = `${judge.toUpperCase()}_HP`;
	ControlSentence.DEFAULT_APPLICATIONS[keyword] = function (row, callers) {
		row[`${judge}Hp`] = Number(math.re(ControlSentence.calculateValueWithoutX(this.keyword, this.lineno, callers, this.parameters, this._beatmap)));
	};
}

ControlSentence.DEFAULT_APPLICATIONS.FAKE_JUDGEMENT_LINE = function (row, callers) {
	if (this.parameters.length > 0) {
		const label = ControlSentence.calculateValueWithoutX(this.keyword, this.lineno, callers, this.parameters, this._beatmap);
		row.setCurrentJudgementLineByLabel(label);
	} else {
		row.addFakeJudgementLineWithoutLabel();
	}
};

ControlSentence.DEFAULT_APPLICATIONS.GENUINE_JUDGEMENT_LINE = function (row, callers) {
	row.currentJudgementLine = row.judgementLine;
};

ControlSentence.DEFAULT_APPLICATIONS.TEXT = function (row, callers) {
	if (this.parameters.length > 0) {
		const label = ControlSentence.calculateValueWithoutX(this.keyword, this.lineno, callers, this.parameters, this._beatmap);
		row.setCurrentTextByLabel(label);
	} else {
		row.addTextWithoutLabel();
	}
};

for (const attr of ['x', 'y', 'z', 'anchor_x', 'anchor_y', 'rotation', 'width', 'height', 'red', 'green', 'blue', 'alpha', 'blend_mode']) {
	ControlSentence.DEFAULT_APPLICATIONS['JUDGEMENT_LINE_' + attr.toUpperCase()] = function (row, callers) {
		row.currentJudgementLine.setAttribute(this.keyword, this.lineno, callers, attr, this.parameters);
	};
}

for (const attr of ['x', 'y', 'z', 'anchor_x', 'anchor_y', 'rotation', 'scale_x', 'scale_y', 'red', 'green', 'blue', 'alpha', 'text', 'blend_mode']) {
	ControlSentence.DEFAULT_APPLICATIONS['TEXT_' + attr.toUpperCase()] = function (row, callers) {
		row.currentText.setAttribute(this.keyword, this.lineno, callers, attr, this.parameters);
	};
}

for (const attr of ['note_x', 'hit_x', 'bar_line_x', 'time']) {
	ControlSentence.DEFAULT_APPLICATIONS[attr.toUpperCase()] = function (row, callers) {
		row[attr.fromSnakeToCamel() + 'Formula'] = ControlSentence.generateFunction(this.keyword, this.lineno, callers, this.parameters, this._beatmap);
	};
}

ControlSentence.DEFAULT_APPLICATIONS.LET = function (row, callers) {
	const name = this.parameters[0];
	if (ControlSentence.checkIdentifier(name))
		this._beatmap.letExpression(name, this.parameters.slice(1).join(' '), this.keyword, this.lineno, callers);
	else
		this.throwRuntimeError(`LET: invalid identifier: ${name}`, callers);
};

ControlSentence.DEFAULT_APPLICATIONS.DEF = function (row, callers) {
	const identifier = this.parameters[0];
	const parametersList = this.parameters[1].split(',');
	if (!ControlSentence.checkIdentifier(identifier))
		this.throwRuntimeError(`DEF: invalid identifier: ${identifier}`, callers);
	else {
		for (const parameterName of parametersList) {
			if (!ControlSentence.checkIdentifier(parameterName))
				this.throwRuntimeError(`DEF: invalid identifier: ${parameterName}`, callers);
		}
	}
	this._beatmap.defExpression(identifier, parametersList, this.parameters.slice(2).join(' '), this.keyword, this.lineno, callers);
};

ControlSentence.DEFAULT_APPLICATIONS.VAR = function (row, callers) {
	const identifier = this.parameters[0];
	if (ControlSentence.checkIdentifier(identifier))
		this._beatmap.varExpression(identifier, this.parameters.slice(1).join(' '), this.keyword, this.lineno, callers);
	else
		this.throwRuntimeError(`VAR: invalid identifier: ${identifier}`, callers);
};

ControlSentence.DEFAULT_APPLICATIONS.FUN = function (row, callers) {
	const identifier = this.parameters[0];
	const parametersList = this.parameters[1].split(',');
	if (!ControlSentence.checkIdentifier(identifier))
		this.throwRuntimeError(`VAR: invalid identifier: ${identifier}`, callers);
	else {
		for (const parameterName of parametersList) {
			if (!ControlSentence.checkIdentifier(parameterName))
				this.throwRuntimeError(`VAR: invalid identifier: ${parameterName}`, callers);
		}
	}
	this._beatmap.funExpression(identifier, parametersList, this.parameters.slice(2).join(' '), this.keyword, this.lineno, callers);
};

ControlSentence.DEFAULT_APPLICATIONS.ALIAS = function (row, callers) {
	const originalKeyword = this.parameters.last();
	if (!this._beatmap.hasKeyword(originalKeyword))
		this.throwRuntimeError(`ALIAS: keyword not found: ${originalKeyword}`, callers);
	for (const newKeyword of this.parameters.slice(0, this.parameters.length - 1)) {
		if (!ControlSentence.checkKeyword(newKeyword))
			this.throwRuntimeError(`ALIAS: invalid keyword: ${newKeyword}`, callers);
		if (newKeyword === originalKeyword)
			this.throwRuntimeError(`ALIAS: alias is the same as the original: ${newKeyword}`);
		this._beatmap.defineKeywordAlias(newKeyword, originalKeyword);
	}
};

ControlSentence.DEFAULT_APPLICATIONS.UNPROCEDURE = function (row, callers) {
	for (const keyword of this.parameters) {
		if (!this._beatmap.hasKeyword(keyword))
			this.throwRuntimeError(`UNPRECEDURE: keyword not found: ${keyword}`, callers);
		this._beatmap.deleteKeyword(keyword);
	}
};

ControlSentence.DEFAULT_APPLICATIONS.COMMENT = function (row, callers) {
};

ControlSentence.DEFAULT_APPLICATIONS.PROCEDURE = function (row, callers) {
	const mainBlock = this.blocks[0];
	for (const keyword of this.parameters) {
		if (!ControlSentence.checkKeyword(keyword))
			this.throwRuntimeError(`PROCEDURE: invalid keyword: ${keyword}`, callers);
		this._beatmap.controlSentenceApplications[keyword] = function (innerRow, innerCallers) {
			const callers = [{caller: keyword}, ...innerCallers]
			callers[1] = {'lineno': this.lineno, caller: callers[1].caller};
			const result = ControlSentence.executeBlock(mainBlock, innerRow, callers);
			if (result && result.signal === 'break') {
				this.throwRuntimeError(`BREAK: misplaced or too deep`, result.callers);
			}
		};
	}
};

ControlSentence.DEFAULT_APPLICATIONS.IF = function (row, callers) {
	// set up flowchart
	const flowchart = [{
		condition: ControlSentence.valueWithoutX(row.keyword, this.lineno, callers, this.parameters, this._beatmap),
		block: this.blocks[0]
	}];
	let reachedElse = false;
	for (const block of this.blocks) {
		const beginning = block.beginning;
		if (beginning.keyword === 'ELSE_IF') {
			if (reachedElse) {
				this.throwRuntimeError(`ELSE_IF: ELSE_IF branch is invalid after ELSE`, callers);
			}
			flowchart.push({
				condition: ControlSentence.valueWithoutX(row.keyword, this.lineno, callers, beginning.parameters, this._beatmap),
				'block': block
			});
		} else if (beginning.keyword === 'ELSE') {
			flowchart.push({
				condition: () => true,
				'block': block
			})
			reachedElse = true;
		}
	}
	
	// execute flowchart
	for (const {condition, block} of flowchart) {
		if (condition()) {
			return ControlSentence.executeBlock(block, row, callers);
		}
	}
};

ControlSentence.DEFAULT_APPLICATIONS.BREAK = function (row, callers) {
	if (this.parameters.length > 1) {
		this.throwRuntimeError('BREAK: cannot have multiple parameters', callers);
	}
	const layer = parseInt(this.parameters[0] || 0);
	if (isNaN(layer)) {
		this.throwRuntimeError(`BREAK: invalid integer: ${this.parameters[0]}`, callers);
	}
	return {signal: 'break', 'layer': layer, 'callers': callers};
};

ControlSentence.DEFAULT_APPLICATIONS.RETURN = function (row, callers) {
	return {signal: 'return', 'callers': callers};
};

ControlSentence.DEFAULT_APPLICATIONS.WHILE = function (row, callers) {
	const condition = ControlSentence.valueWithoutX(this.keyword, this.lineno, callers, this.parameters, this._beatmap);
	let result;
	while (condition()) {
		result = ControlSentence.executeBlock(this.blocks[0], row, callers);
		if (result && result.signal === 'break') {
			if (result.layer === 0) {
				break;
			} else {
				return {signal: 'break', layer: result.layer - 1, callers: result.callers};
			}
		}
	}
};

ControlSentence.DEFAULT_APPLICATIONS.FOR = function (row, callers) {
	const [identifierValue, identifierIndex] = this.parameters[0].split(',');
	if (!ControlSentence.checkIdentifier(identifierValue))
		this.throwRuntimeError(`FOR: invalid identifier: ${identifierValue}`, callers);
	if (identifierIndex && !ControlSentence.checkIdentifier(identifierValue))
		this.throwRuntimeError(`FOR: invalid identifier: ${identifierIndex}`, callers);
	const iteratedStringParts = this.parameters.slice(1);
	const iterated = ControlSentence.calculateValueWithoutX(this.keyword, this.lineno, callers, iteratedStringParts, this._beatmap);
	if (typeof iterated.forEach !== 'function')
		this.throwRuntimeError(`FOR: cannot iterate over a non-iterable object: ${iteratedStringParts.join(' ')}`, callers);
	let result;
	try {
		iterated.forEach((item, index, _) => {
			this._beatmap.varValue(identifierValue, item);
			if (identifierIndex)
				this._beatmap.varValue(identifierIndex, index);
			result = ControlSentence.executeBlock(this.blocks[0], row, callers);
			if (result && result.signal === 'break') {
				const error = new Error();
				Object.assign(error, result);
				throw error;
			}
		});
	} catch (e) {
		if (e.signal === 'break') {
			if (e.layer !== 0)
				return {signal: 'break', layer: e.layer - 1, callers: e.callers};
		} else {
			throw e;
		}
	}
};

ControlSentence.DEFAULT_APPLICATIONS.DEBUG_LOG = function (row, callers) {
	console.log(ControlSentence.calculateValueWithoutX(this.keyword, this.lineno, callers, this.parameters, this._beatmap));
};

ControlSentence.executeBlock = function (block, row, callers) {
	let result;
	for (const controlSentence of block.contents) {
		if (!row._beatmap.hasKeyword(controlSentence.keyword)) {
			controlSentence.throwRuntimeError(`keyword not found: ${controlSentence.keyword}`, callers);
		}
		result = controlSentence.applyTo(row, callers);
		if (result)
			return result;
	}
};

ControlSentence.checkIdentifier = function (name) {
	return /[a-zA-Z_]\w*/y.test(name);
};

ControlSentence.checkKeyword = function (keyword) {
	return /[A-Z_]\w*/y.test(keyword);
};

ControlSentence.generateFunction = function (keyword, lineno, callers, formulaParts, beatmap) {
	const formula = beatmap.generateFunctionFromFormula(keyword, lineno, callers, formulaParts.join(' '));
	return x => Number(math.re(formula(x)));
};

ControlSentence.valueWithoutX = function (keyword, lineno, callers, formulaParts, beatmap) {
	return beatmap.generateFunctionFromFormulaWithoutX(keyword, lineno, callers, formulaParts.join(' '));
};

ControlSentence.calculateValueWithoutX = function (keyword, lineno, callers, formulaParts, beatmap) {
	return ControlSentence.valueWithoutX(...arguments)();
};
