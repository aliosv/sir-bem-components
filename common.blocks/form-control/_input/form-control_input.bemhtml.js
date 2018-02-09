block('form-control').mod('input')(
    mix()(function() {
        return this.ctx.mods.input !== true ?
            [].concat(applyNext(), { block : 'form-control', mods : { input : true } }) :
            applyNext();
    }),

    content()(function() {
        var ctx = this.ctx;

        return [
            ctx.label ? {
                elem : 'label',
                content : ctx.label
            } : '',
            {
                elem : 'control',
                content : [
                    this.extend(ctx, {
                        block : 'input',
                        mods : this.extend(ctx.mods, {
                            input : undefined,
                            type : ctx.mods.input !== true ? ctx.mods.input : undefined,
                            hint : undefined
                        }),
                        mix : undefined
                    }),
                    ctx.hint && ctx.mods.hint === true ? {
                        block : 'icon',
                        mods : { size : this.ctx.mods.size, theme : this.ctx.mods.theme, type : 'hint-grey' },
                        mix : { block : 'tooltip', mods : { theme : ctx.mods.theme }, js : { hint : ctx.hint } }
                    } : ''
                ]
            },
            ctx.error ? {
                elem : 'error',
                content : ctx.error
            } : ''
        ];
    })
);
