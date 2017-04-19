/** @class calendar */
modules.define('calendar', ['i-bem-dom'], function(provide, BEMDOM) {
    provide(BEMDOM.declBlock(this.name, /** @lends calendar.prototype */{}, /** @lends calendar */{
        lazyInit : true,

        toHuman : function(date) {
            return [
                ('0' + date.getDay()).substr(-2),
                ('0' + date.getMonth()).substr(-2),
                date.getFullYear()
            ].join('.');
        }
    }));
});
