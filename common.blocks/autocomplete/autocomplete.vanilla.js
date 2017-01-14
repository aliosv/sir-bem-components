modules.define('autocomplete', [], function(provide) {
    provide({
        /**
         * Метод поиска запроса среди массива данных
         * @param {*} query
         * @param {*} data
         * @returns {Array<Object>} Возвращает массив блоков menu-item
         * @private
         */
        // TODO: подумать, можно ли делать поиск по нескольким словам с разделителем?
        // т.е. в инпуте: слово + разделитель + слово + ... сравнивать с цельной фразой в автокомплите(напр. адрес)
        search : function(query, data) {
            // TODO: wtf?  \ -> [\] - match all
            var re = new RegExp('^([\\s\\S]*?)([' + query.split('').join('])([\\s\\S]*?)([') + '])([\\s\\S]*?)$', 'i'),
                items = [];

            data.forEach(function(obj) {
                var string = typeof obj === 'string' ? obj : obj.text,
                    val = typeof obj === 'string' ? obj : obj.val,
                    match = string.match(re),
                    text,

                    positionWeight,
                    maxPositionScore,
                    positionPenalty,

                    nTokensWeight,
                    nTokensMax,
                    nTokens;

                /*
                 * Алгоритм расчитывает вес для каждого варианта на основе кол-ва токенов и их позиции.
                 * Чем меньше токенов и чем ближе они к началу строки, в которой ведется поиск, тем больше вес.
                 * Токен - неразрывный кусок текста из запроса,
                 * например: данные - 'SearCH', запрос - 'sch', токены - ['s', 'ch'].
                 * */
                if(match) {
                    maxPositionScore = query.length * match[0].length;
                    positionPenalty = match.slice(1).reduce(function(prev, value, index, arr) {
                        if(index % 2 === 0) return prev;

                        var i = index,
                            penalty = 0;

                        while(i > 0) {
                            penalty += arr[i - 1].length * value.length;
                            i -= 2;
                        }
                        return prev + penalty;
                    }, 0);
                    positionWeight = (maxPositionScore - positionPenalty) / maxPositionScore || 1;

                    nTokensMax = Math.ceil(string.length / 2);
                    nTokens = match.slice(2, match.length - 2).filter(function(value, index) {
                            // оставляем только несматченные участки между токенами
                            return index % 2 && value;
                        }).length + 1;
                    nTokensWeight = (nTokensMax - nTokens + 1) / nTokensMax;

                    text = match.slice(1).map(function(value, index) {
                        return index % 2 ? '<b>' + value + '</b>' : value;
                    }).join('');

                    items.push({
                        text : text,
                        val : val,
                        weight : positionWeight * nTokensWeight
                    });
                }
            });

            return items.sort(function(a, b) {
                // сортировка по алфавиту (для вариантов с одинаковым весом)
                if(a.weight === b.weight) return a.val > b.val ? 1 : -1;
                // сортировка по весу
                return b.weight - a.weight;
            });
        }
    });
});
