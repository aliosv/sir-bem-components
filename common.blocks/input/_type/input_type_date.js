/** @class input */
modules.define('input', [
    'i-bem-dom', 'BEMHTML', 'popup', 'jquery__inputmask'
], function(provide, BEMDOM, BEMHTML, Popup, $, Block) {
    provide(Block.declMod({ modName : 'type', modVal : 'date' }, /** @lends input.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    var _this = this;

                    this._elem('control').domElem.inputmask({
                        alias : 'dd.mm.yyyy'
                    });

                    // jQuery.inputmask блокирует всплытие события click, нужного для функционирования блока
                    // popup_autoclosable
                    this._elem('control').domElem.on('click', function() {
                        _this.domElem.click();
                    });

                    this._initPopup();

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
                                .setVal(_this._getDate(), { guard : true })
                                .scrollToVal(300);
                        });
                    });

                    this.__base.apply(this, arguments);
                }
            },

            focused : function(modName, modVal) {
                modVal ? this.openPopup() : this.closePopup();
            }
        },

        _getDate : function() {
            if(!this.getVal()) return;

            var val = this.getVal().split('.').reverse(),
                year = val[0],
                month = val[1] - 1,
                day = val[2],
                date = new Date(year, month, day);

            return isNaN(date.getTime()) ? undefined : date;
        },

        _initPopup : function() {
            var _this = this;

            this._popup = BEMDOM.init(BEMHTML.apply({
                block : 'popup',
                mods : { autoclosable : true, target : 'anchor', theme : 'islands' },
                mix : { block : 'input-date', elem : 'popup', elemMods : { theme : this.getMod('theme') } },
                directions : this.params.directions,
                content : {
                    block : 'calendar-year',
                    mods : { theme : 'islands' },
                    val : this._getDate()
                }
            })).bem(Popup);
            BEMDOM.append($(document.body), this._popup.domElem);
            this._popup.setAnchor(this);

            this._popup._domEvents().on('mousedown', function() {
                _this._popup._mouseDown = true;
            });

            // TODO: close popup when it's losing focus(blur inside)

            this._popup._events().on({ modName : 'visible', modVal : '' }, function(e) {
                delete e.target._mouseDown;
            });
        },

        _isPopupFocused : function() {
            return this._popup.getMod('visible') &&
                (this._popup._mouseDown || this._popup.domElem.find(":focus").length);
        },

        openPopup : function() {
            this._popup.setMod('visible', true);
            // при инициализации попап скрыт и нужные размеры в календаре считаются неверно, принудительно
            // пересчитать
            this._calendar && this._calendar.update().scrollToVal();

            return this;
        },

        closePopup : function(force) {
            var _this = this;

            if(force) {
                this._popup.delMod('visible');
            } else {
                // задержка чтобы поймать клик
                setTimeout(function() {
                    !_this._isPopupFocused() && _this._popup.delMod('visible');
                }, 300);
            }

            return this;
        }
    }));
});
