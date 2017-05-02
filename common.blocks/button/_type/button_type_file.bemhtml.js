block('button').mod('type', 'file')(
    attrs()(function() {
        return this.extend(applyNext(), { type : 'button' });
    }),

    content()(function() {
        return [
            {
                tag : 'input',
                attrs : {
                    type : 'file',
                    accept : this.ctx.accept,
                    multiple : this.ctx.multiple,
                    name : this.ctx.name
                }
            },
            applyNext()
        ];
    })
);
