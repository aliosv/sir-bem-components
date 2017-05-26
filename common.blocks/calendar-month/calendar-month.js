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

        _checkRange : function(date) {
            return date.getFullYear() === this._date.getFullYear() &&
                date.getMonth() === this._date.getMonth();
        },

        getDate : function() {
            return this._date;
        },

        getDayByDate : function(date) {
            if(!date || !this._checkRange(date)) return;

            return this._elems('day').get(date.getDate() - 1);
        }
    }, /** @lends calendar-month */{}));
});
