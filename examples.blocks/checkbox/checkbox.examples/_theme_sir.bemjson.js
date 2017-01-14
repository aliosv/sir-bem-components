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
    title : 'Checkbox sizes',
    head : [{ elem : 'css', url : '__theme_sir.css' }],
    content : [
        {
            block : '_table',
            content : states.map(function(state) {
                return sizes.map(function(size) {
                    var mods = { size : size, theme : 'sir' };

                    state.forEach(function(value) {
                        mods[value] = true;
                    });

                    return {
                        block : 'checkbox',
                        mods : mods,
                        text : 'Текст'
                    };
                });
            }),
            caption : 'state/size',
            cols : sizes,
            rows : states
        }
    ]
})
