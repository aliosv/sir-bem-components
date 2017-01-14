/** @class autocomplete */
modules.define('autocomplete', [], function(provide, Block) {
    provide(Block.declMod({ modName : 'width', modVal : 'anchor' }, /** @lends autocomplete.prototype */{
        _focusHandler : function() {
            this.__base.apply(this, arguments);

            this._popup.domElem.css('width', this._targetInput.domElem.width());
        }
    }));
});
