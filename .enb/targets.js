var levels = require('enb-bem-techs/techs/levels'),
    provide = require('enb/techs/file-provider'),
    bemdeclFromBemjson = require('enb-bem-techs').bemjsonToBemdecl,
    deps = require('enb-bem-techs/techs/deps-old'),
    files = require('enb-bem-techs/techs/files'),
    bemhtml = require('enb-bemxjst/techs/bemhtml'),
    html = require('enb-bemxjst/techs/bemjson-to-html'),
    js = require('enb-borschik/techs/js-borschik-include'),
    ym = require('enb-modules/techs/prepend-modules'),
    css = require('enb-postcss/techs/enb-postcss'),
    borschik = require('enb-borschik/techs/borschik'),
    depsByTechToBemdecl = require('enb-bem-techs/techs/deps-by-tech-to-bemdecl'),
    mergeFiles = require('enb/techs/file-merge'),
    fileCopy = require('enb/techs/file-copy');

/**
 * Добавляет уровни переопределения
 * @param {Object} nodeConfig
 * @param {Array<String>} paths Массив путей
 */
function configureLevels(nodeConfig, paths) {
    nodeConfig.addTechs([[levels, { levels : paths.map(function(value) { return { path : value, check : true }; }) }]]);
}

/**
 * Добавляет таргет ?.bemdecl.js в сборку.
 * @param {Object} nodeConfig
 * @param {Boolean} fromBemjson
 */
function configureBemdecl(nodeConfig, fromBemjson) {
    nodeConfig.addTechs(fromBemjson === true ? [
        [bemdeclFromBemjson]
    ] : [
        [provide, { target : '?.bemdecl.js' }]
    ]);
}

/**
 * Добавляет таргеты ?.files и ?.dirs в сборку.
 * @param {Object} nodeConfig
 * @param {Boolean} fromBemjson
 */
function configureFiles(nodeConfig, fromBemjson) {
    configureBemdecl(nodeConfig, fromBemjson);
    nodeConfig.addTechs([
        [deps],
        [files]
    ]);
}

/**
 * Добавляет таргет ?.bemhtml в сборку. Зависит от files.
 * @param {Object} nodeConfig
 */
function configureBemhtml(nodeConfig) {
    nodeConfig.addTechs([[bemhtml, { engineOptions : { elemJsInstances : true }, devMode : false }]]);

    nodeConfig.addTargets(['?.bemhtml.js']);
}

/**
 * Добавляет таргет ?.css в сбоку. Зависит от files.
 * @param {Object} nodeConfig
 * @param {Array<String>} browsers Конфиг для автопрефиксера
 * @param {Boolean} freeze
 */
function configureCss(nodeConfig, browsers, freeze) {
    nodeConfig.addTechs([
        [css, {
            plugins : [
                require('autoprefixer')({ browsers : browsers })
            ],
            sourceSuffixes : ['css', 'post.css'],
            oneOfSourceSuffixes : [['css', 'post.css']]
        }]
    ]);

    nodeConfig.mode('development', function(nodeConfig) {
        nodeConfig.addTechs([
            // борщик нужен для фриза картинок и шрифтов, раскрытия инклудов
            [borschik, { source : '?.css', target : '_?.css', freeze : freeze, minify : false }]
        ]);
    });

    nodeConfig.mode('production', function(nodeConfig) {
        nodeConfig.addTechs([
            [borschik, { source : '?.css', target : '_?.css', freeze : freeze }]
        ]);
    });

    nodeConfig.addTargets(['_?.css']);
}

/**
 * Добавляет таргет ?.js в сборку. Зависит от files.
 * @param {Object} nodeConfig
 * @param {Object} params
 * @param {Boolean} params.bemhtml
 * @param {Boolean} params.ym
 * @param {Boolean} freeze
 */
function configureJs(nodeConfig, params, freeze) {
    var addBemhtml = !!(params && params.bemhtml),
        addYm = !!(params && params.ym);

    nodeConfig.addTechs([
        [js, { filesTarget : '?.files', sourceSuffixes : ['vanilla.js', 'browser.js', 'js'], target : '?.browser.js' }]
    ].concat(addBemhtml ? [
            [depsByTechToBemdecl, {
                target : '?.bemhtmlFromJs.bemdecl.js',
                sourceTech : 'js',
                destTech : 'bemhtml'
            }],
            [deps, {
                bemdeclFile : '?.bemhtmlFromJs.bemdecl.js',
                target : '?.bemhtmlFromJs.deps.js'
            }],
            [files, {
                depsFile : '?.bemhtmlFromJs.deps.js',
                filesTarget : '?.bemhtmlFromJs.files',
                dirsTarget : '?.bemhtmlFromJs.dirs'
            }],
            [bemhtml, {
                target : '?.client.bemhtml.js',
                filesTarget : '?.bemhtmlFromJs.files',
                engineOptions : { elemJsInstances : true },
                devMode : false
            }],
            [mergeFiles, {
                target : '?.js',
                sources : ['?.browser.js', '?.client.bemhtml.js']
            }]
        ] : [
            [fileCopy, { source : '?.browser.js', target : '?.js' }]
        ]).concat(addYm ? [[ym, { source : '?.js', target : '?.ym.js' }]] : []));

    nodeConfig.mode('development', function(nodeConfig) {
        nodeConfig.addTechs([[borschik,
            { source : addYm ? '?.ym.js' : '?.js', target : '_?.js', minify : false, freeze : freeze }]]);
    });

    nodeConfig.mode('production', function(nodeConfig) {
        nodeConfig.addTechs([[borschik, { source : addYm ? '?.ym.js' : '?.js', target : '_?.js', freeze : freeze }]]);
    });

    nodeConfig.addTargets(['_?.js']);
}

/**
 * Добавляет таргет ?.css в сбоку. Зависит от files.
 * @param {Object} nodeConfig
 */
function configureHtml(nodeConfig) {
    nodeConfig.addTechs([
        [html]
    ]);

    nodeConfig.addTargets(['?.html']);
}

module.exports = {
    configureLevels : configureLevels,
    configureBemdecl : configureBemdecl,
    configureFiles : configureFiles,
    configureBemhtml : configureBemhtml,
    configureCss : configureCss,
    configureJs : configureJs,
    configureHtml : configureHtml
};
