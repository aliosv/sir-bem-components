block('form').mod('theme', 'sir').content()(function() {
    var bemjson = applyNext();

    return [
        {
            elem : 'paranja',
            content : { block : 'spin', mods : { size : 'xl', theme : 'islands', visible : true } }
        },
        applyNext()
    ];
});
