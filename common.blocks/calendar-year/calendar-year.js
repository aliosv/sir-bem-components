/** @class calendar-year */
modules.define('calendar-year', [
    'i-bem-dom', 'BEMHTML', 'calendar-year__years', 'calendar-month'
], function(provide, BEMDOM, BEMHTML, __years, CalendarMonth) {
    provide(BEMDOM.declBlock(this.name, /** @lends calendar-year.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    this._monthCalendars = this.findChildBlocks(CalendarMonth);

                    var theme = this.getMod('theme'),
                        monthCalendarChangeHandler = function(e) {
                            if(e.target === this) return;

                            this._val = e.target.getVal();

                            this._monthCalendars.forEach(function(block) {
                                if(block === e.target) return;
                                block.setVal();
                            });

                            this._emit('change');

                            this._events(CalendarMonth).once('change', monthCalendarChangeHandler);
                        }.bind(this);

                    this._events(CalendarMonth).once('change', monthCalendarChangeHandler);

                    // TODO: устанавливать фокус в инпут
                    this._events(__years).on('change', function(e, data) {
                        BEMDOM.update(this.domElem, BEMHTML.apply({
                            block : 'calendar-year',
                            mods : { theme : theme },
                            elem : 'inner',
                            theme : theme,
                            date : new Date(data)
                        }));

                        // init elem
                        this.findChildElem('inner');
                        this._monthCalendars = this.findChildBlocks(CalendarMonth);
                    });
                }
            }
        },

        getVal : function() {
            return this._val;
        },

        // TODO: set, delete, set out of range
        setVal : function(date) {
            //var year = date.getFullYear(),
            //    month = date.getMonth();
            //
            //this._monthCalendars.forEach(function(block) {
            //    if(block.params.year === year && block.params.month === month) block.setVal(date);
            //});

            return this;
        }
    }, /** @lends calendar-year */{}));
});
