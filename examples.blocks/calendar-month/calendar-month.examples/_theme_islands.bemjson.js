({
    block : 'page',
    title : 'Calendar month',
    head : [{ elem : 'css', url : '__theme_islands.css' }],
    scripts : [{ elem : 'js', url : '__theme_islands.js' }],
    mods : { theme : 'islands' },
    content : [
        (new Array(12)).join(' ').split(' ').map(function(v, i) {
            var now = new Date;

            return {
                block : 'calendar-month',
                js : { date : new Date(now.getFullYear(), i) },
                mods : { 'mark-past-days' : true, theme : 'islands' },
                attrs : { style : 'margin:15px; vertical-align:top;' }
            };
        }),
        { tag : 'br' },
        { tag : 'br' },
        { tag : 'br' },
        { tag : 'h3', content : 'Календарь с выбором дня и предустановленной датой' },
        {
            block : 'calendar-month',
            attrs : { style : 'margin:15px; vertical-align:top;' },
            js : { date : new Date() },
            mods : { selectable : 'single', theme : 'islands' },
            val : new Date()
        },
        { tag : 'br' },
        { tag : 'br' },
        { tag : 'br' },
        { tag : 'h3', content : 'Пример календаря с кастомизацией дней' },
        {
            block : 'calendar-month',
            attrs : { style : 'margin:15px; vertical-align:top;' },
            js : { date : new Date() },
            mods : { selectable : 'single', theme : 'islands', friday : true },
            val : new Date()
        }
    ]
})
