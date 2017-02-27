block('form-control').mod('textarea')(
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
                        block : 'textarea',
                        mods : this.extend(ctx.mods, {
                            textarea : undefined
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
