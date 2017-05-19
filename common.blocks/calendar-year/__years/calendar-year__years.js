/** @class calendar-year */
modules.define('calendar-year__years', ['i-bem-dom', 'input'], function(provide, BEMDOM, Input) {
    provide(BEMDOM.declElem('calendar-year', 'years', /** @lends calendar-year.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    this._events(Input).on('change', function(e) {
                        var year = e.target.getVal();

                        if(year.length !== 4) return;

                        this._emit('change', { year : year, input : true });
                    });
                }
            }
        }
    }, /** @lends calendar-year */{
        onInit : function() {
            this._domEvents('years-toggle').on('click', function(e) {
                this._emit('change', { year : e.target.innerHTML });
            });
        }
    }));
});
