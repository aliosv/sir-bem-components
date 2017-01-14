({
    block : 'page',
    mods : { theme : 'islands' },
    title : 'checkbox-tree',
    js : true,
    head : [{ elem : 'css', url : '_simple.css' }],
    scripts : [{ elem : 'js', url : '_simple.js' }],
    content : [
        {
            block : 'checkbox-tree',
            mods : { size : 'm', theme : 'simple' },
            options : [
                { text : 's1', name : 's1' },
                {
                    text : 'g2',
                    name : 'g2',
                    content : [
                        { text : '0', checked : true },
                        { text : '1', disabled : true },
                        {
                            text : 'g3',
                            name : 'g3',
                            content : [
                                { text : '0' },
                                {
                                    text : 'g4',
                                    name : 'g4',
                                    vals : ['0', '1', '2'],
                                    content : [
                                        { text : '0', disabled : true },
                                        { text : '1' },
                                        { text : '2' },
                                        { text : '3' }
                                    ]
                                },
                                {
                                    text : 'g5',
                                    name : 'g5',
                                    disabled : true,
                                    content : [
                                        { text : '0' },
                                        { text : '1' }
                                    ]
                                },
                                { text : '3' },
                                { text : '4' }
                            ]
                        },
                        { text : '3' },
                        { text : '4' },
                        {
                            text : 'g6',
                            name : 'g6',
                            vals : ['0', '1'],
                            content : [
                                { text : '0' },
                                { text : '1' }
                            ]
                        }
                    ]
                }
            ]
        },

        { block : 'data' }
    ]
})
