({
    block : 'page',
    mods : { theme : 'islands' },
    title : 'Menu theme sir',
    head : [{ elem : 'css', url : '__theme_sir.css' }],
    scripts : [{ elem : 'js', url : '__theme_sir.js' }],
    content : [
        {
            block : 'menu',
            mods : { size : 'l', theme : 'sir', mode : 'radio' },
            val : 2,
            content : [
                { elem : 'item', content : 'Text', val : 1 },
                { elem : 'item', content : 'Text', val : 2 },
                { elem : 'item', content : 'Text', val : 3 }
            ]
        }
    ]
})
