([
    {
        tech : 'js',
        shouldDeps : [
            { block : 'menu', mods : { theme : 'islands' }, tech : 'bemhtml' },
            { block : 'menu-item', mods : { theme : 'islands' } },
            { block : 'popup', mods : { target : 'anchor', theme : 'islands' }, tech : 'bemhtml' },
            { block : 'spin', mods : { theme : 'islands' }, tech : 'bemhtml' }
        ]
    },
    {
        shouldDeps : [
            { elem : 'message' },
            'input',
            'textarea',
            'vow',
            { block : 'functions', elems : ['debounce'] },
            { block : 'menu', mods : { theme : 'islands' } },
            { block : 'menu-item', mods : { theme : 'islands' } },
            { block : 'popup', mods : { target : 'anchor', theme : 'islands' } },
            { block : 'spin', mods : { theme : 'islands' } }
        ]
    }
])
