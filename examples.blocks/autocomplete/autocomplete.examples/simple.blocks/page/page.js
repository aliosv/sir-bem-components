/** @class page */
modules.define('page', ['i-bem-dom'], function(provide, BEMDOM) {
    provide(BEMDOM.declBlock(this.name, /** @lends page.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    this.__base.apply(this, arguments);

//                    this.findBlockInside('autocomplete').setAnchor([this.findBlockInside('input')]);

                    this.domElem.find('form').bind('submit', function(e) {
                        e.preventDefault();
                    });
                }
            }
        }
    }, /** @lends page */{}));
});
