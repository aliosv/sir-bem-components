([
    {
        tech : 'js',
        shouldDeps : [
            { block : 'calendar-month', tech : 'bemhtml' },
            { block : 'input', tech : 'bemhtml' },
            { block : 'popup', tech : 'bemhtml' }
        ]
    },
    {
        shouldDeps : [
            { block : 'calendar-month', mods : { theme : 'islands' } },
            { block : 'jquery', elems : ['inputmask'] },
            { block : 'input', mods : { theme : 'islands' } },
            { block : 'popup', mods : { autoclosable : true, target : 'anchor', theme : 'islands' } }
        ]
    }
])
