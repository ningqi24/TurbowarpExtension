// Name: ningqiVariableTool
// ID: ningqiVariableTool
// Description: Allows you to create new variables within the extension, list
// By: ningqi <https://github.com/ningqi24>
// License: CC-BY-4.0

(function(Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error('此扩展必须在非沙盒模式下运行');
    }

    const A = Scratch.ArgumentType;
    const B = Scratch.BlockType;
    const Cast = Scratch.Cast;

    const EXTENSION_ICON = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzOS41NTk3NyIgaGVpZ2h0PSIzOC45NjM0MyIgdmlld0JveD0iMCwwLDM5LjU1OTc3LDM4Ljk2MzQzIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjIwLjIyMDEyLC0xNjAuNTE4MjgpIj48ZyBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0yMjAuMjIwMTIsMTc3LjEwNzAxYzAsLTkuMTYxNzggNy40MjY5NSwtMTYuNTg4NzMgMTYuNTg4NzMsLTE2LjU4ODczYzkuMTYxNzgsMCAxNi41ODg3Myw3LjQyNjk1IDE2LjU4ODczLDE2LjU4ODczYzAsOS4xNjE3OCAtNy40MjY5NSwxNi41ODg3MyAtMTYuNTg4NzMsMTYuNTg4NzNjLTkuMTYxNzgsMCAtMTYuNTg4NzMsLTcuNDI2OTUgLTE2LjU4ODczLC0xNi41ODg3M3oiIGZpbGwtb3BhY2l0eT0iMC41ODAzOSIgZmlsbD0iIzAwOTlmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNMjM1LjA2ODIxLDE4Mi41NjYyNmMwLC02LjgzMTE4IDUuNTMxNzcsLTEyLjM2OTAyIDEyLjM1NTgzLC0xMi4zNjkwMmM2LjgyNDA2LDAgMTIuMzU1ODMsNS41Mzc4NCAxMi4zNTU4MywxMi4zNjkwMmMwLDYuODMxMTggLTUuNTMxNzcsMTIuMzY5MDIgLTEyLjM1NTgzLDEyLjM2OTAyYy02LjgyNDA2LDAgLTEyLjM1NTgzLC01LjUzNzg0IC0xMi4zNTU4MywtMTIuMzY5MDJ6IiBmaWxsLW9wYWNpdHk9IjAuNTgwMzkiIGZpbGw9IiMwMDk5ZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSJub25lIi8+PHBhdGggZD0iTTIzMC44OTM4NywxODMuMjk1NDhjNC40NjA3NiwwLjQwMTY2IDcuNzUwODEsNC4zNDM0IDcuMzQ5MTUsOC44MDM4OWMtMC40MDE2Niw0LjQ2MDUgLTQuMzQzNCw3Ljc1MDgxIC04LjgwNDE2LDcuMzQ5MTVjLTQuNDYwNDIsLTAuNDAxOTMgLTcuNzUwNzEsLTQuMzQzNjYgLTcuMzQ4OTQsLTguODA0MTZjMC40MDE4LC00LjQ2MDUgNC4zNDM0NSwtNy43NTA4MSA4LjgwMzk1LC03LjM0ODg5eiIgZmlsbC1vcGFjaXR5PSIwLjU4MDM5IiBmaWxsPSIjMDA5OWZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0ibm9uZSIvPjx0ZXh0IHRyYW5zZm9ybT0idHJhbnNsYXRlKDIyNS41MTAwNywxODUuODkwMDkpIHNjYWxlKDAuNDEwNzEsMC40MTA3MSkiIGZvbnQtc2l6ZT0iNDAiIHhtbDpzcGFjZT0icHJlc2VydmUiIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjZmZmZmZmIiBmb250LWZhbWlseT0iSGFuZHdyaXRpbmciIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHRleHQtYW5jaG9yPSJzdGFydCI+PHRzcGFuIHg9IjAiIGR5PSIwIj5OdlQ8L3RzcGFuPjwvdGV4dD48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjoxOS43Nzk4ODM4NzE0OTEyODoxOS40ODE3MTUwMTI3Mjg5LS0+';
    const VL_ICON = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzMC4yOTM5NiIgaGVpZ2h0PSIyMi4xNzgzNCIgdmlld0JveD0iMCwwLDMwLjI5Mzk2LDIyLjE3ODM0Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjI1LjMwNDcxLC0xNzAuNDg4NDcpIj48ZyBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZm9udC1mYW1pbHk9IkhhbmR3cml0aW5nIiBmb250LXNpemU9IjQwIj48dGV4dCB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMjUuNTEwMDcsMTg1Ljg5MDA5KSBzY2FsZSgwLjQxMDcxLDAuNDEwNzEpIiBmb250LXNpemU9IjQwIiB4bWw6c3BhY2U9InByZXNlcnZlIiBmaWxsPSIjZmZmZmZmIj48dHNwYW4geD0iMCIgZHk9IjAiPk52VDwvdHNwYW4+PC90ZXh0PjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjE0LjY5NTI4ODg3MTQ5MTI3Mjo5LjUxMTUzMDAxMjcyODkxMi0tPg==';

    class ningqiVariableTool {
        constructor() {
            this.variables = Object.create(null);
            this.lists = Object.create(null);
            
            // 元数据分离：变量和列表各自独立
            this.creatorsVar = Object.create(null);
            this.creatorsList = Object.create(null);
            this.privacyVar = Object.create(null);
            this.privacyList = Object.create(null);
            this.roleAccessVar = Object.create(null);
            this.roleAccessList = Object.create(null);

            this._initVM();
        }

        _initVM() {
            // 尝试获取VM并添加事件监听
            const vm = this._getVM();
            if (vm && vm.runtime) {
                vm.runtime.on('PROJECT_START', () => this.reset());
                vm.runtime.on('PROJECT_STOP_ALL', () => this.reset());
            }
        }

        _getVM() {
            // 多种方式获取VM，兼容TurboWarp
            return Scratch.vm || (window.Scratch && window.Scratch.vm) || (window.TurboWarp && window.TurboWarp.vm);
        }

        reset() {
            this.variables = Object.create(null);
            this.lists = Object.create(null);
            this.creatorsVar = Object.create(null);
            this.creatorsList = Object.create(null);
            this.privacyVar = Object.create(null);
            this.privacyList = Object.create(null);
            this.roleAccessVar = Object.create(null);
            this.roleAccessList = Object.create(null);
        }

        getInfo() {
            return {
                id: 'ningqiVariableTool',
                name: 'ningqiVariableTool',
                color1: '#0099ff94',
                color2: '#42A5F5',
                color3: '#0009ff94',
                iconURL: VL_ICON,
                menuIconURI: EXTENSION_ICON,
                menus: {
                    privacyOptions: [
                        { text: '全局', value: 'global' },
                        { text: '私有', value: 'private' }
                    ]
                },
                blocks: [
                    {opcode: 'NVT',blockType: B.LABEL,text: 'github.com/ningqi24',category: 'Variables'},
                    { opcode: 'listVariables', blockType: B.REPORTER, text: '列出原版变量', arguments: {}, category: 'Variables' },
                    { opcode: 'listLists', blockType: B.REPORTER, text: '列出原版列表', arguments: {}, category: 'Lists' },
                    { opcode: 'listInternalVariables', blockType: B.REPORTER, text: '列出扩展内部变量', arguments: {}, category: 'Variables' },
                    { opcode: 'listInternalLists', blockType: B.REPORTER, text: '列出扩展内部列表', arguments: {}, category: 'Lists' },
                    '---',
                    { opcode: 'createVariable', blockType: B.COMMAND, text: '创建变量 [NAME]', arguments: { NAME: { type: A.STRING, defaultValue: '' } }, category: 'Variables' },
                    { opcode: 'createList', blockType: B.COMMAND, text: '创建列表 [NAME]', arguments: { NAME: { type: A.STRING, defaultValue: '' } }, category: 'Lists' },
                    '---',
                    { opcode: 'setVariable', blockType: B.COMMAND, text: '将 [VARIABLE] 设为 [VALUE]', arguments: { VARIABLE: { type: A.STRING, defaultValue: '' }, VALUE: { type: A.NUMBER, defaultValue: 0 } }, category: 'Variables' },
                    { opcode: 'changeVariable', blockType: B.COMMAND, text: '将 [VARIABLE] 增加 [VALUE]', arguments: { VARIABLE: { type: A.STRING, defaultValue: '' }, VALUE: { type: A.NUMBER, defaultValue: 1 } }, category: 'Variables' },
                    { opcode: 'getVariable', blockType: B.REPORTER, text: '[VARIABLE] 的值', arguments: { VARIABLE: { type: A.STRING, defaultValue: '' } }, category: 'Variables' },
                    { opcode: 'deleteVariable', blockType: B.COMMAND, text: '删除变量 [NAME]', arguments: { NAME: { type: A.STRING, defaultValue: '' } }, category: 'Variables' },
                    { opcode: 'isVariableExists', blockType: B.BOOLEAN, text: '变量 [NAME] 存在', arguments: { NAME: { type: A.STRING, defaultValue: '' } }, category: 'Variables' },
                    '---',
                    { opcode: 'appendToList', blockType: B.COMMAND, text: '将 [ITEM] 加入 [LIST]', arguments: { ITEM: { type: A.STRING, defaultValue: '' }, LIST: { type: A.STRING, defaultValue: '' } }, category: 'Lists' },
                    { opcode: 'deleteListItem', blockType: B.COMMAND, text: '删除 [LIST] 的第 [INDEX] 项', arguments: { LIST: { type: A.STRING, defaultValue: '' }, INDEX: { type: A.NUMBER, defaultValue: 1 } }, category: 'Lists' },
                    { opcode: 'deleteAllListItems', blockType: B.COMMAND, text: '删除 [LIST] 的全部项目', arguments: { LIST: { type: A.STRING, defaultValue: '' } }, category: 'Lists' },
                    { opcode: 'insertListItem', blockType: B.COMMAND, text: '在 [LIST] 的第 [INDEX] 项前插入 [ITEM]', arguments: { LIST: { type: A.STRING, defaultValue: '' }, INDEX: { type: A.NUMBER, defaultValue: 1 }, ITEM: { type: A.STRING, defaultValue: '' } }, category: 'Lists' },
                    { opcode: 'replaceListItem', blockType: B.COMMAND, text: '将 [LIST] 的第 [INDEX] 项替换为 [ITEM]', arguments: { LIST: { type: A.STRING, defaultValue: '' }, INDEX: { type: A.NUMBER, defaultValue: 1 }, ITEM: { type: A.STRING, defaultValue: '' } }, category: 'Lists' },
                    { opcode: 'getListItem', blockType: B.REPORTER, text: '[LIST] 的第 [INDEX] 项', arguments: { LIST: { type: A.STRING, defaultValue: '' }, INDEX: { type: A.NUMBER, defaultValue: 1 } }, category: 'Lists' },
                    { opcode: 'indexOfListItem', blockType: B.REPORTER, text: '[LIST] 中第一个 [ITEM] 的编号', arguments: { LIST: { type: A.STRING, defaultValue: '' }, ITEM: { type: A.STRING, defaultValue: '' } }, category: 'Lists' },
                    { opcode: 'listLength', blockType: B.REPORTER, text: '[LIST] 的项目数', arguments: { LIST: { type: A.STRING, defaultValue: '' } }, category: 'Lists' },
                    { opcode: 'listContains', blockType: B.BOOLEAN, text: '[LIST] 包含 [ITEM]', arguments: { LIST: { type: A.STRING, defaultValue: '' }, ITEM: { type: A.STRING, defaultValue: '' } }, category: 'Lists' },
                    { opcode: 'copyList', blockType: B.COMMAND, text: '复制列表 [SOURCE_LIST] 的数据到列表 [TARGET_LIST]', arguments: { SOURCE_LIST: { type: A.STRING, defaultValue: '' }, TARGET_LIST: { type: A.STRING, defaultValue: '' } }, category: 'Lists' },
                    { opcode: 'getList', blockType: B.REPORTER, text: '列表 [LIST] 的值', arguments: { LIST: { type: A.STRING, defaultValue: '' } }, category: 'Lists' },
                    { opcode: 'deleteList', blockType: B.COMMAND, text: '删除列表 [NAME]', arguments: { NAME: { type: A.STRING, defaultValue: '' } }, category: 'Lists' },
                    { opcode: 'isListExists', blockType: B.BOOLEAN, text: '列表 [NAME] 存在', arguments: { NAME: { type: A.STRING, defaultValue: '' } }, category: 'Lists' },
                    '---',
                    { opcode: 'setVariablePrivacy', blockType: B.COMMAND, text: '设置变量 [NAME] 为 [PRIVACY]', arguments: { NAME: { type: A.STRING, defaultValue: '' }, PRIVACY: { type: A.STRING, menu: 'privacyOptions', defaultValue: '全局' } }, category: 'Variables' },
                    { opcode: 'setListPrivacy', blockType: B.COMMAND, text: '设置列表 [NAME] 为 [PRIVACY]', arguments: { NAME: { type: A.STRING, defaultValue: '' }, PRIVACY: { type: A.STRING, menu: 'privacyOptions', defaultValue: '全局' } }, category: 'Lists' },
                    { opcode: 'addRoleAccess', blockType: B.COMMAND, text: '允许角色 [ROLE] 访问 [NAME]', arguments: { ROLE: { type: A.STRING, defaultValue: '' }, NAME: { type: A.STRING, defaultValue: '' } }, category: 'Variables' },
                    { opcode: 'removeRoleAccess', blockType: B.COMMAND, text: '禁止角色 [ROLE] 访问 [NAME]', arguments: { ROLE: { type: A.STRING, defaultValue: '' }, NAME: { type: A.STRING, defaultValue: '' } }, category: 'Variables' },
                    { opcode: 'hasRoleAccess', blockType: B.BOOLEAN, text: '角色 [ROLE] 可访问 [NAME]', arguments: { ROLE: { type: A.STRING, defaultValue: '' }, NAME: { type: A.STRING, defaultValue: '' } }, category: 'Variables' }
                ]
            };
        }

        // 辅助：获取当前角色（使用固定标识 __stage__ 避免冲突）
        _getCurrentRole(util) {
            if (!util || !util.target) return '__stage__';
            return util.target.isStage ? '__stage__' : util.target.sprite.name;
        }

        // 检查变量访问权限
        _canAccessVar(name, role) {
            if (this.privacyVar[name] !== 'private') return true;
            if (this.creatorsVar[name] === role) return true;
            const accessList = this.roleAccessVar[name];
            return accessList && accessList.includes(role);
        }

        // 检查列表访问权限
        _canAccessList(name, role) {
            if (this.privacyList[name] !== 'private') return true;
            if (this.creatorsList[name] === role) return true;
            const accessList = this.roleAccessList[name];
            return accessList && accessList.includes(role);
        }

        // 检查修改元数据的权限（必须为创建者或舞台）
        _canModifyMeta(name, role, isVar) {
            const creator = isVar ? this.creatorsVar[name] : this.creatorsList[name];
            // 如果还没有创建者（例如通过复制列表创建），允许第一个修改者设置（但这里我们让创建者由创建操作确定，所以正常情况下应有创建者）
            // 为防止无创建者时被任意修改，我们要求必须有创建者且为当前角色或舞台，否则拒绝
            if (creator === undefined) return false;
            return creator === role || role === '__stage__';
        }

        // 原版变量/列表查询（保持不变）
        listVariables() {
            try {
                const vm = this._getVM();
                if (!vm) return '';
                const target = vm.runtime.getEditingTarget();
                if (!target) return '';
                const vars = [];
                for (const v of Object.values(target.variables)) {
                    if (v.type === '') vars.push(v.name);
                }
                const stage = vm.runtime.getTargetForStage();
                if (stage) {
                    for (const v of Object.values(stage.variables)) {
                        if (v.type === '') vars.push(v.name);
                    }
                }
                return [...new Set(vars)].join(', ');
            } catch {
                return '';
            }
        }

        listLists() {
            try {
                const vm = this._getVM();
                if (!vm) return '';
                const target = vm.runtime.getEditingTarget();
                if (!target) return '';
                const lists = [];
                for (const v of Object.values(target.variables)) {
                    if (v.type === 'list') lists.push(v.name);
                }
                const stage = vm.runtime.getTargetForStage();
                if (stage) {
                    for (const v of Object.values(stage.variables)) {
                        if (v.type === 'list') lists.push(v.name);
                    }
                }
                return [...new Set(lists)].join(', ');
            } catch {
                return '';
            }
        }

        listInternalVariables() {
            const items = [];
            for (const name of Object.keys(this.variables)) {
                const display = this.privacyVar[name] === 'private' ? `${name} (private)` : name;
                items.push(display);
            }
            return items.join(', ');
        }

        listInternalLists() {
            const items = [];
            for (const name of Object.keys(this.lists)) {
                const display = this.privacyList[name] === 'private' ? `${name} (private)` : name;
                items.push(display);
            }
            return items.join(', ');
        }

        createVariable(args, util) {
            const name = Cast.toString(args.NAME);
            if (!name) return;
            const role = this._getCurrentRole(util);
            // 如果同名列表已存在，不影响
            this.variables[name] = 0;
            this.creatorsVar[name] = role;
            this.privacyVar[name] = 'global';
            // 不清理同名列表的元数据
        }

        createList(args, util) {
            const name = Cast.toString(args.NAME);
            if (!name) return;
            const role = this._getCurrentRole(util);
            this.lists[name] = [];
            this.creatorsList[name] = role;
            this.privacyList[name] = 'global';
        }

        setVariable(args, util) {
            const name = Cast.toString(args.VARIABLE);
            const value = Cast.toNumber(args.VALUE);
            const role = this._getCurrentRole(util);
            if (!this._canAccessVar(name, role)) return;
            this.variables[name] = value;
        }

        changeVariable(args, util) {
            const name = Cast.toString(args.VARIABLE);
            const delta = Cast.toNumber(args.VALUE);
            const role = this._getCurrentRole(util);
            if (!this._canAccessVar(name, role)) return;
            const current = this.variables[name] !== undefined ? Cast.toNumber(this.variables[name]) : 0;
            this.variables[name] = current + delta;
        }

        getVariable(args, util) {
            const name = Cast.toString(args.VARIABLE);
            const role = this._getCurrentRole(util);
            if (!this._canAccessVar(name, role)) return 0;
            const val = this.variables[name];
            return val !== undefined ? val : 0;
        }

        deleteVariable(args, util) {
            const name = Cast.toString(args.NAME);
            const role = this._getCurrentRole(util);
            if (!this._canAccessVar(name, role)) return;
            delete this.variables[name];
            delete this.creatorsVar[name];
            delete this.privacyVar[name];
            delete this.roleAccessVar[name];
            // 不影响同名列表的元数据
        }

        isVariableExists(args, util) {
            const name = Cast.toString(args.NAME);
            const role = this._getCurrentRole(util);
            if (!this._canAccessVar(name, role)) return false;
            return this.variables[name] !== undefined;
        }

        appendToList(args, util) {
            const item = Cast.toString(args.ITEM);
            const name = Cast.toString(args.LIST);
            const role = this._getCurrentRole(util);
            if (!this._canAccessList(name, role)) return;
            if (!this.lists[name]) this.lists[name] = [];
            this.lists[name].push(item);
        }

        deleteListItem(args, util) {
            const name = Cast.toString(args.LIST);
            let idx = Cast.toNumber(args.INDEX);
            const role = this._getCurrentRole(util);
            if (!this._canAccessList(name, role)) return;
            if (!this.lists[name]) return;
            idx = Math.floor(idx) - 1;
            if (idx >= 0 && idx < this.lists[name].length) {
                this.lists[name].splice(idx, 1);
            }
        }

        deleteAllListItems(args, util) {
            const name = Cast.toString(args.LIST);
            const role = this._getCurrentRole(util);
            if (!this._canAccessList(name, role)) return;
            if (this.lists[name]) {
                this.lists[name] = [];
            }
        }

        insertListItem(args, util) {
            const item = Cast.toString(args.ITEM);
            const name = Cast.toString(args.LIST);
            let idx = Cast.toNumber(args.INDEX);
            const role = this._getCurrentRole(util);
            if (!this._canAccessList(name, role)) return;
            if (!this.lists[name]) this.lists[name] = [];
            idx = Math.floor(idx) - 1;
            if (idx >= 0 && idx <= this.lists[name].length) {
                this.lists[name].splice(idx, 0, item);
            }
        }

        replaceListItem(args, util) {
            const item = Cast.toString(args.ITEM);
            const name = Cast.toString(args.LIST);
            let idx = Cast.toNumber(args.INDEX);
            const role = this._getCurrentRole(util);
            if (!this._canAccessList(name, role)) return;
            if (!this.lists[name]) return;
            idx = Math.floor(idx) - 1;
            if (idx >= 0 && idx < this.lists[name].length) {
                this.lists[name][idx] = item;
            }
        }

        getListItem(args, util) {
            const name = Cast.toString(args.LIST);
            let idx = Cast.toNumber(args.INDEX);
            const role = this._getCurrentRole(util);
            if (!this._canAccessList(name, role)) return '';
            if (!this.lists[name]) return '';
            idx = Math.floor(idx) - 1;
            if (idx >= 0 && idx < this.lists[name].length) {
                return Cast.toString(this.lists[name][idx]);
            }
            return '';
        }

        indexOfListItem(args, util) {
            const item = Cast.toString(args.ITEM);
            const name = Cast.toString(args.LIST);
            const role = this._getCurrentRole(util);
            if (!this._canAccessList(name, role)) return 0;
            if (!this.lists[name]) return 0;
            const idx = this.lists[name].indexOf(item);
            return idx === -1 ? 0 : idx + 1;
        }

        listLength(args, util) {
            const name = Cast.toString(args.LIST);
            const role = this._getCurrentRole(util);
            if (!this._canAccessList(name, role)) return 0;
            if (!this.lists[name]) return 0;
            return this.lists[name].length;
        }

        listContains(args, util) {
            const item = Cast.toString(args.ITEM);
            const name = Cast.toString(args.LIST);
            const role = this._getCurrentRole(util);
            if (!this._canAccessList(name, role)) return false;
            if (!this.lists[name]) return false;
            return this.lists[name].includes(item);
        }

        copyList(args, util) {
            const src = Cast.toString(args.SOURCE_LIST);
            const dst = Cast.toString(args.TARGET_LIST);
            const role = this._getCurrentRole(util);
            if (!this._canAccessList(src, role) || !this._canAccessList(dst, role)) return;
            if (!this.lists[src]) return;
            this.lists[dst] = [...this.lists[src]];
            // 设置目标列表的创建者为当前角色（如果目标之前不存在）
            if (this.creatorsList[dst] === undefined) {
                this.creatorsList[dst] = role;
                this.privacyList[dst] = 'global'; // 默认全局
            }
            // 如果目标已存在，不修改其元数据（仅覆盖内容）
        }

        getList(args, util) {
            const name = Cast.toString(args.LIST);
            const role = this._getCurrentRole(util);
            if (!this._canAccessList(name, role)) return '';
            if (!this.lists[name]) return '';
            return this.lists[name].join(', ');
        }

        deleteList(args, util) {
            const name = Cast.toString(args.NAME);
            const role = this._getCurrentRole(util);
            if (!this._canAccessList(name, role)) return;
            delete this.lists[name];
            delete this.creatorsList[name];
            delete this.privacyList[name];
            delete this.roleAccessList[name];
        }

        isListExists(args, util) {
            const name = Cast.toString(args.NAME);
            const role = this._getCurrentRole(util);
            if (!this._canAccessList(name, role)) return false;
            return this.lists[name] !== undefined;
        }

        setVariablePrivacy(args, util) {
            const name = Cast.toString(args.NAME);
            const privacy = Cast.toString(args.PRIVACY);
            const role = this._getCurrentRole(util);
            if (!this._canModifyMeta(name, role, true)) return;
            this.privacyVar[name] = privacy;
        }

        setListPrivacy(args, util) {
            const name = Cast.toString(args.NAME);
            const privacy = Cast.toString(args.PRIVACY);
            const role = this._getCurrentRole(util);
            if (!this._canModifyMeta(name, role, false)) return;
            this.privacyList[name] = privacy;
        }

        addRoleAccess(args, util) {
            const targetRole = Cast.toString(args.ROLE);
            const name = Cast.toString(args.NAME);
            const currentRole = this._getCurrentRole(util);
            // 这里要区分是变量还是列表？根据积木放置的category，但用户可能混用。
            // 更安全的做法：同时检查变量和列表，如果存在则分别处理，但权限验证需对应各自的创建者。
            // 由于积木在Variables类别，可能预期操作变量，但用户也可能用它操作列表。我们分别处理。
            let handled = false;
            if (this.variables[name] !== undefined) {
                if (this._canModifyMeta(name, currentRole, true)) {
                    if (!this.roleAccessVar[name]) this.roleAccessVar[name] = [];
                    if (!this.roleAccessVar[name].includes(targetRole)) {
                        this.roleAccessVar[name].push(targetRole);
                    }
                    handled = true;
                }
            }
            if (this.lists[name] !== undefined) {
                if (this._canModifyMeta(name, currentRole, false)) {
                    if (!this.roleAccessList[name]) this.roleAccessList[name] = [];
                    if (!this.roleAccessList[name].includes(targetRole)) {
                        this.roleAccessList[name].push(targetRole);
                    }
                    handled = true;
                }
            }
            if (!handled) return; // 既不是变量也不是列表，或无权限
        }

        removeRoleAccess(args, util) {
            const targetRole = Cast.toString(args.ROLE);
            const name = Cast.toString(args.NAME);
            const currentRole = this._getCurrentRole(util);
            if (this.variables[name] !== undefined) {
                if (this._canModifyMeta(name, currentRole, true)) {
                    if (this.roleAccessVar[name]) {
                        const idx = this.roleAccessVar[name].indexOf(targetRole);
                        if (idx !== -1) this.roleAccessVar[name].splice(idx, 1);
                    }
                }
            }
            if (this.lists[name] !== undefined) {
                if (this._canModifyMeta(name, currentRole, false)) {
                    if (this.roleAccessList[name]) {
                        const idx = this.roleAccessList[name].indexOf(targetRole);
                        if (idx !== -1) this.roleAccessList[name].splice(idx, 1);
                    }
                }
            }
        }

        hasRoleAccess(args, util) {
            const targetRole = Cast.toString(args.ROLE);
            const name = Cast.toString(args.NAME);
            // 查询时同时检查变量和列表的权限列表，只要一个匹配就返回true
            if (this.roleAccessVar[name] && this.roleAccessVar[name].includes(targetRole)) return true;
            if (this.roleAccessList[name] && this.roleAccessList[name].includes(targetRole)) return true;
            return false;
        }
    }

    Scratch.extensions.register(new ningqiVariableTool());
})(Scratch);