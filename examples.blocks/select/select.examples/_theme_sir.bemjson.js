({
    block : 'page',
    mods : { theme : 'islands' },
    title : 'Select theme sir',
    head : [{ elem : 'css', url : '__theme_sir.css' }],
    scripts : [{ elem : 'js', url : '__theme_sir.js' }],
    content : [
        {
            block : 'select',
            mods : { size : 'l', theme : 'sir', mode : 'radio' },
            val : 2,
            options : [
                { text : 'Text 1', val : 1 },
                { text : 'Text 2', val : 2 },
                { text : 'Text 3', val : 3 }
            ]
        },
        { tag : 'br' },
        { tag : 'br' },
        { tag : 'br' },
        {
            block : 'select',
            mods : { size : 'l', theme : 'sir', mode : 'check' },
            val : [2],
            options : [
                { text : 'Text 1', val : 1 },
                { text : 'Text 2', val : 2 },
                { text : 'Text 3', val : 3 }
            ]
        }
    ]
})
