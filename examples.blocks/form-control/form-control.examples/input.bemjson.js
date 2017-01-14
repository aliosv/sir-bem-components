({
    block : 'page',
    mods : { theme : 'islands' },
    title : 'Input form control',
    head : [{ elem : 'css', url : '_input.css' }],
    scripts : [{ elem : 'js', url : '_input.js' }],
    content : [
        {
            block : 'form-control',
            mods : { hint : true, size : 'l', theme : 'sir', input : true },
            label : 'Заголовок',
            placeholder : 'Подсказка',
            hint : 'Всплывающая подсказка'
        },
        { tag : 'br' },
        { tag : 'br' },
        {
            block : 'form-control',
            mods : { size : 'l', theme : 'sir', input : true },
            label : 'Заголовок',
            placeholder : 'Подсказка',
            val : 'Текст'
        },
        { tag : 'br' },
        { tag : 'br' },
        {
            block : 'form-control',
            mods : { size : 'l', theme : 'sir', input : 'password' },
            label : 'Пароль',
            placeholder : 'Пароль',
            val : '123'
        },
        { tag : 'br' },
        { tag : 'br' },
        {
            block : 'form-control',
            mods : { error : true, size : 'l', theme : 'sir', input : 'password' },
            label : 'Пароль',
            placeholder : 'Пароль',
            val : '123',
            error : 'Ошибка'
        },
        { tag : 'br' },
        { tag : 'br' },
        {
            block : 'form-control',
            mods : { size : 'l', theme : 'sir', input : 'tel' },
            label : 'Телефон',
            placeholder : 'Телефон'
        },
        { tag : 'br' },
        { tag : 'br' },
        {
            block : 'form-control',
            mods : { size : 'l', theme : 'sir', input : 'date' },
            label : 'Дата'
        }
    ]
})
