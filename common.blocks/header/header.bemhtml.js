block('header')(
    js()(true),

    content()(function() {
        return [
            {
                elem : 'text',
                content : this.ctx.content
            },
            {
                elem : 'controls',
                content : [
                    this.ctx.action || '',
                    {
                        block : 'button',
                        mods : { size : 'l', theme : 'sir', view : 'plain' },
                        icon : {
                            block : 'icon',
                            mods : { button : 'search-orange' }
                        }
                    },
                    {
                        block : 'button',
                        mods : { size : 'l', theme : 'sir', view : 'plain' },
                        mix : { block : 'header', elem : 'profile' },
                        icon : {
                            block : 'icon',
                            mods : { button : 'profile-orange' }
                        }
                    }
                ]
            },
            {
                block : 'popup',
                mods : { autoclosable : true, theme: 'islands', target : 'anchor' },
                mix : { block : 'header', elem : 'profilePopup' },
                content : this.ctx.profileMenu
            }
        ];
    })
);
