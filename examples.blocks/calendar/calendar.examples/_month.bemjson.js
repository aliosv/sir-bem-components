({
    block : 'page',
    title : 'Calendar month',
    head : [{ elem : 'css', url : '__month.css' }],
    scripts : [{ elem : 'js', url : '__month.js' }],
    mods : { theme : 'islands' },
    content : [
        (new Array(12)).join(' ').split(' ').map(function(v, i) {
            return {
                block : 'calendar',
                attrs : { style : 'margin:15px; vertical-align:top;' },
                mods : { month : true, theme : 'islands' },
                date : new Date('2017-' + ('0' + (i + 1)).slice(-2) + '-01')
            };
        }),
        { tag : 'br' },
        { tag : 'br' },
        { tag : 'br' },
        { tag : 'h3', content : 'Календарь с предустановленной датой' },
        {
            block : 'calendar',
            attrs : { style : 'margin:15px; vertical-align:top;' },
            js : { date : new Date() },
            mods : { month : true, theme : 'islands' },
            date : new Date()
        }
    ]
})
