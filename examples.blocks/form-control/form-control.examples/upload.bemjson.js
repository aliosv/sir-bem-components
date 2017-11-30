({
    block : 'page',
    mods : { theme : 'islands' },
    title : 'Upload form control',
    head : [{ elem : 'css', url : '_upload.css' }],
    scripts : [{ elem : 'js', url : '_upload.js' }],
    content : [
        {
            block : 'form-control',
            mods : { theme : 'sir', upload : 'avatar' },
            label : 'Загрузите фото\n(можно сделать позже)',
            name : 'avatar'
        },
        { tag : 'br' },
        { tag : 'br' },
        {
            block : 'form-control',
            mods : { error : true, theme : 'sir', upload : 'avatar' },
            label : 'Загрузите фото\n(можно сделать позже)',
            error : 'Размер фото должен быть не менее 400х400 пикселей'
        },
        { tag : 'br' },
        { tag : 'br' },
        {
            block : 'form-control',
            mods : { theme : 'sir', upload : 'cover', coverType : 'project' },
            label : 'Загрузите фото для обложки проекта',
            name : 'project-cover'
        },
        { tag : 'br' },
        { tag : 'br' },
        {
            block : 'form-control',
            mods : { error : true, theme : 'sir', upload : 'cover', coverType : 'project' },
            label : 'Загрузите фото для обложки проекта',
            error : 'Размер фото должен быть не менее 400х400 пикселей'
        }
    ]
})
