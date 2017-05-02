/** @class button */
modules.define('button', [], function(provide, Block) {
    provide(Block.declMod({ modName : 'type', modVal : 'file' }, /** @lends button.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    this.__base.apply(this, arguments);

                    this._input = this.domElem.children('input');
                }
            }
        },

        getVal : function() {
            return this._input.get(0).files;
        }
    }, /** @lends button */{
        onInit : function() {
            this.__base.apply(this, arguments);

            this._domEvents().on('change', function() {
                this._emit('change');
            });

            this._events().on('click', function(e) {
                this._input.click();
            });
        }
    }));
});
