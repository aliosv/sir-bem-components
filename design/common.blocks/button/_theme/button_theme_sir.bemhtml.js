block('button').mod('theme', 'sir').content()(function() {
    // возможность добавлять иконку после текста
    return [].concat(applyNext(), this.ctx.iconAfter);
});
