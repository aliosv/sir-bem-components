/** @class input */
modules.define('input', [
    'i-bem-dom', 'BEMHTML', 'popup'
], function(provide, BEMDOM, BEMHTML, Popup, Block) {
    provide(Block.declMod({ modName : 'type', modVal : 'date' }, /** @lends input.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    var _this = this;

                    this._initPopup();

                    // resolve circular dependency of input
                    modules.require(['calendar-year'], function(Calendar) {
                        _this._calendar = _this._popup.findChildBlock(Calendar);

                        _this._calendar._events().on('change', function(e, data) {
                            if(data && data.guard) return;

                            var date = e.target.getVal();

                            _this.setVal(date && date.toISOString(), { guard : true });

                            // закрывать попап с календарем при выборе в нем даты
                            if(date) _this.closePopup(true);
                        });

                        _this._events().on('change', function(e, data) {
                            if(data && data.guard) return;

                            _this._calendar
                                .setVal(_this._getDateVal(), { guard : true })
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

        /**
         * Creates Date from blocks _val
         * @returns {Date|undefined}
         * @private
         */
        _getDateVal : function() {
            if(!this.getVal()) return;

            var val = this.getVal().match(/^(\d\d)\.(\d\d)\.(\d\d\d\d)$/),
                date = val && new Date(val[3], val[2] - 1, val[1]);

            // returns undefined if date is invalid
            return !date || isNaN(date.getTime()) ? undefined : date;
        },

        /**
         * Converts value to target _val syntax(current: dd.mm.yyyy)
         * @param {*} val
         * @private
         */
        _getNormalizedVal : function(val) {
            var date;

            if(date = val && val.match(/(\d\d)\.(\d\d)\.(\d\d\d\d)$/)) {
                date = new Date(date[3], date[2] - 1, date[1]);
            } else if(val && val.match(/^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d\.\d\d\dZ$/)) {
                date = new Date(val);
            } else {
                return val;
            }

            return isNaN(date.getTime()) ? val : [
                '00' + date.getDate(), '00' + (date.getMonth() + 1), date.getFullYear()
            ].join('.').replace(/0+(.[0-9])\./g, '$1.');
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
                    val : this._getDateVal()
                }
            })).bem(Popup);
            BEMDOM.append(BEMDOM.doc.children('body'), this._popup.domElem);
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
        },

        /**
         * @param {String} val ISO 8601 или значение по дефолтной маске
         * @returns {this}
         */
        setVal : function(val) {
            if(val === this._val) return this.__base.apply(this, arguments);

            var args = [this._getNormalizedVal(val)].concat(Array.prototype.slice.call(arguments, 1));
            
            return this.__base.apply(this, args);
        }
    }));
});
