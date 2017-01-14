var sizes = ['m', 'l'],
    views = [undefined, 'action', 'plain', 'orange'],
    contents = ['text', 'text-icon', 'icon'],
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
    title : 'Button sizes',
    head : [{ elem : 'css', url : '__theme_sir.css' }],
    content : [
        {
            block : '_table',
            content : states.map(function(state, ri) {
                return sizes.map(function(size, ci) {
                    return {
                        block : '_table',
                        content : contents.map(function(content) {
                            return views.map(function(view) {
                                var mods = { size : size, theme : 'sir', view : view };

                                state.forEach(function(value) {
                                    mods[value] = true;
                                });

                                return {
                                    block : 'button',
                                    mods : mods,
                                    text : content.indexOf('text') > -1 ? 'Текст' : undefined,
                                    icon : content.indexOf('icon') > -1 ? { block : 'icon' } : undefined
                                };
                            });
                        }),
                        caption : 'content/view',
                        cols : ri === 0 ? views : undefined,
                        rows : ci === 0 ? contents : undefined
                    };
                });
            }),
            caption : 'state/size',
            cols : sizes,
            rows : states,
        }
    ]
})
