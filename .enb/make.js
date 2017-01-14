var PATH = require('path'),
    targets = require('./targets');

module.exports = function(config) {
    config.includeConfig('enb-bem-examples');

    config.module('enb-bem-examples').createConfigurator('examples').configure({
        destPath : 'desktop.examples',
        levels : ['examples.blocks']
    });

    config.nodes(['desktop.examples/*/*'], function(nodeConfig) {
        var nodeDirname = nodeConfig.getNodePath(),
            blockName = PATH.basename(PATH.dirname(nodeDirname)),
            exampleName = PATH.basename(nodeDirname);

        targets.configureLevels(nodeConfig, getLevels().concat([
            PATH.join('examples.blocks'),
            PATH.join(nodeDirname, blockName + '.blocks'),
            PATH.join(nodeDirname, exampleName + '.blocks')
        ].filter(require('fs').existsSync)));
        targets.configureFiles(nodeConfig, true);
        targets.configureBemhtml(nodeConfig);
        targets.configureHtml(nodeConfig);
        targets.configureCss(nodeConfig, ['last 2 versions']);
        targets.configureJs(nodeConfig, { bemhtml : true, ym : true });

        nodeConfig.addTargets(['_?.css', '_?.js', '?.html']);
    });
};

function getLevels() {
    return [
        'node_modules/bem-core/common.blocks',
        'node_modules/bem-core/desktop.blocks',
        'node_modules/bem-components/common.blocks',
        'node_modules/bem-components/desktop.blocks',
        'node_modules/bem-components/design/common.blocks',
        'node_modules/bem-components/design/desktop.blocks',
        'common.blocks',
        'design/common.blocks'
    ];
}
