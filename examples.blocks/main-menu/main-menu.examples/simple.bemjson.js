({
    block : 'page',
    title : 'Main menu',
    head : [{ elem : 'css', url : '_simple.css' }],
    scripts : [{ elem : 'js', url : '_simple.js' }],
    mods : { theme : 'islands' },
    content : [
        {
            block : 'main-menu',
            mods : { theme : 'sir', items : 'main' }
        },
        { tag : 'br' },
        {
            block : 'main-menu',
            mods : { theme : 'sir', items : 'project' }
        }
    ]
})
