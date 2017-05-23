([
    {
        tech : 'js',
        shouldDeps : [
            { block : 'calendar-year', mods : { theme : 'islands' }, tech : 'bemhtml' },
            { block : 'popup', tech : 'bemhtml' }
        ]
    },
    {
        shouldDeps : [
            { block : 'calendar-year', mods : { theme : 'islands' } },
            { block : 'popup', mods : { autoclosable : true, target : 'anchor', theme : 'islands' } }
        ]
    }
])
