modules.define('dialog-window', [
    'i-bem-dom', 'BEMHTML', 'jquery', 'modal', 'button'
], function(provide, BEMDOM, BEMHTML, $, Modal, Button) {
    provide(BEMDOM.declBlock(this.name, {
        onSetMod : {
            js : {
                inited : function() {
                    var _this = this;

                    this._modal = this.findMixedBlock(Modal);

                    ['close', 'reject', 'resolve'].forEach(function(value) {
                        _this._elems({ elem : 'control', modName : 'type', modVal : value }).forEach(function(elem) {
                            elem._events(Button).on('click', function() {
                                _this[value](_this);
                            });
                        });
                    });
                }
            }
        },
        toggle : function() {
            this._modal.toggleMod('visible', true);
        },
        open : function() {
            var _this = this,
                isError = false;

            if(Array.isArray(this._onOpenArray)) {
                isError = this._onOpenArray.some(function(func) {
                    return func() === false;
                });
            }

            if(!isError) {
                if(this._elems('close').get(0)) {
                    this._domEvents(BEMDOM.win).on('keyup', function(e) {
                        if(e.keyCode === 27) {
                            _this.close();
                        }
                    });
                }

                this._modal.setMod('visible', true);
            }

            return this;
        },
        close : function() {
            var isError = false;

            if(Array.isArray(this._onCloseArray)) {
                isError = this._onCloseArray.some(function(func) {
                    return func() === false;
                });
            }

            if(!isError) {
                this._domEvents(BEMDOM.win).un('keyup');

                this._modal.delMod('visible');
            }

            return this;
        },
        resolve : function() {
            var isError = false;

            if(Array.isArray(this._onResolveArray)) {
                isError = this._onResolveArray.some(function(func) {
                    return func() === false;
                });
            }

            // TODO: закрывать окно вручную из кода?
            !isError && this.close(this);

            return this;
        },
        reject : function() {
            var isError = false;

            if(Array.isArray(this._onRejectArray)) {
                isError = this._onRejectArray.some(function(func) {
                    return func() === false;
                });
            }

            !isError && this.close(this);

            return this;
        },
        onOpen : function(func) {
            if($.isFunction(func)) {
                this._onOpenArray = (this._onOpenArray || []).concat(func);
            }

            return this;
        },
        onClose : function(func) {
            if($.isFunction(func)) {
                this._onCloseArray = (this._onCloseArray || []).concat(func);
            }

            return this;
        },
        onResolve : function(func) {
            if($.isFunction(func)) {
                this._onResolveArray = (this._onResolveArray || []).concat(func);
            }

            return this;
        },
        onReject : function(func) {
            if($.isFunction(func)) {
                this._onRejectArray = (this._onRejectArray || []).concat(func);
            }

            return this;
        }
    }));
});
