block('select').mod('theme', 'sir').content()(function() {
    return [
        { elem : 'button' },
        {
            block : 'popup',
            mods : { target : 'anchor', theme : 'islands', autoclosable : true },
            directions : ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
            content : { block : this.block, mods : this.mods, elem : 'menu' }
        }
    ];
});
