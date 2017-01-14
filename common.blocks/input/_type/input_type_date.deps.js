([
    {
        tech : 'js',
        shouldDeps : [
            { block : 'calendar', mods : { month : true }, tech : 'bemhtml' },
            { block : 'input', tech : 'bemhtml' },
            { block : 'popup', tech : 'bemhtml' }
        ]
    },
    {
        shouldDeps : [
            { block : 'calendar', mods : { month : true, theme : 'islands' } },
            { block : 'jquery', elems : ['inputmask'] },
            { block : 'input', mods : { theme : 'islands' } },
            { block : 'popup', mods : { autoclosable : true, target : 'anchor', theme : 'islands' } }
        ]
    }
])
