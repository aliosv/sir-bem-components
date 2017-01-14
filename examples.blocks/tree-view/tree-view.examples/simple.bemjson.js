({
    block : 'page',
    mods : { theme : 'islands' },
    title : 'Tree-view',
    head : [{ elem : 'css', url : '_simple.css' }],
    scripts : [{ elem : 'js', url : '_simple.js' }],
    content : [
        {
            block : 'tree-view',
            mods : { theme : 'simple' },
            nodes : [
                { node : '1' },
                {
                    node : '2',
                    content : [
                        { node : '2.1' },
                        { node : '2.2' },
                        {
                            node : '2.3.1',
                            content : [
                                { node : '2.3.1.1' },
                                {
                                    node : '2.3.1.2',
                                    content : [
                                        { node : '2.3.1.2.1' },
                                        { node : '2.3.1.2.2' },
                                        { node : '2.3.1.2.3' },
                                        { node : '2.3.1.2.4' }
                                    ]
                                },
                                { node : '2.3.1.3' },
                                { node : '2.3.1.4' }
                            ]
                        },
                        { node : '2.4' },
                        { node : '2.5' },
                        {
                            node : '2.6',
                            content : [
                                { node : '2.6.1' },
                                { node : '2.6.2' },
                                { node : '2.6.3' },
                                { node : '2.6.4' }
                            ]
                        }
                    ]
                },
                { node : '3' }
            ]
        }
    ]
})
