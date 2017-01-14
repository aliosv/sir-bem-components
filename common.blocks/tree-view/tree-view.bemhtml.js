block('tree-view').content()(function() {
    function getBemjson(nodes) {
        if(!nodes || !nodes.length) return;

        return nodes.map(function(node) {
            return {
                elem : 'node',
                elemMods : { group : !!node.content },
                content : [node.node].concat(getBemjson(node.content))
            };
        });
    }

    return getBemjson(this.ctx.nodes);
});
