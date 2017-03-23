/** @class form-control */
modules.define('form-control', ['input'], function(provide, Input, Block) {
    provide(Block.declMod({ modName : 'input', modVal : '*' }, /** @lends form-control.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    this.__base.apply(this, arguments);

                    this._input = this.findChildBlock(Input);
                }
            }
        }
    }, /** @lends form-control */{
        onInit : function() {
            this.__base.apply(this, arguments);

            this._events(Input)
                .on('change', function() {
                    this.setMod('empty', !this._input.getVal().length || '');
                })
                .on({ modName : 'disabled', modVal : '*' }, function(e, data) {
                    this.setMod('disabled', data.modVal);
                })
                .on({ modName : 'focused', modVal : '*' }, function(e, data) {
                    this.setMod('focused', data.modVal);
                });
        }
    }));
});

/** @class form-control */
modules.define('form-control', ['textarea'], function(provide, Textarea, Block) {
    provide(Block.declMod({ modName : 'textarea', modVal : '*' }, /** @lends form-control.prototype */{
        onSetMod : {
            js : {
                inited : function() {
                    this.__base.apply(this, arguments);

                    this._textarea = this.findChildBlock(Textarea);
                }
            }
        }
    }, /** @lends form-control */{
        onInit : function() {
            this.__base.apply(this, arguments);

            this._events(Textarea)
                .on('change', function() {
                    this.setMod('empty', !this._textarea.getVal().length || '');
                })
                .on({ modName : 'disabled', modVal : '*' }, function(e, data) {
                    this.setMod('disabled', data.modVal);
                })
                .on({ modName : 'focused', modVal : '*' }, function(e, data) {
                    this.setMod('focused', data.modVal);
                });
        }
    }));
});
