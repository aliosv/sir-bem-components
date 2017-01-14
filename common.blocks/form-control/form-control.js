/** @class form-control */
modules.define('form-control', ['i-bem-dom', 'BEMHTML'], function(provide, BEMDOM, BEMHTML) {
    provide(BEMDOM.declBlock(this.name, /** @lends form-control.prototype */{
        setError : function(message) {
            var error = this.findChildElem('error');

            if(error) {
                error.domElem.html(message);
            } else {
                BEMDOM.append(this.domElem, BEMHTML.apply({
                    block : 'form-control',
                    elem : 'error',
                    content : message
                }));
            }
        }
    }, /** @lends form-control */{
        lazyInit : true
    }));
});
