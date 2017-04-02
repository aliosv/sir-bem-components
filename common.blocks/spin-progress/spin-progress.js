/** @class spin-progress */
modules.define('spin-progress', ['i-bem-dom'], function(provide, BEMDOM) {
    provide(BEMDOM.declBlock(this.name, /** @lends spin-progress.prototype */{
        setVal : function(val) {
            this._elem('progress').domElem.html(val);
        }
    }, /** @lends spin-progress */{
        lazyInit : true
    }));
});
