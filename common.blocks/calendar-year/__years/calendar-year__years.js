/** @class calendar-year */
modules.define('calendar-year__years', ['i-bem-dom'], function(provide, BEMDOM) {
    provide(BEMDOM.declElem('calendar-year', 'years', /** @lends calendar-year.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    var _this = this;

                    // getting rid of circular dependancy, when "input" use thi block(input_type_date)
                    modules.require(['input'], function(Input) {
                        _this._events(Input).on('change', function(e) {
                            var year = e.target.getVal();

                            if(year.length !== 4) return;

                            _this._emit('change', { year : year, input : true });
                        });
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
