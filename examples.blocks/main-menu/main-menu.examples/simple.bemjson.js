({
    block : 'page',
    title : 'Main menu',
    head : [{ elem : 'css', url : '_simple.css' }],
    scripts : [{ elem : 'js', url : '_simple.js' }],
    mods : { theme : 'islands' },
    content : [
        {
            block : 'main-menu',
            mods : { theme : 'sir' },
            items : [
                {
                    icon : {
                        block : 'icon',
                        mods : { size : 'l', theme : 'sir', logo : 'sir' }
                    },
                    url : '/'
                },
                {
                    icon : {
                        block : 'icon',
                        mods : { size : 'l', theme : 'sir', menu : 'projects' }
                    },
                    text : 'Проекты',
                    url : '/'
                },
            ]
        },
        { tag : 'br' },
        { tag : 'br' },
        'Active',
        { tag : 'br' },
        {
            block : 'main-menu',
            mods : { theme : 'sir' },
            items : [
                {
                    icon : {
                        block : 'icon',
                        mods : { size : 'l', theme : 'sir', logo : 'sir' }
                    },
                    url : '/',
                    active : true
                },
                {
                    icon : {
                        block : 'icon',
                        mods : { size : 'l', theme : 'sir', menu : 'projects' }
                    },
                    text : 'Проекты',
                    url : '/',
                    active : true
                },
            ]
        }
    ]
})
