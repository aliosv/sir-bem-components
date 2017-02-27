/** @class form-control */
modules.define('form-control', ['textarea'], function(provide, Textarea, Block) {
    provide(Block.declMod({ modName : 'textarea', modVal : '*' }, /** @lends form-control.prototype */{
        setVal : function(val) {
            this.findChildBlock(Textarea).setVal(val);
        }
    }));
});
