block('spin-progress')(
    js()(true),

    content()(function() {
        return [
            {
                block : 'spin',
                mods : this.ctx.mods
            },
            {
                elem : 'progress',
                content : this.ctx.content
            }
        ];
    })
);
