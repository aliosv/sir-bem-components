/* globals URL */

/** @class form-control */
modules.define('form-control', [], function(provide, Block) {
    provide(Block.declMod({ modName : 'upload', modVal : '*' }, /** @lends form-control.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    var _this = this;

                    this._emptyFilelist = this._elem('val').domElem.get(0).files;

                    this._elem('preview').domElem.get(0).onload = function() {
                        _this.reflow();
                    };

                    this._domEvents('delete').on('click', function() {
                        this.setVal();
                    });
                }
            }
        },

        reflow : function() {
            var $view = this._elem('control-wrap').domElem,
                $preview = this._elem('preview').domElem,
                preview = $preview.get(0),
                viewWidth = $view.get(0).clientWidth,
                viewHeight = $view.get(0).clientHeight,
                viewRatio = viewWidth / viewHeight,
                imageRatio = preview.naturalWidth / preview.naturalHeight;

            if(imageRatio > viewRatio) {
                $preview.css({
                    height : '100%',
                    width : 'auto',
                    marginLeft : -(viewHeight * imageRatio / 2) + 'px',
                    marginTop : 0,
                    left : '50%',
                    top : '0'
                });
            } else {
                $preview.css({
                    height : 'auto',
                    width : '100%',
                    marginLeft : 0,
                    marginTop : -(viewWidth / imageRatio / 2) + 'px',
                    left : '0',
                    top : '50%'
                });
            }
        },

        /**
         * @param {String|Filelist} val
         */
        setVal : function(val) {
            var previewUrl = val ? typeof val === 'string' ? val : URL.createObjectURL(val[0]) : '';

            this._elem('preview')
                .setMod('visible', !!previewUrl)
                .domElem.attr('src', previewUrl);

            this._elem('delete').setMod('visible', !!val);

            if(typeof val === 'string' || !val) {
                this._elem('val').domElem
                    .attr('type', 'text')
                    .get(0).value = val || '';
            } else {
                this._elem('val').domElem
                    .attr('type', 'file')
                    .get(0).files = val || this._emptyFilelist;
            }

            return this;
        }
    }, /** @lends form-control */{
        onInit : function() {
            this.__base.apply(this, arguments);

            this._domEvents('control').on('change', function(e) {
                if(!this.hasMod('upload')) return;

                this.setVal(e.currentTarget.files);
            });
        }
    }));
});
