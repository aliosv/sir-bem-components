block('form-control').mod('select')(
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
                        block : 'select',
                        mods : this.extend(ctx.mods, {
                            select : undefined,
                            hint : undefined
                        }),
                        mix : undefined
                    })
                ]
            },
            ctx.error ? {
                elem : 'error',
                content : ctx.error
            } : ''
        ];
    })
);
