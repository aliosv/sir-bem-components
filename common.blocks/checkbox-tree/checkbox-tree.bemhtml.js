block('checkbox-tree').def()(function() {
    var _this = this,
        ctx = this.ctx,
        size = ctx.mods.size,
        theme = ctx.mods.theme,
        getId = (function() {
            var counter = 0,
                id = _this.generateId();

            return function() {
                return id + '-' + (counter++);
            };
        }());

    /**
     * Рекурсивно прокидывает поля(name, disabled, ...) из корневого узла группы в дочерние
     * @param {Array} nodes
     */
    function complementChilds(nodes, parentNames) {
        if(!nodes || !nodes.length) return;

        return nodes.map(function(node) {
            var names = (parentNames || []).slice();

            // если текущий узел является группой
            if(node.content) {
                // если корневой узел disabled - сделать все вложенные узлы disabled
                if(node.disabled === true) {
                    node.content.forEach(function(groupChild) {
                        groupChild.disabled = true;
                    });
                }

                // пробросить имя корневого узла во вложенные не групповые узлы
                if(node.name) {
                    // сохранять структуру вложенности в именах
                    names = (names || []).concat(node.name);

                    node.content.forEach(function(groupChild) {
                        // TODO: вынести разделитель в конфиг?
                        if(!groupChild.content) groupChild.name = names.join('.');
                    });

                    // удалить name из корневого узла, чтобы его значение не попадало в getVal() блока
                    delete node.name;
                }

                // автоматически установить значения для вложенных узлов, у которых они не заданы
                node.content.forEach(function(groupChild, index) {
                    if(!groupChild.content && !groupChild.hasOwnProperty('val')) groupChild.val = String(index);
                });

                if(node.vals) {
                    // чекнуть внутренние узлы соответствующие указанным значениям
                    node.content.forEach(function(groupChild) {
                        if(node.vals.indexOf(groupChild.val) > -1) groupChild.checked = true;
                    });
                }

                node.content = complementChilds(node.content, (names || []));
            }

            return node;
        });
    }

    /**
     * Рекурсивно модифицирует корневые узлы в зависимости от состояния дочерних
     * @param {Array} nodes
     */
    function updateRoots(nodes) {
        if(!nodes || !nodes.length) return;

        return nodes.map(function(node) {
            // если текущий узел является группой
            if(node.content) {
                node.content = updateRoots(node.content);

                // если все вложенные узлы disabled - сделать корневой узел disabled
                if(node.content.every(function(groupChild) { return groupChild.disabled === true; })) {
                    node.disabled = true;
                }

                // выставить соответствующие модификаторы для корневого узла группы
                if(node.content.every(function(groupChild) {
                        return groupChild.checked === true && !groupChild.partial;
                    })) {
                    node.checked = true;
                } else if(node.content.some(function(groupChild) { return groupChild.checked === true; })) {
                    node.checked = true;
                    node.partial = true;
                }
            }

            return node;
        });
    }

    /**
     * Рекурсивно строит bemjson с чекбоксами
     */
    function getCheckboxesTree(nodes, parents) {
        if(!nodes || !nodes.length) return;

        return nodes.map(function(node) {
            var js = {},
                id;

            // массив id всех родительских узлов
            js.parents = parents && JSON.stringify(parents);

            if(node.content) {
                // для корневых узлов групп создать уникальный id, на который будут ссылаться потомки любой вложенности
                js.id = id = getId();
            }

            return {
                node : {
                    block : 'checkbox',
                    mods : {
                        checked : node.checked,
                        disabled : node.disabled,
                        partial : node.partial,
                        size : size,
                        theme : theme
                    },
                    js : js,
                    name : node.name,
                    val : node.val,
                    text : node.text
                },
                content : getCheckboxesTree(node.content, (parents || []).concat(id))
            };
        });
    }

    return applyCtx({
        block : 'tree-view',
        mix : { block : 'checkbox-tree', mods : ctx.mods, js : true },
        nodes : getCheckboxesTree(updateRoots(complementChilds(ctx.options)))
    });
});
