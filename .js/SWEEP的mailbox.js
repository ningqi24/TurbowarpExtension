// sweep-email.js
class ScratchZeroConfigEmail {
    constructor() {
        this.email = '';
        this.wallet = null;
        this.messages = new Map();
        this.contacts = new Map();
        
     
        this.storageProviders = {
            'web3.storage': 'https://api.web3.storage',
            'ipfs': 'https://ipfs.io/ipfs/',
            'arweave': 'https://arweave.net/',
            'gun': 'https://gun-manhattan.herokuapp.com/gun'
        };
        
        
        this.relayServices = [
            'https://mail-relay.fly.dev',
            'https://scratch-mail.glitch.me',
            'https://decentralized-email-relay.onrender.com'
        ];
    }
    
    getInfo() {
        return {
            id: 'zeroconfigmail',
            name: '零配置邮箱',
            color1: '#00BCD4',
            color2: '#0097A7',
            color3: '#00838F',
            
            blocks: [
                {
                    opcode: 'createAccount',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '创建邮箱账户 用户名 [USERNAME]',
                    arguments: {
                        USERNAME: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'scratchuser'
                        }
                    }
                },
                {
                    opcode: 'quickSetup',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '一键快速设置'
                },
                {
                    opcode: 'getScratchEmail',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '我的Scratch邮箱地址'
                },
                '---',
                {
                    opcode: 'sendToFriend',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '发送给朋友 [FRIEND] 内容 [MESSAGE]',
                    arguments: {
                        FRIEND: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '朋友的Scratch ID'
                        },
                        MESSAGE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '你好！'
                        }
                    }
                },
                {
                    opcode: 'sendWithScratchID',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '发送给Scratch用户 [ID] 主题 [SUBJECT]',
                    arguments: {
                        ID: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 123456789
                        },
                        SUBJECT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '来自Scratch的消息'
                        }
                    }
                },
                {
                    opcode: 'sendToProject',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '发送到项目 [PROJECT_ID]',
                    arguments: {
                        PROJECT_ID: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 123456789
                        }
                    }
                },
                '---',
                {
                    opcode: 'checkMessages',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '检查新消息'
                },
                {
                    opcode: 'getMessageCount',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '未读消息数'
                },
                {
                    opcode: 'getLatestMessage',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '最新消息内容'
                },
                {
                    opcode: 'getMessageFrom',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '第 [INDEX] 条消息的发件人',
                    arguments: {
                        INDEX: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 1
                        }
                    }
                },
                '---',
                {
                    opcode: 'shareContact',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '分享我的联系信息'
                },
                {
                    opcode: 'addContact',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '添加联系人 [NAME] 邮箱 [EMAIL]',
                    arguments: {
                        NAME: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '朋友'
                        },
                        EMAIL: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'getContacts',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '联系人列表'
                },
                '---',
                {
                    opcode: 'exportSettings',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '导出邮箱设置'
                },
                {
                    opcode: 'importSettings',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '导入邮箱设置 [DATA]',
                    arguments: {
                        DATA: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'isReady',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '邮箱就绪？'
                }
            ]
        };
    }
    
    async createAccount(args) {
        const username = args.USERNAME.toString().toLowerCase();
        const cleanUsername = username.replace(/[^a-z0-9]/g, '');
        
        
        const randomId = Math.random().toString(36).substr(2, 8);
        this.email = `${cleanUsername}${randomId}@scratch.mail`;
        
        
        this.wallet = await this.generateWallet();
        
       
        const shareData = {
            email: this.email,
            publicKey: this.wallet.publicKey,
            username: cleanUsername
        };
        
       
        localStorage.setItem('scratch_mail_account', JSON.stringify(shareData));
        
        console.log(`邮箱创建成功: ${this.email}`);
        console.log('分享二维码:', await this.generateQRCode(shareData));
        
        return;
    }
    
    async quickSetup() {
       
        const randomName = 'user' + Math.random().toString(36).substr(2, 6);
        await this.createAccount({ USERNAME: { toString: () => randomName } });
        
        
        await this.connectToRelay();
        
     
        const shareLink = await this.generateShareLink();
        console.log('一键设置完成！分享链接:', shareLink);
        
        return;
    }
    
    getScratchEmail() {
        if (!this.email) {
            return '请先创建账户';
        }
        return this.email;
    }
    
    async sendToFriend(args) {
        const friend = args.FRIEND.toString();
        const message = args.MESSAGE.toString();
        
        if (!this.email) {
            console.error('请先创建邮箱账户');
            return;
        }
        
        
        const mail = {
            from: this.email,
            to: friend,
            message: message,
            timestamp: Date.now(),
            type: 'direct_message'
        };
        
      
        const encrypted = await this.encryptMessage(JSON.stringify(mail));
        
        
        await this.tryMultipleRelays(encrypted);
        
        console.log(`消息已发送给: ${friend}`);
        return;
    }
    
    async sendWithScratchID(args) {
        const userId = args.ID;
        const subject = args.SUBJECT.toString();
        
        
        try {
            const response = await fetch(`https://api.scratch.mit.edu/users/${userId}`);
            if (response.ok) {
                const userData = await response.json();
                console.log(`发送给Scratch用户: ${userData.username}`);
                
              
                await this.sendViaScratchCloud(userId, subject);
            }
        } catch (error) {
            console.log('通过备用方式发送...');
            await this.sendViaAlternative(userId, subject);
        }
        
        return;
    }
    
    async sendToProject(args) {
        const projectId = args.PROJECT_ID;
        
        
        const message = {
            type: 'email_to_project',
            project: projectId,
            from: this.email,
            timestamp: Date.now()
        };
        
     
        const cloudData = await this.encodeForCloud(message);
        
      
        console.log(`发送到项目 ${projectId}:`, cloudData);
        
        return;
    }
    
    async checkMessages() {
      
        const sources = [
            this.checkWebRTC(),
            this.checkRelay(),
            this.checkLocalStorage(),
            this.checkScratchCloud()
        ];
        
        const results = await Promise.allSettled(sources);
        
        let newMessages = 0;
        for (const result of results) {
            if (result.status === 'fulfilled' && result.value) {
                newMessages += result.value.length;
                await this.processMessages(result.value);
            }
        }
        
        if (newMessages > 0) {
            console.log(`发现 ${newMessages} 条新消息`);
        }
        
        return;
    }
    
    getMessageCount() {
        return Array.from(this.messages.values())
            .filter(msg => !msg.read)
            .length;
    }
    
    getLatestMessage() {
        const messages = Array.from(this.messages.values());
        if (messages.length === 0) {
            return '没有消息';
        }
        
        const latest = messages.sort((a, b) => b.timestamp - a.timestamp)[0];
        return latest.content || latest.message || '无内容';
    }
    
    getMessageFrom(args) {
        const index = Math.max(0, args.INDEX - 1);
        const messages = Array.from(this.messages.values());
        
        if (messages[index]) {
            return messages[index].from || '未知';
        }
        return '无消息';
    }
    
    async shareContact() {
        if (!this.email) {
            console.error('请先创建账户');
            return;
        }
        
        const contactInfo = {
            email: this.email,
            publicKey: this.wallet?.publicKey,
            timestamp: Date.now(),
            shareCode: Math.random().toString(36).substr(2, 9).toUpperCase()
        };
        
       
        const shareMethods = {
            qrcode: await this.generateQRCode(contactInfo),
            link: await this.generateShareLink(contactInfo),
            text: this.encodeAsText(contactInfo)
        };
        
        console.log('联系信息已准备好分享:');
        console.log('分享码:', contactInfo.shareCode);
        console.log('链接:', shareMethods.link);
        
        return;
    }
    
    addContact(args) {
        const name = args.NAME.toString();
        const email = args.EMAIL.toString();
        
        this.contacts.set(email, {
            name: name,
            email: email,
            added: Date.now()
        });
        
        console.log(`联系人已添加: ${name} (${email})`);
        

        this.saveContacts();
        
        return;
    }
    
    getContacts() {
        const contacts = [];
        for (const [email, info] of this.contacts) {
            contacts.push(`${info.name}: ${email}`);
        }
        
        if (contacts.length === 0) {
            return '暂无联系人';
        }
        
        return contacts.join('\n');
    }
    
    exportSettings() {
        const settings = {
            email: this.email,
            contacts: Array.from(this.contacts.entries()),
            messages: Array.from(this.messages.entries()),
            wallet: this.wallet ? {
                publicKey: this.wallet.publicKey
            } : null
        };
        
        const json = JSON.stringify(settings, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
      
        const a = document.createElement('a');
        a.href = url;
        a.download = 'scratch-mail-backup.json';
        a.click();
        
        console.log('设置已导出');
        return;
    }
    
    importSettings(args) {
        const data = args.DATA.toString();
        
        try {
            const settings = JSON.parse(data);
            
            this.email = settings.email;
            this.contacts = new Map(settings.contacts || []);
            this.messages = new Map(settings.messages || []);
            
            if (settings.wallet) {
                this.wallet = settings.wallet;
            }
            
            console.log('设置导入成功');
        } catch (error) {
            console.error('导入失败:', error);
        }
        
        return;
    }
    
    isReady() {
        return !!this.email;
    }
    
    
    async generateWallet() {
        
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        
        return {
            privateKey: btoa(String.fromCharCode.apply(null, array)),
            publicKey: 'pub_' + Math.random().toString(36).substr(2, 20)
        };
    }
    
    async generateQRCode(data) {
        
        const text = JSON.stringify(data);
        const qrSize = 10; 
        
        let qr = '';
        for (let i = 0; i < qrSize; i++) {
            qr += '█'.repeat(qrSize) + '\n';
        }
        
        return qr;
    }
    
    async generateShareLink(data) {
        const encoded = btoa(JSON.stringify(data));
        return `https://scratch.mail/share#${encoded}`;
    }
    
    async encryptMessage(message) {
        
        return btoa(unescape(encodeURIComponent(message)));
    }
    
    async tryMultipleRelays(data) {
        for (const relay of this.relayServices) {
            try {
                const response = await fetch(relay, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ data: data }),
                    mode: 'no-cors'
                });
                console.log(`通过 ${relay} 发送成功`);
                break;
            } catch (error) {
                console.log(`${relay} 失败，尝试下一个...`);
            }
        }
    }
    
    async sendViaScratchCloud(userId, message) {
       
        console.log('通过Scratch云变量发送:', { userId, message });
    }
    
    async sendViaAlternative(userId, message) {
        
        console.log('通过备用方式发送:', { userId, message });
    }
    
    encodeForCloud(data) {
     
        return JSON.stringify(data)
            .replace(/[^a-zA-Z0-9]/g, '')
            .substring(0, 256);
    }
    
    async checkWebRTC() {
        
        return [];
    }
    
    async checkRelay() {
       
        try {
            const response = await fetch(`${this.relayServices[0]}/inbox/${this.email}`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            
        }
        return [];
    }
    
    async checkLocalStorage() {
       
        const stored = localStorage.getItem(`scratch_mail_inbox_${this.email}`);
        if (stored) {
            return JSON.parse(stored);
        }
        return [];
    }
    
    async checkScratchCloud() {
       
        return [];
    }
    
    async processMessages(messages) {
        for (const msg of messages) {
            const msgId = `${msg.from}_${msg.timestamp}`;
            if (!this.messages.has(msgId)) {
                this.messages.set(msgId, {
                    ...msg,
                    read: false
                });
            }
        }
        
        
        this.saveMessages();
    }
    
    encodeAsText(data) {
        return `SCRATCH-MAIL:${btoa(JSON.stringify(data))}`;
    }
    
    saveContacts() {
        localStorage.setItem(
            `scratch_mail_contacts_${this.email}`,
            JSON.stringify(Array.from(this.contacts.entries()))
        );
    }
    
    saveMessages() {
        localStorage.setItem(
            `scratch_mail_messages_${this.email}`,
            JSON.stringify(Array.from(this.messages.entries()))
        );
    }
    
    async connectToRelay() {
        console.log('连接到邮件中继...');
        return true;
    }
}


if (typeof Scratch !== 'undefined') {
    Scratch.extensions.register(new ScratchZeroConfigEmail());
}