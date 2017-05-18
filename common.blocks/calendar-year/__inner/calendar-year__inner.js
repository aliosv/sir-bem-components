/** @class calendar-year */
modules.define('calendar-year__inner', ['i-bem-dom', 'mini-map'], function(provide, BEMDOM, MiniMap) {
    provide(BEMDOM.declElem('calendar-year', 'inner', /** @lends calendar-year.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    var _this = this;

                    this._map = this.findChildBlock(MiniMap);

                    this._map.disableAxis('x').setVal({ x : 0, y : 0 });
                    this.update();

                    this._map._events().on('change', function() {
                        _this._elem('visible').domElem.scrollTop(_this._map.getVal().y * _this._hiddenHeight);
                    });

                    this._elem('visible')._domEvents().on('scroll', function() {
                        _this._map.setVal({
                            y : _this._elem('visible').domElem.scrollTop() / _this._hiddenHeight
                        });
                    });
                }
            }
        },

        update : function() {
            var monthsHeight = this._elem('months').domElem.height();

            this._visibleHeight = this._elem('visible').domElem.height();
            this._hiddenHeight = monthsHeight - this._visibleHeight;

            this._map.setThumbSize({
                width : '100%',
                height : this._elem('list').domElem.height() * this._visibleHeight / monthsHeight
            });
        }
    }, /** @lends calendar-year */{}));
});
