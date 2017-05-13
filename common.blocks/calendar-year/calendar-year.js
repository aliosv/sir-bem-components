/** @class calendar-year */
modules.define('calendar-year', [
    'i-bem-dom', 'BEMHTML', 'calendar-year__years', 'calendar-month', 'input'
], function(provide, BEMDOM, BEMHTML, __years, CalendarMonth, Input) {
    provide(BEMDOM.declBlock(this.name, /** @lends calendar-year.prototype */{
        _update : function(year) {
            var theme = this.getMod('theme');

            BEMDOM.update(this.domElem, BEMHTML.apply({
                block : 'calendar-year',
                mods : { theme : theme },
                elem : 'inner',
                theme : theme,
                date : new Date(year)
            }));

            // init elem
            this.findChildElem('inner');

            this.setVal();

            return this;
        },

        getVal : function() {
            return this._val;
        },

        setVal : function(val) {
            if(val === this._val) return;

            var year = val.getFullYear(),
                month = val.getMonth(),
                calendars = this.findChildBlocks(CalendarMonth),
                calendar = calendars.filter(function(block) {
                    return block.params.year === year && block.params.month === month;
                })[0];

            if(calendar) {
                this._val = val;

                calendar.getVal() !== val && calendar.setVal(val);
            } else {
                delete this._val;

                calendars.forEach(function(block) { block.setVal(); });
            }

            this._emit('change');

            return this;
        },

        _calendarChangeHandler : function(e) {
            this.setVal(e.target.getVal());

            this.findChildBlocks(CalendarMonth).forEach(function(block) {
                if(block === e.target) return;

                block.setVal();
            });

            this._events(CalendarMonth).once('change', this._calendarChangeHandler);
        }
    }, /** @lends calendar-year */{
        onInit : function() {
            this._events(__years).on('change', function(e, data) {
                this._update(data.year);

                // вернуть фокус в инпут после обновления блока, если ввод даты был осуществлен вручную
                data.input && this.findChildBlock(Input).setMod('focused', true);
            });

            this._events(CalendarMonth).once('change', this.prototype._calendarChangeHandler);
        }
    }));
});
