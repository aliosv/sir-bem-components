/** @class button */
modules.define('button', [], function(provide, Block) {
    provide(Block.declMod({ modName : 'type', modVal : 'file' }, /** @lends button.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    this.__base.apply(this, arguments);

                    var _this = this;

                    this._input = this.domElem.children('input');
                    this._input.on('change', function() {
                        _this._emit('change');
                    });

                    this._events().on('click', function() {
                        _this._input.click();
                    });
                }
            }
        },

        getVal : function() {
            return this._input.get(0).files;
        }
    }, /** @lends button */{}));
});
