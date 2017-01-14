({
    block : 'page',
    js : true,
    title : 'Dialog window',
    head : [{ elem : 'css', url : '_simple.css' }],
    scripts : [{ elem : 'js', url : '_simple.js' }],
    mods : { theme : 'islands' },
    content : [
        {
            block : 'button', mods : { size : 'm', theme : 'sir' },
            text : 'Open m'
        },
        ' ',
        {
            block : 'button', mods : { size : 'm', theme : 'sir' },
            text : 'Open l'
        },
        {
            block : 'dialog-window',
            mods : { 'has-close' : true, size : 'm', theme : 'sir' },
            title : 'Заголовок',
            content : 'текст'
        },
        {
            block : 'dialog-window',
            title : 'Заголовок',
            mods : { 'has-close' : true, size : 'l', theme : 'sir' },
            content : 'текст'
        }
    ]
})
