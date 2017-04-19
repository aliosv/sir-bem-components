/** @class calendar */
modules.define('calendar', ['jquery'], function(provide, $, Block) {
    provide(Block.declMod({ modName : 'month', modVal : true }, /** @lends calendar.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    this.__base.apply(this, arguments);

                    if(this.params.date) {
                        this._val = new Date(this.params.date);
                    }
                }
            }
        },

        _update : function() {
            this.findChildElems({ elem : 'day', modName : 'selected', modVal : true }).delMod('selected');
            this._val && this._elems('day').get(this._val.getDate() - 1).setMod('selected', true);

            return this;
        },

        getVal : function() {
            return this._val;
        },

        // TODO: set: what if out of range?
        setVal : function(date) {
            if(this._val === date) return this;

            this._val = date;

            this
                ._update()
                ._emit('change');

            return this;
        }
    }, /** @lends calendar */{
        onInit : function() {
            this._domEvents('day').on('click', function(e) {
                this.setVal(new Date(this.params.year, this.params.month, Number(e.currentTarget.innerText)));
            });
        }
    }));
});
