var sizes = ['m', 'l', 'xl'],
    states = Array.prototype.concat.apply([], [
        [],
        ['disabled']
    ].map(function(value) {
            if(value.indexOf('disabled') > -1) return [value];

            return [
                value,
                value.concat('hovered'),
                value.concat('focused'),
                value.concat(['focused', 'hovered'])
            ];
        }));

({
    block : 'page',
    mods : { theme : 'islands' },
    title : 'Input sizes',
    head : [{ elem : 'css', url : '_table.css' }],
    content : [
        {
            tag : 'table',
            content : [
                {
                    tag : 'tr',
                    content : [{ tag : 'td', content : 'state/size' }].concat(sizes.map(function(value) {
                        return { tag : 'td', content : '"' + value + '"' };
                    }))
                },
                states.map(function(state) {
                    return {
                        tag : 'tr',
                        content : [
                            { tag : 'td', content : state.join(', ') }
                        ].concat(sizes.map(function(value) {
                                var mods = { size : value, theme : 'sir' };

                                state.forEach(function(value) {
                                    mods[value] = true;
                                });

                                return {
                                    tag : 'td',
                                    attrs : { valign : 'bottom' },
                                    content : {
                                        block : 'input',
                                        mods : mods,
                                        val : 'Текст',
                                        placeholder : 'Подсказка'
                                    }
                                }
                            }))
                    }
                })
            ]
        }
    ]
})
