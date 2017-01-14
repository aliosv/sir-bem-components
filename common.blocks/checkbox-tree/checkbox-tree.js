modules.define('checkbox-tree', [
    'i-bem-dom', 'jquery', 'dom', 'checkbox'
], function(provide, bemDom, $, dom, Checkbox) {
    provide(bemDom.declBlock(this.name, {
        onSetMod : {
            js : {
                inited : function() {
                    var _this = this,
                        blocks = this.findChildBlocks(Checkbox),
                        rootNodes = blocks.filter(function(block) {
                            return block.params.id;
                        }),
                        rootNodesById = {},
                        insideSingleNodes = blocks.filter(function(block) {
                            return block.params.parents && !block.params.id;
                        }),
                        insideSingleNodesByParentId = {},
                        guard = {};

                    function updateParent(id) {
                        var parent = rootNodesById[id],
                            childsChecked = insideSingleNodesByParentId[id].filter(function(block) {
                                return block.hasMod('checked');
                            }).length;

                        if(childsChecked > 0) {
                            parent.setMod('checked', true);

                            if(childsChecked !== insideSingleNodesByParentId[id].length) {
                                parent.setMod('partial', true);
                            } else {
                                parent.delMod('partial');
                            }
                        } else {
                            parent
                                .delMod('checked')
                                .delMod('partial');
                        }
                    }

                    function getNodeRoots(node) {
                        return JSON.parse(node.params.parents).map(function(id) {
                            return rootNodesById[id];
                        });
                    }

                    function getLinkedRoots(node) {
                        var roots = insideSingleNodesByParentId[node.params.id].map(function(node) {
                            return getNodeRoots(node);
                        });

                        return Array.prototype.concat.apply([], roots).filter(function(v, i, a) {
                            return a.indexOf(v) === i;
                        });
                    }

                    rootNodes.forEach(function(block) {
                        rootNodesById[block.params.id] = block;
                    });

                    insideSingleNodes.forEach(function(block) {
                        JSON.parse(block.params.parents).forEach(function(id) {
                            insideSingleNodesByParentId[id] = (insideSingleNodesByParentId[id] || []).concat(block);
                        });
                    });

                    // inside nodes
                    insideSingleNodes.forEach(function(node) {
                        _this._events(node).on({ modName : 'checked', modVal : '*' }, function() {
                            // при клике пользователем на не корневом узле
                            if(guard[node._uniqId]) return;

                            // обновить всех предков
                            getNodeRoots(node).forEach(function(rootNode) {
                                guard[rootNode._uniqId] = true;
                                updateParent(rootNode.params.id);
                                delete guard[rootNode._uniqId];
                            });
                        });
                    });

                    // root nodes
                    rootNodes.forEach(function(rootNode) {
                        _this._events(rootNode).on({ modName : 'checked', modVal : '*' }, function(e, data) {
                            // при клике пользователем на корневом узле
                            if(guard[rootNode._uniqId]) return;

                            var insideNodes = insideSingleNodesByParentId[rootNode.params.id],
                                onlyDisabledCheckedInside = insideNodes.every(function(node) {
                                    return node.hasMod('checked') ? node.hasMod('disabled') : true;
                                });

                            // обновить вложенные не корневые узлы
                            insideNodes.forEach(function(node) {
                                if(node.hasMod('disabled')) return;

                                guard[node._uniqId] = true;
                                // если внутри группы checked только disabled узлы, то делаем check всего,
                                // если же есть checked и не disabled, то делаем uncheck
                                node.setMod('checked', onlyDisabledCheckedInside ? true : '');
                                delete guard[node._uniqId];
                            });

                            // обновить корневые узлы в соответствии с измененными вложенными узлами
                            getLinkedRoots(rootNode).forEach(function(node) {
                                guard[node._uniqId] = true;
                                updateParent(node.params.id);
                                delete guard[node._uniqId];
                            });
                        });
                    });
                }
            }
        },

        getVal : function() {
            var data = {};

            this.findChildBlocks(Checkbox).forEach(function(block) {
                var name = block.getName();

                if(!name || !block.hasMod('checked')) return;

                data[name] = (data[name] || []).concat(block.getVal());
            });

            return data;
        },

        getValTree : function() {
            var data = this.getVal(),
                names = Object.keys(data).map(function(name) {
                    return name.split('.');
                }),
                tree = { content : [] };

            // TODO: преобразование структуры нужно вынести в отдельную функцию
            names.forEach(function(namesChain) {
                var parent = tree;

                namesChain.forEach(function(name, index, array) {
                    var innerParent;

                    if(index + 1 === array.length) {
                        // вставка значений в дерево

                        parent.content = (parent.content || []).concat({
                            name : name,
                            vals : data[array.join('.')]
                        });
                    } else {
                        // поиск родительской ноды по вглубь цепочке имен

                        if(!parent.content) parent.content = [];

                        innerParent = parent.content.filter(function(value) {
                            return value.name === name;
                        })[0];

                        if(!innerParent) {
                            innerParent = { name : name, content : [] };
                            parent.content.push(innerParent);
                        }

                        parent = innerParent;
                    }
                });
            });

            return tree.content;
        },

        // TODO: getNodeVal & getNodeValTree методы?

        // TODO: передавать всю структуру разом, или указывать конкретную ноду и значения?
        setVal : function() {}
    }, {
        lazyInit : true,
        onInit : function() {
            this._events(Checkbox).on({ modName : 'checked', modVal : '*' }, function() {
                this._emit('change');
            });
        }
    }));
});
