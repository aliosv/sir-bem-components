/** @class page */
modules.define('page', ['i-bem-dom', 'calendar-year'], function(provide, BEMDOM, Calendar) {
    provide(BEMDOM.declBlock(this.name, /** @lends page.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    this.__base.apply(this, arguments);

                    this._events(Calendar).on('change', function(e) {
                        this._elem('date').domElem.html(e.target.getVal().toLocaleString());
                    });
                }
            }
        }
    }, /** @lends page */{}));
});
