var sizes = ['m', 'l'],
    views = [undefined, 'action', 'plain', 'orange'],
    contents = ['text', 'text-icon', 'icon'],
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
                        caption : ri === 0 && ci === 0 ? 'content/view' : undefined,
                        cols : ri === 0 ? views : undefined,
                        rows : ci === 0 ? contents : undefined
                    };
                });
            }),
            caption : 'state/size',
            cols : sizes,
            rows : states,
        },
        { tag : 'br' },
        {
            block : 'control-group',
            content : [
                {
                    block : 'button',
                    mods : { checked : true, size : 'm', theme : 'sir' },
                    text : 'Checked'
                },
                {
                    block : 'button',
                    mods : { size : 'm', theme : 'sir' },
                    text : 'Button'
                },
                {
                    block : 'button',
                    mods : { disabled : true, size : 'm', theme : 'sir' },
                    text : 'Disabled'
                }
            ]
        }
    ]
})
