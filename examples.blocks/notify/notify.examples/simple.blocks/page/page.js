modules.define('page', [
    'i-bem-dom', 'button', 'notify', 'vow'
], function(provide, BEMDOM, Button, Notify, vow) {
    provide(BEMDOM.declBlock(this.name, {
        onSetMod : {
            js : {
                inited : function() {
                    var btns = this.findChildBlocks(Button),
                        notify = this.findMixedBlock(Notify);

                    btns.toArray().slice(0, 2).forEach(function(button, index) {
                        button._events().on('click', function() {
                            notify.add('Message', ['success', 'error'][index]);
                        });
                    });

                    btns.get(2)._events().on('click', function() {
                        var defer = vow.defer(),
                            promise = defer.promise();

                        setTimeout(function() {
                            defer[Math.random() > 0.5 ? 'resolve' : 'reject']();
                        }, 1500);

                        notify.add('Message', 'pending', promise);
                        promise.then(function() {
                            notify.add('Message', 'success');
                        }, function() {
                            notify.add('Message', 'error');
                        });
                    });
                }
            }
        }
    }));
});
