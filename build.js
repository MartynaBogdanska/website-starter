const Metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');
const metadata = require('metalsmith-metadata-directory');
const markdown = require('metalsmith-markdown');
const sass = require('metalsmith-sass');
const sasslint = require('metalsmith-sass-lint');
const uglify = require('metalsmith-uglify');
const autoprefixer = require('metalsmith-autoprefixer');
const permalinks = require('metalsmith-permalinks');

Metalsmith(__dirname)
    .source('./scss')
    .destination('./dist/css')
    .use(sasslint({
        configFile: './.stylelintrc',
    }))
    .use(sass({
        outputStyle: 'compress',
    }))
    .use(autoprefixer())
    .build((err) => {
        if (err) throw err;
    });

Metalsmith(__dirname)
    .source('./js')
    .destination('./dist/js')
    .use(uglify())
    .build((err) => {
        if (err) throw err;
    });

Metalsmith(__dirname)
    .source('./docs')
    .destination('./dist')
    .use(metadata({
        directory: './metadata/*.json',
    }))
    .use(markdown())
    .use(layouts({
        engine: 'nunjucks',
        directory: './layouts',
        default: 'page.njk',
        pattern: '**/*.html',
    }))
    .use(permalinks())
    .build((err) => {
        if (err) throw err;
    });

Metalsmith(__dirname)
    .source('./public')
    .destination('./dist/public')
    .build((err) => {
        if (err) throw err;
    });