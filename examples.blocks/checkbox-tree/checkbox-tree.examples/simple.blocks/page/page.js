modules.define('page', [
    'i-bem-dom', 'BEMHTML', 'checkbox-tree'
], function(provide, bemDom, BEMHTML, CheckboxList) {
    provide(bemDom.declBlock(this.name, {
        onSetMod : {
            js : {
                inited : function() {
                    var list = this.findChildBlock(CheckboxList),
                        data = this.findChildBlock(bemDom.declBlock('data'));

                    function convertToTreeData(nodes) {
                        if(!nodes || !nodes.length) return;

                        return nodes.map(function(node) {
                            return {
                                node : node.name || node,
                                content : convertToTreeData((node.vals || []).concat(node.content || []))
                            };
                        });
                    }

                    this._events(list).on('change', (function() {
                        var handler = function() {
                            var text = [
                                BEMHTML.apply({
                                    block : 'tree-view',
                                    mods : { theme : 'simple' },
                                    nodes : convertToTreeData(list.getValTree())
                                }),
                                JSON.stringify(list.getVal(), null, 4)
                            ].join('<br><br>');

                            data.domElem.html(text);
                        };

                        handler();

                        return handler;
                    }()));
                }
            }
        }
    }));
});
