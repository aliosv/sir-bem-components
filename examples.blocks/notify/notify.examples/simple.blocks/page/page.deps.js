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
            'vow',
            { block : 'button', mods : { theme : 'sir' } },
            { block : 'notify' }
        ]
    }
])
