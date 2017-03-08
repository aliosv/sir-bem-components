/** @class form-control */
modules.define('form-control', ['radio-group'], function(provide, RadioGroup, Block) {
    provide(Block.declMod({ modName : 'radio-group', modVal : '*' }, /** @lends form-control.prototype */{
        setVal : function(val) {
            this.findChildBlock(RadioGroup).setVal(val);
        }
    }));
});
