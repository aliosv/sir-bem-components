/** @class tooltip */
modules.define('tooltip', ['i-bem-dom', 'BEMHTML', 'popup'], function(provide, BEMDOM, BEMHTML, Popup) {
    provide(BEMDOM.declBlock(this.name, /** @lends tooltip.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    this._popup = BEMDOM.init(BEMHTML.apply({
                        block : 'popup',
                        mods : { target : 'anchor', theme : 'islands' },
                        mix : { block : 'tooltip', elem : 'popup', elemMods : { theme : this.getMod('theme') } },
                        directions : this.params.directions,
                        content : this.params.hint
                    })).bem(Popup);

                    this._popup.setAnchor(this);
                }
            }
        }
    }, /** @lends tooltip */{
        lazyInit : true,
        onInit : function() {
            this._domEvents().on('mouseover mouseleave', function(e) {
                this._popup.setMod('visible', e.type === 'mouseover' ? true : '');
            });
        }
    }));
});
