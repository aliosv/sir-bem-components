modules.define('page', [
    'i-bem-dom', 'button', 'notify'
], function(provide, BEMDOM, Button, Notify) {
    provide(BEMDOM.declBlock(this.name, {
        onSetMod : {
            js : {
                inited : function() {
                    var btns = this.findChildBlocks(Button),
                        notify = this.findMixedBlock(Notify);

                    btns.forEach(function(button, index) {
                        button._events().on('click', function() {
                            notify.add('Message', index === 0 ? 'success' : 'error');
                        });
                    });
                }
            }
        }
    }));
});
