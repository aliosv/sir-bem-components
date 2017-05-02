({
    block : 'page',
    title : 'Autocomplete theme islands',
    head : [{ elem : 'css', url : '__theme_islands.css' }],
    scripts : [{ elem : 'js', url : '__theme_islands.js' }],
    mods : { theme : 'islands' },
    content : [
        {
            tag : 'h3',
            content : 'Type "autocomplete"'
        },
        {
            block : 'input',
            mix : { block : 'autocomplete', js : { id : 1 } },
            mods : { size : 'l', theme : 'islands' },
            autocomplete : false
        },
        { block : 'autocomplete', mods : { size : 'l', theme : 'islands' }, js : { id : 1, data : ['autocomplete'] } }
    ]
})
