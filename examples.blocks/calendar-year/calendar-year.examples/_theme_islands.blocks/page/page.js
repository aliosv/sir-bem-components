/** @class page */
modules.define('page', ['i-bem-dom', 'calendar-year'], function(provide, BEMDOM, Calendar) {
    provide(BEMDOM.declBlock(this.name, /** @lends page.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    this.__base.apply(this, arguments);

                    var _this = this;

                    this._events(Calendar).on('change', function(e) {
                        var val = e.target.getVal();

                        this._elem('date').domElem.val(!val ? '' : [
                            val.getFullYear(),
                            '0' + (val.getMonth() + 1),
                            '0' + val.getDate()
                        ].join('-').replace(/-0(\d\d)/, '-$1'));
                    });

                    this._domEvents('date').on('change', function(e) {
                        _this.findChildBlock(Calendar)
                            .setVal(new Date(e.currentTarget.value))
                            .scrollToVal(500);
                    });
                }
            }
        }
    }, /** @lends page */{}));
});
