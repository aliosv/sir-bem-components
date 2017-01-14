({
    block : 'page',
    mods : { theme : 'islands' },
    title : 'Button icons',
    head : [{ elem : 'css', url : '_button.css' }],
    scripts : [{ elem : 'js', url : '_button.js' }],
    content : [
        {
            block : 'button',
            mods : { size : 'l', theme : 'sir', view : 'action' },
            text : 'НАЗАД',
            icon : { block : 'icon', mods : { button : 'back-white' } }
        },
        {
            block : 'button',
            mods : { size : 'l', theme : 'sir', view : 'action' },
            text : 'ДАЛЕЕ',
            iconAfter : { block : 'icon', mods : { button : 'next-white' } }
        },
        {
            block : 'button',
            mods : { size : 'l', theme : 'sir', view : 'action' },
            text : 'ЗАКРЫТЬ',
            icon : { block : 'icon', mods : { button : 'close-white' } }
        }
    ]
})
