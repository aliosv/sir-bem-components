block('form')(
    attrs()(function() { return { action : this.ctx.action, method : this.ctx.method }; }),
    js()(true),
    tag()('form')
);
