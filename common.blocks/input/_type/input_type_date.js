/** @class input */
modules.define('input', [
    'i-bem-dom', 'BEMHTML', 'popup', 'calendar', 'jquery__inputmask'
], function(provide, BEMDOM, BEMHTML, Popup, Calendar, $, Block) {
    provide(Block.declMod({ modName : 'type', modVal : 'date' }, /** @lends input.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    var _this = this,
                        theme = this.getMod('theme');

                    function getDate() {
                        var date = _this.getVal().split('.').reverse(),
                            year = date[0],
                            month = date[1] - 1,
                            day = date[2];

                        return new Date(year, month, day);
                    }

                    this._elem('control').domElem.inputmask({
                        alias : 'dd.mm.yyyy'
                    });

                    try {
                        this._date = getDate();
                        this._date.toISOString();
                    } catch(e) {
                        this._date = new Date();
                    }

                    this._popup = BEMDOM.init(BEMHTML.apply({
                        block : 'popup',
                        mods : { autoclosable : true, target : 'anchor', theme : 'islands' },
                        mix : { block : 'input-date', elem : 'popup', elemMods : { theme : theme } },
                        directions : this.params.directions,
                        content : [
                            {
                                block : 'input',
                                mods : { size : 'l', theme : theme, month : true }
                            },
                            {
                                block : 'input',
                                mods : { size : 'l', theme : theme, year : true }
                            }
                        ]
                    })).bem(Popup);
                    this._popup.setAnchor(this);

                    this._month = this._popup.findChildBlocks(Block).get(0);
                    this._year = this._popup.findChildBlocks(Block).get(1);

                    this._update();

                    this._popup._events(Calendar).on('change', function(e) {
                        _this._date = e.target.getVal();
                        _this.setVal(_this._date, { guard : true });
                    });

                    this._popup._events(Block).on('change', function(e) {
                        if(e.target.hasMod('month')) {
                            e.target.getVal().length && _this._date.setMonth(e.target.getVal() - 1);
                        } else if(e.target.hasMod('year')) {
                            e.target.getVal().length === 4 && _this._date.setFullYear(e.target.getVal());
                        }

                        _this._updateCalendar();
                        _this.setVal(_this._date, { guard : true });
                    });

                    this._events().on('change', function(e, data) {
                        if(data && data.guard) return;

                        var date;

                        try {
                            date = getDate();
                            date.toISOString();

                            _this._date = date;
                            _this._update();
                        } catch(e) {}
                    });

                    this.__base.apply(this, arguments);
                }
            },

            focused : function(modName, modVal) {
                modVal && this._popup.setMod('visible', true);
            }
        },

        _update : function() {
            this._month.setVal(this._date.getMonth() + 1);
            this._year.setVal(this._date.getFullYear());
            this._updateCalendar();
        },

        _updateCalendar : function() {
            var calendar = BEMDOM.init(BEMHTML.apply({
                block : 'calendar',
                js : { date : this._date.toISOString() },
                mods : { month : true, theme : 'islands' }
            })).bem(Calendar);

            if(this._calendar) {
                BEMDOM.replace(this._calendar.domElem, calendar.domElem);
            } else {
                BEMDOM.append(this._popup.domElem, calendar.domElem);
            }

            this._calendar = calendar;
            this._calendar.setVal(this._date);
        },

        setVal : function(val, data) {
            var date;

            try {
                date = val instanceof Date ? val : new Date(val.split('.').length === 3 ?
                    val.split('.').reverse().join('-') : val);
                date.toISOString();

                return this.__base([
                    ('0' + date.getDate()).slice(-2),
                    ('0' + (date.getMonth() + 1)).slice(-2),
                    date.getFullYear()
                ].join('.'), data);
            } catch(e) {}
        }
    }));
});
