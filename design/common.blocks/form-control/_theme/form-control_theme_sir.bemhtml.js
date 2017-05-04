block('form-control').mod('theme', 'sir')(
    js()(true),

    mod('input').def()(function() {
        if(!this.ctx.hasOwnProperty('val') || !this.ctx.val) this.mods.empty = true;

        return applyNext();
    }),

    mod('textarea').def()(function() {
        if(!this.ctx.hasOwnProperty('val') || !this.ctx.val) this.mods.empty = true;

        return applyNext();
    }),

    mod('upload', 'avatar').elem('control').attrs()({ accept : 'image/*' }),
    mod('upload', 'project-cover').elem('control').attrs()({ accept : 'image/*' })
);
