({
    block : 'page',
    title : 'Autocomplete theme sir',
    head : [{ elem : 'css', url : '__theme_sir.css' }],
    scripts : [{ elem : 'js', url : '__theme_sir.js' }],
    mods : { theme : 'islands' },
    content : [
        {
            tag : 'h3',
            content : 'Type "autocomplete"'
        },
        {
            block : 'input',
            mix : { block : 'autocomplete', js : { id : 1 } },
            mods : { size : 'l', theme : 'sir' },
            autocomplete : false
        },
        { block : 'autocomplete', mods : { size : 'l', theme : 'sir' }, js : { id : 1, data : ['autocomplete'] } }
    ]
})
