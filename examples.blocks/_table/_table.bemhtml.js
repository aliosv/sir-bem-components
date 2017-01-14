block('_table')(
    tag()('table'),
    content()(function() {
        var ctx = this.ctx;

        function stringifyArray(arr) {
            return Array.isArray(arr) ? arr.join(', ') : arr;
        }

        return [
            {
                tag : 'tr',
                content : [ctx.caption || ''].concat(ctx.cols || []).map(function(value) {
                    return { tag : 'td', content : stringifyArray(value) };
                })
            }
        ].concat(ctx.content.map(function(row, index) {
                return {
                    tag : 'tr',
                    content : [{
                        tag : 'td',
                        content : stringifyArray((ctx.rows || [])[index])
                    }].concat(row.map(function(col) {
                            return {
                                tag : 'td',
                                content : col
                            };
                        }))
                };
            }));
    })
);
