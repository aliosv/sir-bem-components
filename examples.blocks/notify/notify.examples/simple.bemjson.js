({
    block : 'page',
    js : true,
    title : 'Notify',
    head : [{ elem : 'css', url : '_simple.css' }],
    scripts : [{ elem : 'js', url : '_simple.js' }],
    mods : { theme : 'islands' },
    mix : { block : 'notify', mods : { theme : 'sir' } },
    content : [
        {
            block : 'button', mods : { size : 'm', theme : 'sir' },
            text : 'success'
        },
        ' ',
        {
            block : 'button', mods : { size : 'm', theme : 'sir' },
            text : 'Error'
        }
    ]
})
