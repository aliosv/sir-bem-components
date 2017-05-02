([
    {
        tech : 'js',
        shouldDeps : [
            { block : 'menu', tech : 'bemhtml' },
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
            { block : 'menu' },
            { block : 'popup', mods : { target : 'anchor', theme : 'islands' } },
            { block : 'spin', mods : { theme : 'islands' } }
        ]
    }
])
