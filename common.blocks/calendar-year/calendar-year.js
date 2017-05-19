/** @class calendar-year */
modules.define('calendar-year', [
    'i-bem-dom', 'BEMHTML', 'calendar-year__inner', 'calendar-year__years', 'calendar-month', 'input'
], function(provide, BEMDOM, BEMHTML, __inner, __years, CalendarMonth, Input) {
    provide(BEMDOM.declBlock(this.name, /** @lends calendar-year.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    var _this = this;

                    // Поиск предустановленного значения
                    this._getMonthCalendars().some(function(block) {
                        var val = block.getVal();

                        if(val) {
                            _this._val = val;
                            _this.scrollToVal();

                            return true;
                        }
                    });
                }
            }
        },

        _getMonthCalendars : function() {
            return this.findChildBlocks(CalendarMonth);
        },

        _getMonthCalendarByDate : function(date) {
            if(!date) return;

            return this._getMonthCalendars().filter(function(block) {
                return block.getDate().getFullYear() === date.getFullYear() &&
                    block.getDate().getMonth() === date.getMonth();
            }).get(0);
        },

        _calendarChangeHandler : function(e) {
            this.setVal(e.target.getVal());

            this._getMonthCalendars().forEach(function(block) {
                if(block === e.target) return;

                block.setVal();
            });

            this._events(CalendarMonth).once('change', this._calendarChangeHandler);
        },

        changeYear : function(year) {
            var theme = this.getMod('theme');

            BEMDOM.update(this.domElem, BEMHTML.apply({
                block : 'calendar-year',
                mods : { theme : theme },
                elem : 'inner',
                theme : theme,
                date : new Date(String(year))
            }));

            // init elem
            this.findChildElem('inner');

            this.setVal();

            return this;
        },

        getVal : function() {
            return this._val;
        },

        setVal : function(val, data) {
            if(val === this._val) return this;

            var calendar,
                invalidDate = val instanceof Date && isNaN(val.getTime());

            if(!val || invalidDate) {
                invalidDate && console.warn('Invalid date');

                delete this._val;

                this._getMonthCalendars().forEach(function(block) {
                    block.setVal();
                });
            } else {
                if(calendar = this._getMonthCalendarByDate(val)) {
                    this._val = val;

                    calendar.getVal() !== val && calendar.setVal(val);
                } else {
                    return this.changeYear(val.getFullYear()).setVal(val);
                }
            }

            this._emit('change', data);

            return this;
        },

        scrollToVal : function(duration) {
            var val,
                scrollTarget;

            if(val = this.getVal()) {
                scrollTarget = this.findChildElem('visible').domElem;
                scrollTarget.stop().animate({
                    scrollTop : this._getMonthCalendarByDate(val).domElem.position().top + scrollTarget.get(0).scrollTop
                }, duration || 0);
            }

            return this;
        },

        update : function() {
            this.findChildElem(__inner).update();

            return this;
        }
    }, /** @lends calendar-year */{
        onInit : function() {
            this._events(__years).on('change', function(e, data) {
                var _this = this;

                this.changeYear(data.year);

                // вернуть фокус в инпут после обновления блока, если ввод даты был осуществлен вручную
                data.input && _this.findChildBlock(Input).setMod('focused', true);
            });

            this._events(CalendarMonth).once('change', this.prototype._calendarChangeHandler);
        }
    }));
});
