({
    block : 'page',
    title : 'dnd-sort',
    mods : { theme : 'islands' },
    head : [
        { elem : 'css', url : '_simple.css' }
    ],
    scripts : [
        { elem : 'js', url : '_simple.js' }
    ],
    content : [
        {
            block : 'dnd-sort',
            content : [1, 2, 3, 4, 5, 6, 7, 8, 9].map(function(v) {
                return {
                    elem : 'handle',
                    mix : { elem : 'item' },
                    content : v
                };
            })
        },
        { tag : 'h2', content : 'Отдельный элемент для перетаскивания' },
        {
            block : 'dnd-sort',
            content : [1, 2, 3, 4, 5, 6, 7, 8, 9].map(function(v) {
                return {
                    elem : 'item',
                    content : [
                        v,
                        ' ',
                        { elem : 'handle', content : '#' }
                    ]
                };
            })
        }
    ]
})
