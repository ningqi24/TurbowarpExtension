//插件作者为VovaLU和Deepseek，请明确版权©️，您可以优化但必须写上来源
//介绍：一个系统弹窗扩展，这会让你的作品更加多彩😁
//版本：0.0.2
(function(Scratch) {
  'use strict';

  class DialogExtension {
    getInfo() {
      return {
        id: 'systemDialogs',
        name: '弹窗和通知.V2',
        color1: '#FF6B35',
        color2: '#E85A2B',
        color3: '#D1491B',
        blocks: [
          {
            opcode: 'alert',
            blockType: Scratch.BlockType.COMMAND,
            text: '弹出提示框: [MESSAGE]',
            arguments: {
              MESSAGE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '你好！'
              }
            }
          },
          {
            opcode: 'confirm',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '弹出确认框: [QUESTION]',
            arguments: {
              QUESTION: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '你确定要继续吗？'
              }
            }
          },
          {
            opcode: 'prompt',
            blockType: Scratch.BlockType.REPORTER,
            text: '弹出输入框: [PROMPT] 默认值 [DEFAULT]',
            arguments: {
              PROMPT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '请输入内容'
              },
              DEFAULT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '默认文本'
              }
            }
          },
          '---',
          {
            opcode: 'customDialog',
            blockType: Scratch.BlockType.REPORTER,
            text: '自定义弹窗 标题 [TITLE] 内容 [CONTENT] 按钮 [BUTTONS]',
            arguments: {
              TITLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '提示'
              },
              CONTENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '请选择操作'
              },
              BUTTONS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '确定,取消,重试'
              }
            }
          },
          {
            opcode: 'toast',
            blockType: Scratch.BlockType.COMMAND,
            text: '弹出Toast: [MESSAGE] 时长 [DURATION] 秒',
            arguments: {
              MESSAGE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '操作成功！'
              },
              DURATION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 3
              }
            }
          },
          '---',
          {
            opcode: 'systemNotification',
            blockType: Scratch.BlockType.COMMAND,
            text: '系统通知 标题 [TITLE] 内容 [BODY]',
            arguments: {
              TITLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '新消息'
              },
              BODY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '您有一条新通知'
              }
            }
          },
          {
            opcode: 'requestNotificationPermission',
            blockType: Scratch.BlockType.COMMAND,
            text: '请求通知权限'
          },
          {
            opcode: 'hasNotificationPermission',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '有通知权限？'
          },
          {
            opcode: 'beep',
            blockType: Scratch.BlockType.COMMAND,
            text: '播放提示音 频率 [FREQ]Hz 时长 [DURATION]ms',
            arguments: {
              FREQ: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 800
              },
              DURATION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 200
              }
            }
          }
        ]
      };
    }

    alert(args) {
      const message = Scratch.Cast.toString(args.MESSAGE);
      return new Promise((resolve) => {
        setTimeout(() => {
          window.alert(message);
          resolve();
        }, 100);
      });
    }

    confirm(args) {
      const question = Scratch.Cast.toString(args.QUESTION);
      return new Promise((resolve) => {
        setTimeout(() => {
          const result = window.confirm(question);
          resolve(result);
        }, 100);
      });
    }

    prompt(args) {
      const promptText = Scratch.Cast.toString(args.PROMPT);
      const defaultValue = Scratch.Cast.toString(args.DEFAULT);
      return new Promise((resolve) => {
        setTimeout(() => {
          const result = window.prompt(promptText, defaultValue);
          resolve(result || '');
        }, 100);
      });
    }

    customDialog(args) {
      const title = Scratch.Cast.toString(args.TITLE);
      const content = Scratch.Cast.toString(args.CONTENT);
      const buttonsStr = Scratch.Cast.toString(args.BUTTONS);
      const buttons = buttonsStr.split(',').map(btn => btn.trim()).filter(btn => btn);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          const dialog = document.createElement('div');
          dialog.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
          `;
          
          const contentDiv = document.createElement('div');
          contentDiv.style.cssText = `
            background: white;
            padding: 20px;
            border-radius: 10px;
            min-width: 300px;
            max-width: 80%;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          `;
          
          contentDiv.innerHTML = `
            <h3 style="margin: 0 0 10px 0; color: #333; font-size: 18px;">${title}</h3>
            <p style="margin: 0 0 20px 0; color: #666; font-size: 14px;">${content}</p>
            <div style="display: flex; gap: 10px; justify-content: center;">
              ${buttons.map((btn, index) => 
                `<button style="padding: 8px 16px; border: none; border-radius: 5px; background: #4A90E2; color: white; cursor: pointer; font-size: 14px;" data-index="${index}">${btn}</button>`
              ).join('')}
            </div>
          `;
          
          dialog.appendChild(contentDiv);
          document.body.appendChild(dialog);
          
          const buttonElements = contentDiv.querySelectorAll('button');
          buttonElements.forEach(button => {
            button.addEventListener('click', (e) => {
              const index = parseInt(e.target.getAttribute('data-index'));
              document.body.removeChild(dialog);
              resolve(buttons[index]);
            });
          });
        }, 100);
      });
    }

    toast(args) {
      const message = Scratch.Cast.toString(args.MESSAGE);
      const duration = Scratch.Cast.toNumber(args.DURATION) * 1000;
      
      return new Promise((resolve) => {
        setTimeout(() => {
          const toast = document.createElement('div');
          toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #333;
            color: white;
            padding: 12px 20px;
            border-radius: 5px;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s ease;
            font-size: 14px;
            max-width: 300px;
            word-wrap: break-word;
          `;
          toast.textContent = message;
          document.body.appendChild(toast);
          
          setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
          }, 10);
          
          setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100px)';
            setTimeout(() => {
              if (document.body.contains(toast)) {
                document.body.removeChild(toast);
              }
              resolve();
            }, 300);
          }, duration);
        }, 100);
      });
    }

    systemNotification(args) {
      const title = Scratch.Cast.toString(args.TITLE);
      const body = Scratch.Cast.toString(args.BODY);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          if (!('Notification' in window)) {
            console.warn('此浏览器不支持系统通知');
            resolve();
            return;
          }
          
          if (Notification.permission === 'granted') {
            const options = {
              body: body,
              icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iOCIgZmlsbD0iIzRBOEQyQyIvPgo8dGV4dCB4PSIzMiIgeT0iMzYiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPmk8L3RleHQ+Cjwvc3ZnPgo='
            };
            new Notification(title, options);
            resolve();
          } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
              if (permission === 'granted') {
                const options = {
                  body: body,
                  icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iOCIgZmlsbD0iIzRBOEQyQyIvPgo8dGV4dCB4PSIzMiIgeT0iMzYiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPmk8L3RleHQ+Cjwvc3ZnPgo='
                };
                new Notification(title, options);
              }
              resolve();
            });
          } else {
            resolve();
          }
        }, 100);
      });
    }

    requestNotificationPermission() {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (!('Notification' in window)) {
            resolve();
            return;
          }
          
          if (Notification.permission === 'default') {
            Notification.requestPermission().then(() => {
              resolve();
            });
          } else {
            resolve();
          }
        }, 100);
      });
    }

    hasNotificationPermission() {
      if (!('Notification' in window)) {
        return false;
      }
      return Notification.permission === 'granted';
    }

    beep(args) {
      const frequency = Scratch.Cast.toNumber(args.FREQ);
      const duration = Scratch.Cast.toNumber(args.DURATION);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          try {
            if (window.AudioContext || window.webkitAudioContext) {
              const audioContext = new (window.AudioContext || window.webkitAudioContext)();
              const oscillator = audioContext.createOscillator();
              const gainNode = audioContext.createGain();
              
              oscillator.connect(gainNode);
              gainNode.connect(audioContext.destination);
              
              oscillator.frequency.value = frequency;
              oscillator.type = 'sine';
              
              gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
              gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration / 1000);
              
              oscillator.start(audioContext.currentTime);
              oscillator.stop(audioContext.currentTime + duration / 1000);
              
              setTimeout(resolve, duration);
            } else {
              // 回退方案：使用浏览器内置的提示音
              console.log('播放提示音：频率', frequency, 'Hz，时长', duration, 'ms');
              resolve();
            }
          } catch (error) {
            console.warn('无法播放提示音:', error);
            resolve();
          }
        }, 100);
      });
    }
  }

  Scratch.extensions.register(new DialogExtension());
})(Scratch);