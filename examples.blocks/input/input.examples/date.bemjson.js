({
    block : 'page',
    mods : { theme : 'islands' },
    title : 'Input date',
    head : [{ elem : 'css', url : '_date.css' }],
    scripts : [{ elem : 'js', url : '_date.js' }],
    content : [
        {
            block : 'input',
            mods : { size : 'l', theme : 'sir', type : 'date' }
        }
    ]
})
