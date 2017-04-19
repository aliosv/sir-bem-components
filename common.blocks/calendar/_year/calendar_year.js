/** @class calendar */
modules.define('calendar', ['mini-map', 'jquery'], function(provide, MiniMap, $, Block) {
    provide(Block.declMod({ modName : 'year', modVal : true }, /** @lends calendar.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    this.__base.apply(this, arguments);

                    var _this = this,
                        monthsHeight = this._elem('months').domElem.height(),
                        visibleHeight = this._elem('visible').domElem.height(),
                        hiddenHeight = monthsHeight - visibleHeight,
                        monthCalendarChangeHandler = function(e) {
                            if(e.target === this) return;

                            this._val = e.target.getVal();

                            this._monthCalendars.forEach(function(block) {
                                if(block === e.target) return;
                                block.setVal();
                            });

                            this._emit('change');

                            this._events(Block).once('change', monthCalendarChangeHandler);
                        }.bind(this);

                    this._map = this.findChildBlock(MiniMap);
                    this._monthCalendars = this.findChildBlocks({ block : Block, modNam : 'month', modVal : true });

                    this._map.disableAxis('x').setThumbSize({
                        width : '100%',
                        height : _this._elem('list').domElem.height() * visibleHeight / monthsHeight
                    }).setVal({ x : 0.5, y : 0 });

                    this._map._events().on('change', function() {
                        _this._elem('visible').domElem.scrollTop(_this._map.getVal().y * hiddenHeight);
                    });

                    // TODO:
                    this._domEvents('visible').on('scroll', function() {
                        _this._map.setVal({
                            y : _this._elem('visible').domElem.scrollTop() / hiddenHeight
                        });
                    });

                    this._events(Block).once('change', monthCalendarChangeHandler);
                }
            }
        },

        getVal : function() {
            return this._val;
        },

        // TODO: set, delete, set out of range
        setVal : function(date) {
            //var year = date.getFullYear(),
            //    month = date.getMonth();
            //
            //this._monthCalendars.forEach(function(block) {
            //    if(block.params.year === year && block.params.month === month) block.setVal(date);
            //});

            return this;
        }
    }, /** @lends calendar */{}));
});
