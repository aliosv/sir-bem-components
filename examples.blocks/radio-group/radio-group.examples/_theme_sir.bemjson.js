({
    block : 'page',
    mods : { theme : 'islands' },
    title : 'Radio sizes',
    head : [{ elem : 'css', url : '__theme_sir.css' }],
    scripts : [{ elem : 'css', url : '__theme_sir.js' }],
    content : [
        {
            block : 'radio-group',
            mods : { size : 'l', theme : 'sir' },
            val : '1',
            options : [
                { val : '1', disabled : true, text : 'disabled' },
                { val : '2', text : 'Radio item' },
                { val : '3', text : 'Radio item' }
            ]
        },
        { tag : 'br' },
        { tag : 'br' },
        { tag : 'br' },
        {
            block : 'radio-group',
            mods : { size : 'l', theme : 'sir', type : 'line' },
            val : '1',
            options : [
                { val : '1', disabled : true, text : 'disabled' },
                { val : '2', text : 'Radio item' },
                { val : '3', text : 'Radio item' }
            ]
        },
        { tag : 'br' },
        { tag : 'br' },
        { tag : 'br' },
        {
            block : 'radio-group',
            mods : { size : 'l', theme : 'sir', type : 'button' },
            val : '1',
            options : [
                { val : '1', disabled : true, text : 'disabled' },
                { val : '2', text : 'Radio item' },
                { val : '3', text : 'Radio item' }
            ]
        }
    ]
})
