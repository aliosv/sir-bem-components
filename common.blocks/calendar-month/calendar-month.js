/** @class calendar-month */
modules.define('calendar-month', ['i-bem-dom'], function(provide, BEMDOM) {
    provide(BEMDOM.declBlock(this.name, /** @lends calendar-month.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    this._date = new Date(this.params.date);
                }
            }
        },

        getDate : function() {
            return this._date;
        }
    }, /** @lends calendar-month */{}));
});
