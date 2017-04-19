({
    block : 'page',
    title : 'Calendar year',
    head : [{ elem : 'css', url : '__year.css' }],
    scripts : [{ elem : 'js', url : '__year.js' }],
    mods : { theme : 'islands' },
    content : [
        {
            block : 'calendar',
            attrs : { style : 'margin:15px; vertical-align:top;' },
            js : { date : new Date(), year : '2017' },
            mods : { year : true, theme : 'islands' }
        }
    ]
})
