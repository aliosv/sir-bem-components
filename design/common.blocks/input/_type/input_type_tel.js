modules.define('input', [], function(provide, Block) {
    provide(Block.declMod({ modName : 'type', modVal : 'tel' }, {
        setVal : function(val, data) {
            // в маске жестко прописана цифра 7, которую вводить не нужно
            this.__base.apply(this, [val.replace(/^7/, ''), data]);
        }
    }));
});
