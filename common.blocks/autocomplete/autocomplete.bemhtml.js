block('autocomplete').def()(function() {
    var mods = this.ctx.mods || {};

    return applyCtx({
        block : 'popup',
        mix : [{ block : 'autocomplete', js : this.ctx.js || true, mods : mods }].concat(this.ctx.mix),
        mods : { target : 'anchor', theme : 'islands' },
        directions : this.ctx.directions,
        content : [
            {
                block : 'autocomplete',
                elem : 'message',
                content : [
                    {
                        block : 'spin',
                        mods : { size : 's', theme : 'islands' }
                    },
                    { elem : 'message-text' }
                ]
            },
            {
                block : 'menu',
                mods : { size : mods.size, theme : mods.theme },
                content : (new Array(this.ctx.js && this.ctx.js.size || 10)).join(' ').split(' ').map(function() {
                    return { elem : 'item' };
                })
            }
        ]
    });
});
