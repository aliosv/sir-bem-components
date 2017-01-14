/** @class calendar */
modules.define('calendar', ['jquery'], function(provide, $, Block) {
    provide(Block.declMod({ modName : 'month', modVal : true }, /** @lends calendar.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    this.__base.apply(this, arguments);

                    var _this = this;

                    this._val = this.params.date ? new Date(this.params.date) : new Date();

                    this._domEvents('day').on('click', function(e) {
                        _this._val.setDate(Number(e.currentTarget.innerText));
                        _this.setVal(_this._val);
                    });
                }
            }
        },

        getVal : function() {
            return this._val;
        },

        setVal : function(date) {
            this._val = date;

            this
                .update()
                ._emit('change');

            return this;
        },

        update : function() {
            this.findChildElems({ elem : 'day', modName : 'selected', modVal : true }).delMod('selected');
            this._elems('day').get(this._val.getDate() - 1).setMod('selected', true);

            return this;
        }
    }, /** @lends calendar */{
        live : function() {
            this.liveInitOnEvent('mousedown');
            return false;
        },

        toHuman : function(date) {
            return ('0' + date.getDay()).substr(-2) + '.' +
                ('0' + date.getMonth()).substr(-2) + '.' +
                date.getFullYear();
        }
    }));
});
