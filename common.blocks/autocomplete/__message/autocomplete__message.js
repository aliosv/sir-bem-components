/** @class autocomplete__message */
modules.define('autocomplete__message', ['i-bem-dom'], function(provide, BEMDOM) {
    provide(BEMDOM.declElem('autocomplete', 'message', /** @lends autocomplete__message.prototype */{
        onSetMod : {
            state : function(modName, modVal) {
                this._findBackRefs[0]._spin.setMod('visible', modVal === 'pending' || '');
                this._elem('message-text').domElem.html(({
                        empty : 'Нет данных',
                        error : 'Возникла ошибка'
                    })[modVal] || '');
            }
        }
    }, /** @lends autocomplete__message */{}));
});
