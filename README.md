# dododogame.github.io

The website of the Dododo game.
The site is written in [Jekyll](https://jekyllrb.com/).

## Build the site

[Install Ruby](https://www.ruby-lang.org/en/documentation/installation/), and then run

```shell
git clone --recursive https://github.com/dododogame/dododogame.github.io.git
cd dododogame.github.io
bundle install # and resolve all errors if there are any
bundle exec env JEKYLL_ENV=production jekyll build
```

Then, the site files are built into the `_site` directory.

## Contributing

There are several pages in the repo that you may contribute to by sending pull requests.

## License

All contents that are not in submodules are licensed under

[![CC BY-SA 4.0](https://licensebuttons.net/l/by-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-sa/4.0/)

For contents in submodules, see the specific submodule for their licenses.
