//云变量+
//10000why制作
//由Yes shape部分修改优化
//如有侵权，请告知我！
(function (Scratch) {
  'use strict';
  if (!(Scratch && Scratch.extensions && Scratch.extensions.register)) {
    throw new Error('此环境不支持 Scratch 扩展注册。请在 TurboWarp / PenguinMod / Scratch 3 扩展环境中加载。');
  }

  const A = Scratch.ArgumentType;
  const B = Scratch.BlockType;
  const Cast = Scratch.Cast || { toString: x => String(x), toNumber: x => Number(x), toBoolean: x => !!x };

  const clampLen = (s, n) => (String(s).length > n ? String(s).slice(0, n) : String(s));
  const isNumStr = (v) => {
    const s = String(v).trim();
    if (!s) return false;
    return /^-?\d+(\.\d+)?$/.test(s) && isFinite(Number(s));
  };
  const nowMs = () => Date.now();

  /* =========================
     协议常量
     ========================= */
  const PROTOCOL_ID = 'CV2';
  const NS_PREFIX = `☁ ${PROTOCOL_ID}.`;
  const MANIFEST_PREFIX = `${NS_PREFIX}_manifest.`;
  const VERSION = '2.0.2'; // ← 版本号更新

  /* =========================
     文本<->数字 编码
     ========================= */
  function encodeTextV2(text, salt) {
    const s = String(text);
    const k = (Number(salt) || 0) % 997;
    let out = '';
    for (let i = 0; i < s.length; i++) {
      const cp = s.codePointAt(i);
      if (cp > 0xffff) i++;
      const v = (cp + k + i) % 1000;
      out += String(v).padStart(3, '0');
    }
    return out || '000';
  }
  function decodeTextV2(numStr, salt) {
    const n = String(numStr).replace(/\D/g, '');
    const k = (Number(salt) || 0) % 997;
    let out = '';
    for (let i = 0, j = 0; i < n.length; i += 3, j++) {
      const chunk = n.slice(i, i + 3);
      if (chunk.length < 3) break;
      const v = Number(chunk);
      if (!Number.isFinite(v)) continue;
      let cp = v - k - j;
      while (cp < 0) cp += 1000;
      const ascii = 32 + (cp % 95);
      out += String.fromCodePoint(ascii);
    }
    return out;
  }

  /* =========================
     运行时
     ========================= */
  class CloudV2 {
    constructor() {
      this.server = 'wss://clouddata.turbowarp.org';
      this.projectId = null; // 项目ID，初始为null
      this.username = 'Guest';
      this.ws = null;
      this.status = 'disconnected';
      this.connectedProjectId = null; // 当前连接的项目ID

      this.values = new Map();       // cloudName -> string value
      this.updateFlags = new Map();  // localName -> boolean (edge-trigger)
      this.lastSendAt = new Map();   // cloudName -> ts

      this.seed = 0;
      this._initialTimer = 0;
      this._sawAnyMessage = false;
      this._didInitialEdge = false;  // 防止重复初次触发
      
      // 用于存储项目ID的变量名列表
      this.projectVarLists = new Map(); // projectId -> Set of varNames
    }

    // 生成云变量名（包含项目ID）
    toCloudName(name, projectId = this.projectId) {
      if (!projectId) {
        // 如果还没有设置项目ID，返回空
        return null;
      }
      let n = String(name || '').trim();
      if (!n) n = 'var';
      // 清理项目ID，只保留字母数字和下划线
      const cleanPid = String(projectId).replace(/[^a-zA-Z0-9_]/g, '_').slice(0, 20);
      // 清理变量名
      const cleanVar = n.replace(/[^a-zA-Z0-9_]/g, '_').slice(0, 30);
      // 格式: ☁ CV2.{projectId}.{varname}
      let raw = `${NS_PREFIX}${cleanPid}.${cleanVar}`;
      raw = clampLen(raw, 128);
      return raw;
    }
    
    // 解析云变量名，提取项目ID和变量名
    parseCloudName(cloudName) {
      const s = String(cloudName || '');
      if (!s.startsWith(NS_PREFIX)) return null;
      
      // 移除前缀
      const withoutPrefix = s.slice(NS_PREFIX.length);
      // 分割项目ID和变量名
      const parts = withoutPrefix.split('.');
      if (parts.length < 2) return null;
      
      const projectId = parts[0];
      const varName = parts.slice(1).join('.'); // 支持变量名中包含点
      
      return { projectId, varName };
    }
    
    // 从云变量名提取变量名（只返回当前项目的变量名）
    fromCloudName(cloudName) {
      const parsed = this.parseCloudName(cloudName);
      if (!parsed) return null;
      
      // 只返回当前项目的变量名
      if (parsed.projectId === this.projectId) {
        return parsed.varName;
      }
      return null;
    }

    // 检查变量是否属于当前项目
    isCurrentProjectVar(cloudName) {
      const parsed = this.parseCloudName(cloudName);
      return parsed && parsed.projectId === this.projectId;
    }

    /* ===== 连接与握手 ===== */
    connect(optionalServer, pid) {
      try {
        // 设置项目ID
        if (pid) {
          const cleanPid = String(pid).replace(/[^a-zA-Z0-9_]/g, '_').slice(0, 20);
          if (cleanPid) {
            this.projectId = cleanPid;
          }
        }
        
        if (!this.projectId) {
          // 如果没有项目ID，使用一个默认的
          this.projectId = 'default_project';
        }
        
        if (optionalServer) {
          const s = String(optionalServer).trim();
          if (/^wss?:\/\//i.test(s)) this.server = s;
        }

        if (this.ws) { 
          try { this.ws.close(); } catch (e) {} 
          this.ws = null; 
        }

        const url = this.server.includes('?')
          ? this.server
          : this.server.replace(/\/?$/, '/') + `?project_id=${encodeURIComponent(this.projectId)}`;

        this.status = 'connecting';
        this.connectedProjectId = this.projectId;
        this.seed = 0;
        this._didInitialEdge = false;
        this.values.clear();
        this.updateFlags.clear();
        this._sawAnyMessage = false;

        this.ws = new WebSocket(url);
        this.ws.onopen = () => {
          this._send({ method: 'handshake', user: this.username, project_id: this.projectId });
          this._scheduleInitialScan(600);
        };
        this.ws.onclose = () => { 
          this._clearInitialScan(); 
          if (this.status !== 'legacy-conflict') {
            this.status = 'disconnected';
          }
        };
        this.ws.onerror = () => { 
          this._clearInitialScan(); 
          if (this.status !== 'legacy-conflict') {
            this.status = 'error';
          }
        };
        this.ws.onmessage = (ev) => {
          const lines = String(ev.data || '').split('\n').filter(Boolean);
          if (lines.length) this._onAnyMessage();
          for (const line of lines) {
            let msg; 
            try { msg = JSON.parse(line); } catch (e) { continue; }
            this._handleMessage(msg);
          }
        };
      } catch (e) {
        console.error('连接错误:', e);
        this.status = 'error';
      }
    }
    
    disconnect() {
      if (this.ws) { 
        try { this.ws.close(); } catch (e) {} 
        this.ws = null; 
      }
      this._clearInitialScan();
      this.status = 'disconnected';
      this.connectedProjectId = null;
    }

    _send(obj) {
      if (!this.ws || this.ws.readyState !== 1) return false;
      try { 
        this.ws.send(JSON.stringify(obj)); 
        return true; 
      } catch (e) { 
        return false; 
      }
    }

    _onAnyMessage() {
      this._scheduleInitialScan(300);
    }
    
    _scheduleInitialScan(ms) {
      if (this._initialTimer) { 
        clearTimeout(this._initialTimer); 
        this._initialTimer = 0; 
      }
      this._initialTimer = setTimeout(() => {
        this._initialTimer = 0;
        this._evaluateNamespaceAndManifest();
      }, ms);
    }
    
    _clearInitialScan() {
      if (this._initialTimer) { 
        clearTimeout(this._initialTimer); 
        this._initialTimer = 0; 
      }
    }

    /* ===== 收到服务端消息 ===== */
    _handleMessage(msg) {
      const method = msg && msg.method;
      if (method === 'set' || method === 'update') {
        const cloudName = String(msg.name || '');
        const value = String(msg.value ?? '');
        if (!cloudName.startsWith('☁')) return;

        this.values.set(cloudName, value);

        // 只处理当前项目的变量
        if (this.isCurrentProjectVar(cloudName)) {
          if (cloudName === this.getManifestName()) {
            const m = String(value).match(/^2(\d{6})/);
            if (m) this.seed = Number(m[1]);
            return; // 清单不触发
          }
          
          const local = this.fromCloudName(cloudName);
          if (local) {
            // ★ 远端变更 → 触发一次边沿
            this._edge(local);
          }
        }
      }
    }

    // 获取当前项目的清单名称
    getManifestName() {
      if (!this.projectId) return MANIFEST_PREFIX + 'default';
      const cleanPid = String(this.projectId).replace(/[^a-zA-Z0-9_]/g, '_').slice(0, 20);
      return `${MANIFEST_PREFIX}${cleanPid}`;
    }

    /* ===== 首次扫描与清单 ===== */
    _evaluateNamespaceAndManifest() {
      if (!this.ws) return;

      const manifestName = this.getManifestName();
      let hasManifest = false;
      let cv2Count = 0;
      let legacyCount = 0;

      // 清空当前项目的变量列表
      if (this.projectId) {
        this.projectVarLists.set(this.projectId, new Set());
      }

      for (const cloudName of this.values.keys()) {
        if (cloudName === manifestName) {
          hasManifest = true;
          continue;
        }
        
        const parsed = this.parseCloudName(cloudName);
        if (parsed) {
          // 这是CV2格式的变量
          cv2Count++;
          
          // 如果是当前项目的变量，添加到变量列表中
          if (parsed.projectId === this.projectId && this.projectId) {
            const varSet = this.projectVarLists.get(this.projectId) || new Set();
            varSet.add(parsed.varName);
            this.projectVarLists.set(this.projectId, varSet);
          }
        } else if (cloudName.startsWith('☁')) {
          legacyCount++;
        }
      }

      // 检测与旧版云变量的冲突
      if (legacyCount > 0 && !hasManifest) {
        this.status = 'legacy-conflict';
        try { this.ws.close(); } catch (e) {}
        this.ws = null;
        return;
      }

      // 如果没有清单且当前项目没有CV2变量，创建清单
      if (!hasManifest && cv2Count === 0 && legacyCount === 0) {
        const seed = Math.floor(100000 + Math.random() * 900000);
        this.seed = seed;
        const manifestVal = `2${String(seed).padStart(6,'0')}`;
        this._send({ method: 'set', name: manifestName, value: manifestVal });
        this.values.set(manifestName, manifestVal);
      }

      // 读取清单中的种子
      if (hasManifest && !this.seed) {
        const v = this.values.get(manifestName) || '';
        const m = String(v).match(/^2(\d{6})/);
        if (m) this.seed = Number(m[1]);
      }

      if (this.status === 'connecting' || this.status === 'disconnected' || this.status === 'error') {
        this.status = 'connected';
      }

      // ★ 首次连接完成后，把当前项目的CV2变量触发一次"初始更新"
      if (!this._didInitialEdge) {
        this._didInitialEdge = true;
        for (const cloudName of this.values.keys()) {
          if (this.isCurrentProjectVar(cloudName) && cloudName !== manifestName) {
            const local = this.fromCloudName(cloudName);
            if (local) this._edge(local);
          }
        }
      }
    }

    _guard() { 
      return this.status !== 'legacy-conflict' && 
             this.ws && 
             this.ws.readyState === 1 &&
             this.projectId === this.connectedProjectId;
    }

    /* ===== 对外 API ===== */
    setProjectId(pid) {
      const cleanPid = String(pid).replace(/[^a-zA-Z0-9_]/g, '_').slice(0, 20);
      if (cleanPid) {
        this.projectId = cleanPid;
        return true;
      }
      return false;
    }
    
    getProjectId() {
      return this.projectId || '(未设置)';
    }

    createVar(name) {
      if (this.status === 'legacy-conflict' || !this.projectId) return;
      const cloudName = this.toCloudName(name);
      if (!cloudName) return;
      
      if (!this.values.has(cloudName)) {
        this.values.set(cloudName, '0');
        // 添加到项目变量列表
        const varSet = this.projectVarLists.get(this.projectId) || new Set();
        varSet.add(name);
        this.projectVarLists.set(this.projectId, varSet);
      }
      
      this._send({ method: 'set', name: cloudName, value: String(this.values.get(cloudName)) });
      
      const local = this.fromCloudName(cloudName);
      if (local) this._edge(local);
    }
    
    deleteVar(name) {
      if (this.status === 'legacy-conflict' || !this.projectId) return;
      const cloudName = this.toCloudName(name);
      if (!cloudName) return;
      
      this.values.delete(cloudName);
      // 从项目变量列表中移除
      const varSet = this.projectVarLists.get(this.projectId);
      if (varSet) {
        varSet.delete(name);
      }
      // 无标准删除；保留本地删除，不发送
    }

    setVar(name, value) {
      if (!this.projectId) return;
      
      const cloudName = this.toCloudName(name);
      if (!cloudName) return;
      
      let v = String(value);
      if (!isNumStr(v)) v = encodeTextV2(v, this.seed);
      if (v.length > 900) v = v.slice(0, 900);

      const now = nowMs();
      const last = this.lastSendAt.get(cloudName) || 0;
      if (now - last < 100) {
        // 仍更新本地，且触发一次；避免在节流窗口里丢掉起始积木
        this.values.set(cloudName, v);
        const local = this.fromCloudName(cloudName);
        if (local) this._edge(local);
        return;
      }

      if (this._guard()) {
        this.lastSendAt.set(cloudName, now);
        this.values.set(cloudName, v);
        this._send({ method: 'set', name: cloudName, value: String(v) });
      } else {
        // 离线本地写入，同样触发一次，等重连后会被覆盖
        this.values.set(cloudName, v);
      }
      
      // 确保变量在项目列表中
      const varSet = this.projectVarLists.get(this.projectId) || new Set();
      varSet.add(name);
      this.projectVarLists.set(this.projectId, varSet);
      
      const local = this.fromCloudName(cloudName);
      if (local) this._edge(local); // ★ 本地 set 也触发
    }

    changeVar(name, delta) {
      if (!this.projectId) return;
      
      const cloudName = this.toCloudName(name);
      if (!cloudName) return;
      
      const cur = Number(this.values.get(cloudName) || '0');
      const d = Cast.toNumber(delta) || 0;
      const next = cur + d;
      this.setVar(name, String(next)); // setVar 内部会触发 edge
    }

    getVar(name) {
      if (!this.projectId) return '0';
      
      const cloudName = this.toCloudName(name);
      if (!cloudName) return '0';
      
      return this.values.get(cloudName) ?? '0';
    }

    listNames() {
      if (!this.projectId) return ['(请先设置项目ID)'];
      
      const varSet = this.projectVarLists.get(this.projectId);
      if (!varSet || varSet.size === 0) {
        return ['(无)'];
      }
      
      const out = Array.from(varSet);
      out.sort((a, b) => a.localeCompare(b));
      return out;
    }
    
    // 获取所有项目的ID列表（仅用于调试）
    listProjectIds() {
      const projects = new Set();
      for (const cloudName of this.values.keys()) {
        const parsed = this.parseCloudName(cloudName);
        if (parsed) {
          projects.add(parsed.projectId);
        }
      }
      return Array.from(projects);
    }

    /* ===== 事件边沿触发 ===== */
    _edge(localName) {
      const n = String(localName || '').trim();
      if (!n || n === '(无)' || n === '(请先设置项目ID)') return;
      this.updateFlags.set(n, true);
    }
    
    pollUpdatedFlag(name) {
      const n = String(name || '').trim();
      if (!n || n === '(无)' || n === '(请先设置项目ID)') return false;
      if (this.updateFlags.get(n)) {
        this.updateFlags.set(n, false);
        return true; // 仅一次 true
      }
      return false;
    }
  }

  const runtime = new CloudV2();

  /* =========================
     UI 图标
     ========================= */
  function makeIconURI(color = '#FF8C1A') {
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
        <rect x="0" y="0" width="40" height="40" rx="8" fill="${color}"/>
        <g fill="#fff">
          <circle cx="18" cy="20" r="6"/>
          <circle cx="24" cy="18" r="5"/>
          <circle cx="28" cy="21" r="4"/>
          <rect x="12" y="20" width="20" height="7" rx="3.5"/>
        </g>
      </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  /* =========================
     扩展定义
     ========================= */
  class CloudVarsV2Extension {
    getInfo() {
      const icon = makeIconURI('#FF8C1A');
      return {
        id: 'morecloudvariable',
        name: '云变量+',
        color1: '#FF8C1A',
        color2: '#DB6E00',
        color3: '#B35400',
        menuIconURI: icon,
        blocks: [
          // 项目ID设置
          { opcode: 'setProjectId', blockType: B.COMMAND, text: '设置项目ID为 [PID]',
            arguments: { PID: { type: A.STRING, defaultValue: 'my_project' } } },
          { opcode: 'getProjectId', blockType: B.REPORTER, text: '当前项目ID' },
          
          // 连接管理
          { opcode: 'connect', blockType: B.COMMAND, text: '连接云服务器 [SERVER]',
            arguments: { SERVER: { type: A.STRING, defaultValue: 'wss://clouddata.turbowarp.org' } } },
          { opcode: 'disconnect', blockType: B.COMMAND, text: '断开云服务器' },
          { opcode: 'status', blockType: B.REPORTER, text: '连接状态' },
          { opcode: 'version', blockType: B.REPORTER, text: '协议版本' },

          // 变量操作
          { opcode: 'createVar', blockType: B.COMMAND, text: '创建云变量 [NAME]',
            arguments: { NAME: { type: A.STRING, defaultValue: '云变量' } } },
          { opcode: 'deleteVar', blockType: B.COMMAND, text: '删除云变量 [NAME]',
            arguments: { NAME: { type: A.STRING, menu: 'varNames' } } },
          { opcode: 'setVar', blockType: B.COMMAND, text: '将 [NAME] 设为 [VAL]',
            arguments: { NAME: { type: A.STRING, menu: 'varNames' }, VAL: { type: A.STRING, defaultValue: '123' } } },
          { opcode: 'changeVar', blockType: B.COMMAND, text: '将 [NAME] 增加 [DELTA]',
            arguments: { NAME: { type: A.STRING, menu: 'varNames' }, DELTA: { type: A.NUMBER, defaultValue: 1 } } },
          { opcode: 'getVar', blockType: B.REPORTER, text: '读取 [NAME]',
            arguments: { NAME: { type: A.STRING, menu: 'varNames' } } },

          // ★ 起始积木（边沿触发）
          { opcode: 'onUpdated', blockType: B.HAT, isEdgeActivated: true, text: '当 [NAME] 更新',
            arguments: { NAME: { type: A.STRING, menu: 'varNames' } } },

          // 文本编码
          { opcode: 'encodeText', blockType: B.REPORTER, text: '文本转云数字 [TEXT]',
            arguments: { TEXT: { type: A.STRING, defaultValue: 'Hello CV2' } } },
          { opcode: 'decodeText', blockType: B.REPORTER, text: '云数字转文本 [NUMSTR]',
            arguments: { NUMSTR: { type: A.STRING, defaultValue: '000' } } }
        ],
        menus: {
          varNames: { acceptReporters: true, items: 'listVarNamesDyn' }
        }
      };
    }

    /* ===== 实现 ===== */
    // 项目ID管理
    setProjectId(args) {
      const pid = Cast.toString(args.PID).trim();
      if (pid) {
        // 如果已经连接，需要先断开再重新连接
        if (runtime.ws && runtime.ws.readyState === 1) {
          runtime.disconnect();
        }
        runtime.setProjectId(pid);
        return true;
      }
      return false;
    }
    
    getProjectId() {
      return runtime.getProjectId();
    }

    // 连接管理
    connect(args) {
      const server = Cast.toString(args.SERVER);
      // 使用当前设置的项目ID
      runtime.connect(server, runtime.projectId);
    }
    
    disconnect() { 
      runtime.disconnect(); 
    }
    
    status() { 
      if (!runtime.projectId) {
        return '未设置项目ID';
      }
      return runtime.status; 
    }
    
    version() { 
      return `${PROTOCOL_ID}/${VERSION}`; 
    }

    // 变量操作
    createVar(args) { 
      if (!runtime.projectId) {
        console.warn('请先设置项目ID');
        return;
      }
      runtime.createVar(Cast.toString(args.NAME)); 
    }
    
    deleteVar(args) { 
      const n = Cast.toString(args.NAME); 
      if (n && n !== '(无)' && n !== '(请先设置项目ID)') {
        runtime.deleteVar(n); 
      }
    }
    
    setVar(args) { 
      runtime.setVar(Cast.toString(args.NAME), Cast.toString(args.VAL)); 
    }
    
    changeVar(args) { 
      runtime.changeVar(Cast.toString(args.NAME), Cast.toNumber(args.DELTA)); 
    }
    
    getVar(args) { 
      return runtime.getVar(Cast.toString(args.NAME)); 
    }

    // ★ 帽子块轮询"边沿"标记（一次 true 后即复位）
    onUpdated(args) { 
      return runtime.pollUpdatedFlag(Cast.toString(args.NAME)); 
    }

    // 文本编码
    encodeText(args) { 
      return encodeTextV2(Cast.toString(args.TEXT), runtime.seed); 
    }
    
    decodeText(args) { 
      return decodeTextV2(Cast.toString(args.NUMSTR), runtime.seed); 
    }
    
    listVarNamesDyn(){ 
      return runtime.listNames(); 
    }
  }

  Scratch.extensions.register(new CloudVarsV2Extension());
})(typeof Scratch === 'undefined' ? {} : Scratch);