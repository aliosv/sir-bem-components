var sizes = ['m', 'l'],
    states = Array.prototype.concat.apply([], [
        [],
        ['checked'],
        ['disabled'],
        ['checked', 'disabled']
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
    title : 'Radio sizes',
    head : [{ elem : 'css', url : '__theme_sir.css' }],
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
                                    content : {
                                        block : 'radio',
                                        mods : mods,
                                        text : 'Текст'
                                    }
                                }
                            }))
                    }
                })
            ]
        }
    ]
})
