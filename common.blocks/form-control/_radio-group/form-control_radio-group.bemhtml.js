block('form-control').mod('radio-group')(
    mix()(function() {
        return this.ctx.mods['radio-group'] !== true ?
            [].concat(applyNext(), { block : 'form-control', mods : { 'radio-group' : true } }) :
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
                        block : 'radio-group',
                        mods : this.extend(ctx.mods, {
                            'radio-group' : undefined,
                            type : ctx.mods['radio-group'] !== true ? ctx.mods['radio-group'] : undefined,
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
