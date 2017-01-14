modules.define('page', [
    'i-bem-dom', 'button', 'dialog-window'
], function(provide, BEMDOM, Button, DialogWindow) {
    provide(BEMDOM.declBlock(this.name, {
        onSetMod : {
            js : {
                inited : function() {
                    var btns = this.findChildBlocks(Button),
                        wins = this.findChildBlocks(DialogWindow);

                    btns.forEach(function(button, index) {
                        button._events().on('click', function() {
                            wins.get(index).open();
                        });
                    });
                }
            }
        }
    }));
});
