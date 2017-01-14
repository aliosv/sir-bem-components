block('dialog-window').match(function() { return !this.mods.pseudo; }).replace()(function() {
    return applyCtx({
        block : 'modal',
        mods : { theme : 'islands' },
        mix : [
            { block : 'dialog-window', mods : this.ctx.mods }
        ].concat(this.ctx.mix || []),
        content : apply('content', this),
        zIndexGroupLevel : 8
    });
});
