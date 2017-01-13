var path = require('path'),
    examples = [];

require('fs-extra').walk('desktop.examples')
    .on('data', function(item) {
        item.path.slice(-5) === '.html' && examples.push(item.path);
    })
    .on('end', function() {
        var data = examples.map(function(value) {
                return value.replace(path.join(__dirname, 'desktop.examples/'), '').split(path.sep);
            }),
            html;

        data = data.reduce(function(prev, value) {
            prev[value[0]] = (prev[value[0]] || []).concat(value[1]);
            return prev;
        }, {});

        html = '<ul>' + Object.keys(data).map(function(block) {
            return Array.prototype.concat.apply([], [
                '<li>',
                block,
                '<ul>',
                data[block].map(function(value) {
                    return '<li><a href="' + ['desktop.examples', block, value, value + '.html'].join('/') + '">' +
                        value + '</a></li>';
                }),
                '</ul>',
                '</li>'
            ]).join('');
        }).join('') + '</ul>';

        html = [
            '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Sir components</title></head><body>',
            html,
            '</body></html>'
        ].join('\n');

        require('fs').writeFileSync('index.html', html);
    });
