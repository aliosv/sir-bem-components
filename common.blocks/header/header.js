/** @class header */
modules.define('header', ['i-bem-dom', 'button', 'popup'], function(provide, BEMDOM, Button, Popup) {
    provide(BEMDOM.declBlock(this.name, /** @lends header.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    this._popup = this._elem('profilePopup').findMixedBlock(Popup);
                    this._popup.setAnchor(this._elem('profile'));
                }
            }
        }
    }, /** @lends header */{
        lazyInit : true,
        onInit : function() {
            this._events(Button).on('click', function(e) {
                if(this._elem('profile').findMixedBlock(Button) === e.target) {
                    this._popup.setMod('visible', true);
                }
            });
        }
    }));
});
