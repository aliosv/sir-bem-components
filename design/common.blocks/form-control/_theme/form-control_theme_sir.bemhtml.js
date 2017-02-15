block('form-control').mod('theme', 'sir')(
    js()(true),

    mod('input').def()(function() {
        if(!this.ctx.hasOwnProperty('val') || !this.ctx.val) this.mods.empty = true;

        return applyNext();
    }),

    mod('select').elem('control').def()(function() {
        // TODO: _theme_sir design
        // force use select_theme_islands
        this.ctx.content[0].mods.theme = 'islands';

        return applyNext({
            ctx : this.ctx
        });
    }),

    mod('upload', 'avatar').elem('control').attrs()({ accept : 'image/*' }),
    mod('upload', 'project-cover').elem('control').attrs()({ accept : 'image/*' })
);
