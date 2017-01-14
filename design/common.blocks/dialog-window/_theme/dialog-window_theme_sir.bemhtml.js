block('dialog-window').mod('theme', 'sir').content()(function() {
    var pseudo = this.ctx.mods && this.ctx.mods.pseudo;

    return {
        block : 'dialog-window',
        elem : 'inner',
        content : [
            {
                elem : 'header',
                content : [
                    this.ctx.icon ? {
                        elem : 'icon',
                        content : this.ctx.icon
                    } : '',
                    this.ctx.mods && this.ctx.mods['has-close'] ? {
                        block : 'button',
                        mods : { size : 'm', theme : 'sir', view : 'plain' },
                        mix : [
                            { block : 'dialog-window', elem : 'close' },
                            { block : 'dialog-window', elem : 'control', elemMods : { type : 'close' } }
                        ],
                        icon : {
                            block : 'icon',
                            mods : { button : 'close-white' }
                        }
                    } : '',
                    !pseudo ? this.ctx.title : ''
                ]
            },
            pseudo ? { elem : 'title', content : this.ctx.title } : '',
            {
                elem : 'content',
                content : applyNext()
            }
        ]
    };
});
