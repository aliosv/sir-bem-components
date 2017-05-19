/** @class input */
modules.define('input', [
    'i-bem-dom', 'BEMHTML', 'popup', 'jquery__inputmask'
], function(provide, BEMDOM, BEMHTML, Popup, $, Block) {
    provide(Block.declMod({ modName : 'type', modVal : 'date' }, /** @lends input.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    var _this = this,
                        theme = this.getMod('theme');

                    function getDate() {
                        if(!_this.getVal()) return;

                        var val = _this.getVal().split('.').reverse(),
                            year = val[0],
                            month = val[1] - 1,
                            day = val[2],
                            date = new Date(year, month, day);

                        return isNaN(date.getTime()) ? undefined : date;
                    }

                    this._elem('control').domElem.inputmask({
                        alias : 'dd.mm.yyyy'
                    });

                    // jQuery.inputmask блокирует всплытие события click, нужного для функционирования блока
                    // popup_autoclosable
                    this._elem('control').domElem.on('click', function() {
                        _this.domElem.click();
                    });

                    this._popup = BEMDOM.init(BEMHTML.apply({
                        block : 'popup',
                        mods : { autoclosable : true, target : 'anchor', theme : 'islands' },
                        mix : { block : 'input-date', elem : 'popup', elemMods : { theme : theme } },
                        directions : this.params.directions,
                        content : {
                            block : 'calendar-year',
                            mods : { theme : 'islands' },
                            val : getDate()
                        }
                    })).bem(Popup);
                    BEMDOM.append($(document.body), this._popup.domElem);
                    this._popup.setAnchor(this);

                    // resolve circular dependency of input
                    modules.require(['calendar-year'], function(Calendar) {
                        _this._calendar = _this._popup.findChildBlock(Calendar);

                        _this._calendar._events().on('change', function(e, data) {
                            if(data && data.guard) return;

                            var date = e.target.getVal();

                            _this.setVal(date ? [
                                ('0' + date.getDate()).slice(-2),
                                ('0' + (date.getMonth() + 1)).slice(-2),
                                date.getFullYear()
                            ].join('.') : date, { guard : true });
                        });

                        _this._events().on('change', function(e, data) {
                            if(data && data.guard) return;

                            _this._calendar
                                .setVal(getDate(), { guard : true })
                                .scrollToVal(300);
                        });
                    });

                    this.__base.apply(this, arguments);
                }
            },

            focused : function(modName, modVal) {
                if(modVal) {
                    this._popup.setMod('visible', true);
                    // при инициализации попап скрыт и нужные размеры в календаре считаются неверно, принудительно
                    // пересчитать
                    this._calendar && this._calendar.update().scrollToVal();
                }
            }
        }
    }));
});
