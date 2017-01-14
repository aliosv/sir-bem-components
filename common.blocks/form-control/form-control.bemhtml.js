block('form-control').mix()(function() {
    if(this.ctx.name) return { block : 'form-control', mods : { name : this.ctx.name } };
    return this.ctx.mix;
});
