block('format-value').mod('price').def()(function() {
    return applyCtx({
        block : 'format-value',
        mods : { number : 'discharge' },
        content : Number(this.ctx.content)
            // показать два знака после запятой
            .toFixed(2)
    })
        // добавить валюту, если указана как modVal
        .concat(this.mods.price === 'RUR' ? '&nbsp;₽' : '');
});
