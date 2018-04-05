block('main-menu').content()(function() {
    var ctx = this.ctx;

    return (ctx.items || []).map(function(item) {
        var active = item.active === true || ctx.active && ctx.active === item.name;

        return {
            block : 'link',
            mix : [
                {
                    block : 'main-menu',
                    elem : 'item',
                    elemMods : { active : active, bottom : item.bottom }
                }
                ].concat(item.mix || []),
            url : !active || ctx.enableActiveUrl ? item.url : undefined,
            content : [
                item.icon,
                item.text ? {
                    elem : 'text',
                    content : item.text
                } : ''
            ]
        };
    });
});
