({
    block : 'page',
    title : 'Calendar month',
    head : [{ elem : 'css', url : '__theme_islands.css' }],
    scripts : [{ elem : 'js', url : '__theme_islands.js' }],
    mods : { theme : 'islands' },
    content : [
        (new Array(12)).join(' ').split(' ').map(function(v, i) {
            return {
                block : 'calendar-month',
                attrs : { style : 'margin:15px; vertical-align:top;' },
                mods : { theme : 'islands' },
                date : new Date('2017-' + ('0' + (i + 1)).slice(-2) + '-01')
            };
        }),
        { tag : 'br' },
        { tag : 'br' },
        { tag : 'br' },
        { tag : 'h3', content : 'Календарь с предустановленной датой' },
        {
            block : 'calendar-month',
            attrs : { style : 'margin:15px; vertical-align:top;' },
            js : { date : new Date() },
            mods : { theme : 'islands' },
            date : new Date()
        }
    ]
})
