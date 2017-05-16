block('calendar-month').elem('day')(
    js()(true),

    // TODO: WTF??? get rid of this
    def()(function() {
        return applyNext(this.ctx);
    }),

    content()(function() {
        return this.ctx.dayIndex;
    })
);
