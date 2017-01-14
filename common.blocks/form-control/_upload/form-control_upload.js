/* globals URL */

/** @class form-control */
modules.define('form-control', [], function(provide, Block) {
    provide(Block.declMod({ modName : 'upload', modVal : '*' }, /** @lends form-control.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    var $view = this._elem('control-wrap').domElem,
                        $preview = this._elem('preview').domElem,
                        preview = $preview.get(0);

                    preview.onload = function() {
                        var viewRatio = $view.width() / $view.height(),
                            imageRatio = preview.naturalWidth / preview.naturalHeight;

                        if(imageRatio > viewRatio) {
                            $preview.css({
                                height : '100%',
                                width : 'auto',
                                marginLeft : -($view.height() * imageRatio / 2) + 'px',
                                marginTop : 0,
                                left : '50%',
                                top : '0'
                            });
                        } else {
                            $preview.css({
                                height : 'auto',
                                width : '100%',
                                marginLeft : 0,
                                marginTop : -($view.width() / imageRatio / 2) + 'px',
                                left : '0',
                                top : '50%'
                            });
                        }
                    };
                }
            }
        }
    }, /** @lends form-control */{
        onInit : function() {
            this.__base.apply(this, arguments);

            this._domEvents('control').on('change', function(e) {
                if(!this.hasMod('upload')) return;

                var file = e.currentTarget.files[0];

                this._elem('preview')
                    .setMod('visible', !!file || '')
                    .domElem.attr('src', file ? URL.createObjectURL(file) : '');
            });
        }
    }));
});
