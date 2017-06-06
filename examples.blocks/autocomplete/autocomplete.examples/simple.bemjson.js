var data = ["абонентов", "аварийная", "аварийных", "авиационных", "автовокзала", "автоответчик", "антикоррупционная", "аптекоуправления", "балакирева,", "безопасности", "билетов", "благоустройству", "больница", "борис", "борьбе", "бытовых", "бюро", "водолазная", "водоотведение", "водопонижения", "водоснабжение", "воды", "вопросам", "восточный", "вывозу", "газовая", "главное", "глаз", "гончара,", "горла,", "городов", "городское", "городской", "горсвет", "горячая", "гуданова,", "движения", "дезинсекция,", "дезинфекция,", "действиях", "дератизация", "деревьев,", "диспетчер", "диспетчерская", "диспетчерская,", "доверие", "доверия", "дороги", "дорожного", "дорремстрой", "доставки", "других", "единая", "железнодорожных", "железной", "животными", "жилкомсервис", "жителей", "заказ", "заказов", "защиты", "зеленых", "инвентаризации", "интернационала,", "информаторы,", "информационная", "информационно", "информация", "информирование", "канализации", "кисти", "клиническая", "коммунальные", "компания", "комплекс", "консультативный", "контроль", "координационный", "краснодарская,", "круглосуточно", "лекарственных", "ливневой", "линия", "лифтов", "медицинская", "медицинской", "милиции", "милиция", "муниципальная", "наблюдение,", "наличие", "наружного", "насаждений", "неотложная", "неотложной", "неправомерных", "номеров", "носа", "области", "областная", "областное", "облгосадминистрации", "обращению", "обращения", "обслуживанию", "общество", "объектов", "ожогах", "окружающей", "олеся", "оперативно", "орг.", "органов", "освещения", "отдел", "отходами", "отходов", "парковки", "переговоров", "питьевой", "поддержки", "пожаре", "поиска", "помощи", "помощь", "постышева,", "потребителей", "прав", "правоохранительных", "преступностью", "придомовых", "психологическая", "психологической", "пункты", "работ", "района", "расчетам", "региональный", "регионе", "регулирования", "ремонт", "ремонта", "ритуал", "салтовское", "санитарно", "сети", "сигнал", "скорая", "скорой", "служб", "служба", "службы", "снос", "содержание", "состоянии", "сотрудников", "социальные", "социальных", "спасатели", "спасательная", "спасательно", "спасения", "специализированная", "спецслужб", "справка", "справочная", "справочно", "справочное", "справочное", "справочные", "средств", "среды", "телефон", "телефонов", "телефоны", "тепловые", "территорий", "тех.", "техн.", "технической", "товарах", "травматологическая", "травматологические", "травмах", "травме", "уборка", "узла", "укртелеком", "управление", "услугах", "услуги", "уха,", "харьков", "харькова", "харьковблагоустройство", "харьковводоканал", "харьковгоргаз", "харьковгорлифт", "харьковзеленстрой", "харьковоблэнерго", "харьковпарксервис", "харьковская", "харьковские", "харьковского", "харьковское", "харьковской", "харьковчан", "холодной", "хоцссм", "центр", "центральная", "центральный", "частная", "чистый", "шоссе,", "эввива", "экологический", "экологическом", "эксплуатации", "экстренная", "экстренные", "электросетей", "южной"];

({
    block : 'page',
    title : 'Desktop blocks',
    head : [{ elem : 'css', url : '_simple.css' }],
    scripts : [{ elem : 'js', url : '_simple.js' }],
    mods : { theme : 'islands' },
    content : [
        {
            tag : 'h3',
            content : 'Автокомплит по всему введенному значению'
        },
        {
            block : 'input',
            mix : { block : 'autocomplete', js : { id : 1 } },
            mods : { size : 'xl', theme : 'islands' },
            autocomplete : false
        },
        '<br>',
        '<br>',
        {
            tag : 'h3',
            content : 'Один и тот же автокомплит для input и textarea с использованием разделителя(пробел)'
        },
        {
            block : 'input',
            mix : { block : 'autocomplete', js : { id : 2 } },
            mods : { size : 'xl', theme : 'islands' },
            autocomplete : false
        },
        '<br>',
        '<br>',
        {
            block : 'textarea',
            attrs : { style : 'width:300px;height:300px;' },
            mix : { block : 'autocomplete', js : { id : 2 } },
            mods : { size : 'xl', theme : 'islands' }
        },

        { block : 'autocomplete', mods : { size : 'l', theme : 'islands' }, js : { id : 1, data : data } },
        {
            block : 'autocomplete',
            mods : { size : 'l', theme : 'islands' },
            js : {
                id : 2,
                separator : '\\s',
                data : data
            }
        }
    ]
})