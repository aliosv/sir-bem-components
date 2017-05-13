/** @class calendar-month */
modules.define('calendar-month', ['i-bem-dom'], function(provide, BEMDOM) {
    provide(BEMDOM.declBlock(this.name, /** @lends calendar-month.prototype */{
        onSetMod : {
            js : {
                inited : function() {
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
    }, /** @lends calendar-month */{
        onInit : function() {
            this._domEvents('day').on('click', function(e) {
                this.setVal(new Date(this.params.year, this.params.month, Number(e.currentTarget.innerText)));
            });
        }
    }));
});
