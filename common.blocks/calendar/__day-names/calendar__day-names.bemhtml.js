block('calendar').elem('day-names').content()(function() {
    return ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map(function(dayCaption, index) {
        return {
            elem : 'day-name', elemMods : { weekend : index > 4 || undefined },
            content : dayCaption
        };
    });
});
