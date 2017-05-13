block('calendar-year')(
    elem('years')(
        js()(true),

        content()(function() {
            var targetYear = Number(this.ctx.targetYear);

            return [
                { elem : 'years-toggle', content : targetYear - 2 },
                { elem : 'years-toggle', content : targetYear - 1 },
                {
                    block : 'input',
                    mods : { size : 'm', theme : 'islands' },
                    val : targetYear,
                    placeholder : 'Год',
                    maxLength : 4
                },
                { elem : 'years-toggle', content : targetYear + 1 },
                { elem : 'years-toggle', content : targetYear + 2 }
            ];
        })
    ),

    elem('years-toggle').attrs()({ title : 'Установить год' })
);
