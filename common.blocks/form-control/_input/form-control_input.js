/** @class form-control */
modules.define('form-control', ['input'], function(provide, Input, Block) {
    provide(Block.declMod({ modName : 'input', modVal : '*' }, /** @lends form-control.prototype */{
        setVal : function(val) {
            this.findChildBlock(Input).setVal(val);
        }
    }));
});
