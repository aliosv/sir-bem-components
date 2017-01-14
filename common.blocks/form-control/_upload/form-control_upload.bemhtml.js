block('form-control').mod('upload')(
    mix()(function() {
        return this.ctx.mods.upload !== true ?
            [].concat(applyNext(), { block : 'form-control', mods : { upload : true } }) :
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
                elem : 'control-wrap',
                content : [
                    {
                        elem : 'control',
                        tag : 'input',
                        attrs : { name : ctx.name, type : 'file' }
                    },
                    {
                        elem : 'preview',
                        tag : 'img'
                    }
                ]
            },
            ctx.error ? {
                elem : 'error',
                content : ctx.error
            } : ''
        ];
    })
);
