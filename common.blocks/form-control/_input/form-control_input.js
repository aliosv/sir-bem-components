/** @class form-control */
modules.define('form-control', ['input'], function(provide, Input, Block) {
    // TODO: как наследовать блок Input?
    provide(Block.declMod({ modName : 'input', modVal : '*' }, /** @lends form-control.prototype */{
        setVal : function(val, data) {
            this.findChildBlock(Input).setVal(val, data);
        }
    }));
});
