modules.define('page', [
    'i-bem-dom', 'spin-progress'
], function(provide, BEMDOM, SpinProgress) {
    provide(BEMDOM.declBlock(this.name, {
        onSetMod : {
            js : {
                inited : function() {
                    var progress = function(spin, v) {
                        spin.setVal(v + '%');

                        if(v === 100) return;

                        setTimeout(function() {
                            progress(spin, v + 1);
                        }, 200);
                    };

                    this.findChildBlocks(SpinProgress).forEach(function(spin) {
                        progress(spin, 0);
                    });
                }
            }
        }
    }));
});
