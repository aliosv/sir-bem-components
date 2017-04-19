/** @class page */
modules.define('page', ['i-bem-dom', 'mini-map', 'image'], function(provide, BEMDOM, MiniMap, Image) {
    provide(BEMDOM.declBlock(this.name, /** @lends page.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    var map = this.findChildBlock(MiniMap),
                        img = this.findChildBlock(Image);

                    map._events().on('change', function() {
                        img.domElem.css({
                            backgroundPosition : map.getVal().x * 100 + '% ' + map.getVal().y * 100 + '%'
                        });
                    });

                    var i = document.createElement('img');

                    i.src = img.domElem.css('background-image').match(/^url\(["']?(.+?)["']?\)$/)[1];
                    i.onload = function() {
                        map.setVal({ x : 0.5, y : 0.5 }).setThumbSize({
                            width : img.domElem.width() / i.width * map.domElem.width(),
                            height : img.domElem.height() / i.height * map.domElem.height()
                        });
                    };
                }
            }
        }
    }));
});

/** @class image */
modules.define('image', ['i-bem-dom'], function(provide, BEMDOM) {
    provide(BEMDOM.declBlock(this.name, /** @lends image.prototype */{}, /** @lends image */{}));
});
