/** @class page */
modules.define('page', ['i-bem-dom', 'calendar-year'], function(provide, BEMDOM, Calendar) {
    provide(BEMDOM.declBlock(this.name, /** @lends page.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    this.__base.apply(this, arguments);

                    var _this = this,
                        updateInput = function(date) {
                            this._elem('date').domElem.val(!date ? '' : [
                                date.getFullYear(),
                                '0' + (date.getMonth() + 1),
                                '0' + date.getDate()
                            ].join('-').replace(/-0(\d\d)/g, '-$1'));
                        }.bind(this);

                    updateInput(this.findChildBlock(Calendar).getVal());

                    this._events(Calendar).on('change', function(e) {
                        updateInput(e.target.getVal());
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
