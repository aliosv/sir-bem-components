/** @class calendar-month */
modules.define('calendar-month__day', ['i-bem-dom'], function(provide, BEMDOM) {
    provide(BEMDOM.declElem('calendar-month', 'day', /** @lends calendar-month.prototype */{
        /**
         * Возвращает порядковый номер дня(1..31)
         * @returns {Number}
         */
        getDate : function() {
            // TODO: брать значение из html не хорошо
            return new Date(Number(this.domElem.text()));
        }
    }, /** @lends calendar-month */{
        lazyInit : true,
        onInit : function() {
            this._domEvents().on('click', function() {
                this._emit('click');
            });
        }
    }));
});
