/** @class input */
modules.define('input', ['jquery__inputmask'], function(provide, $, Block) {
    provide(Block.declMod({ modName : 'type', modVal : 'date' }, /** @lends input.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    var _this = this;

                    this._elem('control').domElem.inputmask({
                        alias : 'dd.mm.yyyy'
                    });

                    // jQuery.inputmask блокирует всплытие события click, нужного для функционирования блока
                    // popup_autoclosable
                    this._elem('control').domElem.on('click', function() {
                        _this.domElem.click();
                    });

                    this.__base.apply(this, arguments);
                }
            }
        }
    }));
});
