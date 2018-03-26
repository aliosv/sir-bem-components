block('format-value').mod('number', 'discharge').def()(function() {
    return String(this.ctx.content)
        // форматирование числа по разрядам
        // &#8239; - узкий неразрывный пробел
        .replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, '$1' + '&#8239;')
        .replace('.', ',');
});
