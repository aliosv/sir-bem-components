([
    {
        tech : 'js',
        shouldDeps : [
            { block : 'i-bem-dom', tech : 'bemhtml' }
        ]
    },
    {
        mustDeps : [
            'i-bem-dom'
        ],
        shouldDeps : [
            { block : 'button', mods : { theme : 'sir' } },
            { block : 'notify' }
        ]
    }
])
