({
    block : 'page',
    mods : { theme : 'islands' },
    title : 'Button with file dialog',
    head : [{ elem : 'css', url : '__type_file.css' }],
    scripts : [{ elem : 'js', url : '__type_file.js' }],
    content : [
        {
            block : 'button',
            mods : { size : 'm', theme : 'islands', type : 'file' },
            text : 'File dialog',
            name : 'file'
        }
    ]
})
