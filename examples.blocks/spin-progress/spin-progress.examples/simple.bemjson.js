({
    block : 'page',
    js : true,
    title : 'Spin-progress',
    head : [{ elem : 'css', url : '_simple.css' }],
    scripts : [{ elem : 'js', url : '_simple.js' }],
    mods : { theme : 'islands' },
    content : ['xs', 's', 'm', 'l', 'xl'].map(function(size) {
        return {
            block : 'spin-progress',
            mods : { size : size, theme : 'islands', visible : true }
        };
    })
})
