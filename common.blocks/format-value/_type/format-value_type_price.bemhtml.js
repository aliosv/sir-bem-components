block('format-value').mod('type', 'price').def()(function() {
    var value = Number(this.ctx.content || '');

    return value
        .toFixed(2)
        .replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, '$1' + '&thinsp;')
        .replace('.', ',')
        .concat('&nbsp;₽');
});
