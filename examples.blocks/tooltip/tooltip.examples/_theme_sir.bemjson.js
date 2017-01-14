({
    block : 'page',
    js : true,
    title : 'Tooltip',
    head : [{ elem : 'css', url : '__theme_sir.css' }],
    scripts : [{ elem : 'js', url : '__theme_sir.js' }],
    mods : { theme : 'islands' },
    content : [
        {
            tag : 'table',
            content : [
                {
                    tag : 'tr',
                    content : [
                        {
                            tag : 'td'
                        },
                        {
                            tag : 'td',
                            content : {
                                block : 'tooltip',
                                mods : { theme : 'sir' },
                                js : { hint : 'Text', directions : ['bottom-left'] },
                                content : 'bottom-left'
                            }
                        },
                        {
                            tag : 'td',
                            content : {
                                block : 'tooltip',
                                mods : { theme : 'sir' },
                                js : { hint : 'Text', directions : ['bottom-center'] },
                                content : 'bottom-center'
                            }
                        },
                        {
                            tag : 'td',
                            content : {
                                block : 'tooltip',
                                mods : { theme : 'sir' },
                                js : { hint : 'Text', directions : ['bottom-right'] },
                                content : 'bottom-right'
                            }
                        },
                        {
                            tag : 'td'
                        }
                    ]
                },
                {
                    tag : 'tr',
                    content : [
                        {
                            tag : 'td',
                            content : {
                                block : 'tooltip',
                                mods : { theme : 'sir' },
                                js : { hint : 'Text', directions : ['right-top'] },
                                content : 'right-top'
                            }
                        },
                        {
                            tag : 'td'
                        },
                        {
                            tag : 'td'
                        },
                        {
                            tag : 'td'
                        },
                        {
                            tag : 'td',
                            content : {
                                block : 'tooltip',
                                mods : { theme : 'sir' },
                                js : { hint : 'Text', directions : ['left-top'] },
                                content : 'left-top'
                            }
                        }
                    ]
                },
                {
                    tag : 'tr',
                    content : [
                        {
                            tag : 'td',
                            content : {
                                block : 'tooltip',
                                mods : { theme : 'sir' },
                                js : { hint : 'Text', directions : ['right-center'] },
                                content : 'right-center'
                            }
                        },
                        {
                            tag : 'td'
                        },
                        {
                            tag : 'td',
                            content : 'Hover for tooltip'
                        },
                        {
                            tag : 'td'
                        },
                        {
                            tag : 'td',
                            content : {
                                block : 'tooltip',
                                mods : { theme : 'sir' },
                                js : { hint : 'Text', directions : ['left-center'] },
                                content : 'left-center'
                            }
                        }
                    ]
                },
                {
                    tag : 'tr',
                    content : [
                        {
                            tag : 'td',
                            content : {
                                block : 'tooltip',
                                mods : { theme : 'sir' },
                                js : { hint : 'Text', directions : ['right-bottom'] },
                                content : 'right-bottom'
                            }
                        },
                        {
                            tag : 'td'
                        },
                        {
                            tag : 'td'
                        },
                        {
                            tag : 'td'
                        },
                        {
                            tag : 'td',
                            content : {
                                block : 'tooltip',
                                mods : { theme : 'sir' },
                                js : { hint : 'Text', directions : ['left-bottom'] },
                                content : 'left-bottom'
                            }
                        }
                    ]
                },
                {
                    tag : 'tr',
                    content : [
                        {
                            tag : 'td'
                        },
                        {
                            tag : 'td',
                            content : {
                                block : 'tooltip',
                                mods : { theme : 'sir' },
                                js : { hint : 'Text', directions : ['top-left'] },
                                content : 'top-left'
                            }
                        },
                        {
                            tag : 'td',
                            content : {
                                block : 'tooltip',
                                mods : { theme : 'sir' },
                                js : { hint : 'Text', directions : ['top-center'] },
                                content : 'top-center'
                            }
                        },
                        {
                            tag : 'td',
                            content : {
                                block : 'tooltip',
                                mods : { theme : 'sir' },
                                js : { hint : 'Text', directions : ['top-right'] },
                                content : 'top-right'
                            }
                        },
                        {
                            tag : 'td'
                        }
                    ]
                }
            ]
        }
    ]
})
