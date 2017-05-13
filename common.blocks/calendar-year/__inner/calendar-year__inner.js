/** @class calendar-year */
modules.define('calendar-year__inner', ['i-bem-dom', 'mini-map'], function(provide, BEMDOM, MiniMap) {
    provide(BEMDOM.declElem('calendar-year', 'inner', /** @lends calendar-year.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    var _this = this,
                        monthsHeight = this._elem('months').domElem.height(),
                        visibleHeight = this._elem('visible').domElem.height(),
                        hiddenHeight = monthsHeight - visibleHeight;

                    this._map = this.findChildBlock(MiniMap);

                    this._map.disableAxis('x').setThumbSize({
                        width : '100%',
                        height : _this._elem('list').domElem.height() * visibleHeight / monthsHeight
                    }).setVal({ x : 0, y : 0 });

                    this._map._events().on('change', function() {
                        _this._elem('visible').domElem.scrollTop(_this._map.getVal().y * hiddenHeight);
                    });

                    this._elem('visible')._domEvents().on('scroll', function() {
                        _this._map.setVal({
                            y : _this._elem('visible').domElem.scrollTop() / hiddenHeight
                        });
                    });
                }
            }
        }
    }, /** @lends calendar-year */{}));
});
