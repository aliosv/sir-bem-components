/** @class form */
modules.define('form', [
    'i-bem-dom', 'BEMHTML', 'jquery', 'form-control'
], function(provide, BEMDOM, BEMHTML, $, FormControl, Block) {
    provide(Block.declMod({ modName : 'theme', modVal : 'sir' }, {
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

            return;
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

            promise.fail(function(err) {
                _this.showErrors(err);
            }).always(function() {
                _this.delMod('pending');
            });

            return promise;
        }
    }));
});
