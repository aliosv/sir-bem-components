({
    block : 'page',
    js : true,
    title : 'Calendar year',
    head : [{ elem : 'css', url : '__theme_islands.css' }],
    scripts : [{ elem : 'js', url : '__theme_islands.js' }],
    mods : { theme : 'islands' },
    content : [
        {
            block : 'calendar-year',
            mods : { theme : 'islands' },
            attrs : { style : 'margin:15px; vertical-align:top;' },
            val : new Date()
        },
        { tag : 'br' },
        { tag : 'br' },
        { tag : 'br' },
        { elem : 'date', tag : 'input', attrs : { type : 'date' } }
    ]
})
