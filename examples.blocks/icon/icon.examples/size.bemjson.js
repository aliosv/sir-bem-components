({
    block : 'page',
    mods : { theme : 'islands' },
    title : 'Icon sizes',
    head : [{ elem : 'css', url : '_size.css' }],
    scripts : [{ elem : 'js', url : '_size.js' }],
    content : [
        {
            content : [
                { block : 'icon', mods : { size : 's' } },
                's 16x16'
            ]
        },
        {
            content : [
                { block : 'icon', mods : { size : 'm' } },
                'm 24x24'
            ]
        },
        {
            content : [
                { block : 'icon', mods : { size : 'l' } },
                'l 32x32'
            ]
        }
    ]
})
