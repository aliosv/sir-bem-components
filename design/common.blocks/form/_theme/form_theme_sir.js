/** @class form */
modules.define('form', [
    'i-bem-dom', 'BEMHTML', 'jquery', 'form-control', 'spin-progress'
], function(provide, BEMDOM, BEMHTML, $, FormControl, SpinProgress, Block) {
    provide(Block.declMod({ modName : 'theme', modVal : 'sir' }, {
        onSetMod : {
            js : {
                inited : function() {
                    this.__base.apply(this, arguments);

                    this._spinProgress = this.findChildBlock(SpinProgress);
                }
            }
        },

        _errors : {},

        hideErrors : function() {
            Object.keys(this._errors).forEach(function(key) {
                this._errors[key]
                    .delMod('error')
                    .setError('');
            }, this);

            return this;
        },

        showErrors : function(err) {
            var _this = this,
                validationErrors = err && err instanceof Error && err.name === 'ValidationError' &&
                    JSON.parse(err.message);

            this.hideErrors();

            // TODO: как выводить ошибки валидации, если контрол не найден?
            if(validationErrors) {
                Object.keys(validationErrors).forEach(function(key) {
                    var formControl = _this.findChildBlock({ block : FormControl, modName : 'name', modVal : key });

                    if(!formControl) return;

                    formControl
                        .setMod('error', true)
                        .setError(validationErrors[key].errors.reverse()[0]);

                    this._errors[formControl._uniqId] = formControl;
                }, this);

                return true;
            }

            this._emit('error', 'Произошла ошибка');
        },

        reset : function() {
            this.domElem.get(0).reset();
            this.hideErrors();

            return this;
        },

        setVal : function(data) {
            Object.keys(data).forEach(function(name) {
                var block = this.findChildBlock({ block : FormControl, modName : 'name', modVal : name });

                block && block.setVal && block.setVal(data[name]);
            }, this);
        },

        updateWithPromise : function(promise) {
            var _this = this;

            this
                .hideErrors()
                .setMod('pending', true);

            _this._spinProgress.setVal('');

            promise.progress(function(val) {
                _this._spinProgress.setVal(val);
            });

            promise.always(function() {
                _this.delMod('pending');
            });

            promise.fail(function(err) {
                _this.showErrors(err);
            });

            return promise;
        }
    }));
});
