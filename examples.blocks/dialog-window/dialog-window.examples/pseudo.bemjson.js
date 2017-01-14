({
    block : 'page',
    title : 'Dialog window',
    head : [{ elem : 'css', url : '_pseudo.css' }],
    scripts : [{ elem : 'js', url : '_pseudo.js' }],
    mods : { theme : 'islands' },
    content : [
        {
            block : 'dialog-window',
            mods : { 'has-close' : true, pseudo : true, size : 'm', theme : 'sir' },
            title : 'Заголовок',
            icon : {
                block : 'icon',
                mods : { logo : 'sir' }
            },
            content : 'текст'
        },
        {
            block : 'dialog-window',
            title : 'Заголовок',
            icon : {
                block : 'icon',
                mods : { logo : 'sir' }
            },
            mods : { pseudo : true, size : 'l', theme : 'sir' },
            content : 'текст'
        }
    ]
})
