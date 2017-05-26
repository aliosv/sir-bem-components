/** @class calendar-month */
modules.define('calendar-month', [], function(provide, Block) {
    provide(Block.declMod({ modName : 'selectable', modVal : 'single' }, /** @lends calendar-month.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    this.__base.apply(this, arguments);

                    var selected = this.findChildElem({ elem : 'day', modName : 'selected', modVal : true });

                    this._date = new Date(this.params.date);

                    if(selected) {
                        this._val = new Date(this._date.getFullYear(), this._date.getMonth(), selected.getDate());
                    }

                    this._events('day').on('click', function(e) {
                        this.setVal(new Date(this._date.getFullYear(), this._date.getMonth(), e.target.getDate()));
                    });
                }
            }
        },

        getVal : function() {
            return this._val;
        },

        setVal : function(date, data) {
            if(this._val === date) return this;

            var invalidDate = date instanceof Date && isNaN(date.getTime());

            if(!date || invalidDate) {
                invalidDate && console.warn('Invalid date');

                delete this._val;
            } else {
                if(!this._checkRange(date)) {
                    // TODO: edit message
                    console.warn('Out of range');

                    return this.setVal();
                }

                this._val = date;
            }

            this.findChildElems({ elem : 'day', modName : 'selected', modVal : true }).delMod('selected');
            this._val && this.getDayByDate(this._val).setMod('selected', true);

            this._emit('change', data);

            return this;
        }
    }, /** @lends calendar-month */{}));
});
