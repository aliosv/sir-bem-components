modules.define('input', ['jquery__inputmask'], function(provide, $, Block) {
    provide(Block.declMod({ modName : 'type', modVal : 'tel' }, {
        onSetMod : {
            js : {
                inited : function() {
                    this.__base.apply(this, arguments);

                    this._elem('control').domElem.inputmask({
                        mask : this.params.mask
                    });
                }
            }
        }
    }));
});
