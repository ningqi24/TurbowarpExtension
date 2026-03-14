((Scratch) => {
    let setaudioElement = "audio";
    let audioElement = {}
    const icon = {
        default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAABCBJREFUWEfFV2loE0EUXhEFT4TijyZeeJ9VUcQDBI+KWi8UvKvigScqiHgriIiiqAhSENE/ihcqalW8QCpoK+KtVdskbdM2TdKkOZtrk+e8t0d3k90YW6EffLDzzZv3dmfevJnlMsUPzpBl4rLXlXOGq4xfTJzRzwgi/ahhH9qgrTis5WDOcxivmzhDVBHwLyRbNsaYI7r5d5RyWV2Yg4JyzphocvxvFMcWoC/RbWYo43oOY19Rluyw+TSUoU/RfXpYOON4Nsib6qTF9KJvMYw2hC9vXvCqQZPBnr8dbHmrwNy+j6YNo1d3JoQ1b960u4+eBSWiv81Q2WOspi3G0MwJ1lmQaqxmRdZwcB86RTS16UFazcT5YliAyJdSSDSG6Nm1/0TKeAULxLACmJDzt2y3L90CcbeHnCMqskeTjoEQoTfvqW0dOgUaTl6Q+7UoxmraoqyBe1bTGOnae5yCIPg6Bzi3HZT7nFsPkB75+lM1JgNep+BChdMvMo7VOykAInDnMVi6Dpb7qvpOAM/5y2IvgO/yDXCs3aWy0achShUTS6e2AVtzNo1xn5+c+6/dk9cds9xz5iIkojHqSwZf7wb78q0p/lKZvY4T6rdWp5GCIGIVVjB37C/rgduFpCNCr0sgVFRMzxg43uClZ4Rz8z6Vv2RibHwBPFhSDdr2At5RLzjauEfW6xZtIC0Ri4F9yWbSbLNWksbbHGDpNgQCd59QG3gerKNmNPlMIsbGBFSeajKtw6cKThhw+0l64/Mi0jDTJc3coR8kQmHSrSNzaYnC7z5RO/jopWynQT++gFYH2OasJgexqhqVjtOMqB6Xp9JDr96SjkmI7drpS6kN8bjqA5Kp+wL2FdtofLS0TKXzdifpNZMWqPTAPWHa63ceETS2hIlAkLTa3GUqWyV1l8A2cwUNjnt8Kj14/ynpgZsPZK2iew7wThfpOE7So6ZK0uoWb5K1JPp1k7DSOIYGI5SJVD1+Lk0rIvLxG/iu3AS+1k7t6M9y1UEUdzWQbpudL2tKUhLiVtDqREY+/yAHWGyUumPVDjnpJMQsVZS4kg2+tAT8GOV4iRg7bSFybtpLDrDgWIdNUfVhkcKS7D58mrYj7gRlP1ZNRLjko0pXkxWidKXY3K43RL7/Ike4nnpfkkzpfEDY5q7RtJFLMYIJuoeRdcQ0iHt95AwLDRYdLTukudMA8Jy7RLYIzA8tO5HCYYRgjbTHMSae8igOF38A1+5jlPE1E+ZB3cL1FFiqEYjArYe6N6OU4xjBhLQXErzhBB88E93rA7etc8t++eDSofpCgsj0SlY9ZhYdUuEPX2lWEsFGiFXbIFj4gpLW0nmg5rgm6lzJEC25lGZI/UuphFa9lksQZqKVfkwkCDnRSr9mSjAHrfNzmgyhYv7v33OO+wOijayLWr2hqgAAAABJRU5ErkJggg==",
        jsonicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABACAYAAACX+xC4AAAAAXNSR0IArs4c6QAADLhJREFUeF7tXAt4FNUV/u+GPEggvMIriYBEq1ix2vqkVay1PopaUdv6oL5bUfH5tQr6SftZRfT7am2lUmhFK2gVRK1arVKt9sNHbatWBKQaEMgSkBAeIRHy2Nv975mb3dmd3ZlNJEB2zwffyczeOXPnn3PPPfecc0dhD6HlqBjArhRCn0neBnyTXEEfIjy0r9PVXgld3s5jjcgq4eoD8jzg7+Q7oZ4hH4Xwpj3hUdWe0An2IQf4Ln4TK1FpNFdDT5Fb6bOFq/wv9ta6xZG7UEaKuot8JGrMSOhq2m0angN8F7/qj1DWm7fIR+E9otm4QjSO/7qOtLm1ueks8hbsvIn8QNQ1dEUvuuxhc4A7hq0jb1VrfRCA8wAcD2B/ANTenqI4eFApdbmV+zGGfZl/h9BqvAVA7deRe+66a/QnlB1BD+Md7Y81S+29tNa3A7gZQEGUfw5gB4AwgPcBPKaUejHTfmWk4Vrrk6OeFie5Y5xOeN2vuwKe+Kw0TTUAfquUujso8IEB11rfAeBaR5vTyTeAr0LF0aI56iVprEuDdmr3tFPbZCQapcK+CL+doOGpukXgXwFwSfS5+QLSUiDAtdZ3ArgRQJGfQGtSsghwo00O6GcppdJOvr6Aa63HA/gdgEEBwEZr7WdPfVp+xNQQIm92pWbnH1Blbld45KGGR+q3GP75on/I+Gp23HHfhxBNjyA0Zvgnr0/KrxpxaRrzGS+tOTqP3a2UmpruFkEAfwzAuc6E6CWLb3cjgP8BWLXj7XdX1Bwz/pnuAHjFS4+c0POksYdF7fRAAHQUhgHokQbQ9wCMTaflaQHXWtP7eAuA8TQ8aGX07U9TSj0Yc/sK3pV2XeON9Lv9J+Zu/W673rODLR+bEAtqT/i+4a01tb467oxM4720oPmr5PTTtdacl2hex0q4JonqAUxUSi1IdRM/wE8H8IcU5oQTxI+ta5QNgBvTJEpIF/cED1B3OgpId9KT/AD/Id0eD88kAmC2UupKK7UaFTOdvycGVCHPZnkD+pnzpVdd5Pp98x2/dhTPLBRRNOZww8vfcNx7p3Xzko/MX/n7jTBc9ZR5vv5W8dy2TLs/0+5x/kIVwu3PqrWeFO3CdAAlCcJ87XhHAW+MLgImK6VmZCng1O5HAFR4vD3XOiTx944CTtfnaqXUXBuEikBz9dXh2Eivc79r+lb2wDTDQ/36uPq6utyYUrTVfmZ431uuMbz/nVwIAjve+o/h68aInIKDvmR4r4vOMXzrfbSMseuDqrmNvYSgjPvDKKPWOgd41gBejYo/OdpC1zFj6jv5atHUu5ywuCOhbQM9TWDzHb8xfNuMh1yyS6++2ByXzeACGGj+cIXhNaO/lXEfAl7wONtVIXzebtXwHOBJr2vX2PCWteGbq4cdNb8A2nFsM8vU9L7oe6anAx/+lavHjU9JAG7jJYwkAJFt7pVy/kiuPYDS639keJ9rLnFd3/DQE+Z4x+J/Gd745F885QTU6rhmkjlqhho68oNFxxaMHkWHoesmzRzgXQx4w6y58+smTn5LQ8n0H5DyhkpIZp8VEuMI9ZYk/PbHxJ/+bIJ4H9Dib6sCSXH2n36L4aWTRKNVfroVdqwzbZs2m4NN197muk/A7iY1U9CX950y6cB+06YwH9B1Gp4DvIsBr58yfUn99PtXhaAuyERbBtz7M9O8zw1ig1tXSwh57UGmDAW6iYmVGA1eYFKPKDlnnOv8jsXvyLEzEoqOPcocWo1WeRLqCPV1h+HrrpKRsm0m1y2ZUwT60d7njx8y+NEZB+4KDWdokmvqxOKbhmwGvOSccYOGLpg9KhpnqvR4ZZ3yUujk/tQjHrx14xU3bds2e94WhdDoQHriaNzwWgkm5g00hVaomzhZNG7WPJeYkrO/Y44HPzlbFLm11fCNE5h0ArY/8azhxafKyBjywlzR8PXiv68dxYAeMHDOvYaXjD9F5Le1GVZzuMhvfr89hem6f6oDjcgS/lal13EIMWSbSM8qpWS560F+S/vnAbjHsgipqT35/Oaml19rzGLA6SZKvMFN1QDOUEotywhwrTU1mwY3MSJGOW+uVFI55WFuPN9swcEHmPOVS5j+i9HqMhkg1vbaX4YukgVszxOPNXzLPQ8YXn+zxFos2WjgiHrRVFVUaHjNoScZ3rL8Y8PLF4sXVHjEVwxveuFVw9ePu9AlL8CBqWUcqWueS5GY4RB6VCnlDnc6gpM0XGtNu0RTwog9Sx8SibPa7StV5a3OD4n23bPP3RBwzvoMXff3eGCCzhTjnUrZJLq0UlprVh4dDGCoCYalTyO1J0tXqkqT+wtKxaedaJoOee5hw1vXrjN8zbAjPUUMrzOmEjY+Hj7qNHO88x0TlEyi8teeNOeKxppiAWy8TDJBDXNMCKR9pNiRgwhD+sDqQaLxiSPM77mqECZ2fwRAL80r+0MRNv3ItBNNzWpe9DcAQSI+nLWejs5HlzFnV40KWZkEpO4IuEFUa/qttEtBKhqW+QFOUJn+ZmDi3vjhkSngvS5g8h8YNE8yLi0fmZQh1o5i8VYyDd8gmpw3qMzwdd+Q63e8ITGSRBr8tCx4S84Ub2TTDT833MbB4XhJ+25dbs6rkmLDa08633Cb3fcU7nGSGm5POwVSDP4cwVB9moS7L+BvO1rNsi5XkUsO8BjgBN7JdZ4VLYNjydypZm9BMvkCbi9hTR2n9V8opfgSUI0KG8YLNGkWnyKaPORF8bcjW+XyT/ty/ZBMQ/48x5wsPkO8jcb5dAqADT9oTy2aY+vPVy4zGx6QVyZz2PpTJxje9NfXXML3qZZyGRt1tPKsfM/OuE8aL6UKYVMN7DgZrDlnwt2dpkoWFhhweynzW1OUUnNygId7a62pRQzTcgHkW+MT9fyWxdshLnDGRN0ZqhR9bFaMetHaqGJeXK3K7+OPQRc+PSqGGFnDav7tkllzmCnlS1rxFR4ta4oKm5UPhVztdjorxOKTZeTYKGTLCjoDQM0h4hUlVlyN2PShOR/qT1Mb88OtX+6n4XErza87o17KB5KJriHTUBx6/P8ynQ3Pt+JMAgSUAZpE4kT6eLUqpyuZzYBzZcayNi/vhD7vVBZIJYKXchhorWn4OfWXe4C+dNXA0Uvb6upbMo0WVv53kRFXcIjY7q33S67SxqsT79X7Qsm6l82SuhK7kkxs1/opBx6w/nTJddocp21XcKgUj1W+5xTzOj+sqRQFbQ2v99LSpHOMFvLkfjrMIevlTm91zK6t03HJ8IulpKorrN1w4bXLG+YurM1iwFlz6BW8elMpRXPjSX6Ac8gwgJzo4jR0NAFROpHFXEDZTLOZDLpFooDhw8QbaV7KmtBksja65GyJpeU5Ntja7MZnXxZ5n9OhSqbBC39vTpacxYEbW7HaFWwg9ZZ9o5eX3njF/gN+OZUrzC88PJuq1C2rAd8tKbaOJpFtLrLifdFIWyHVsnKNOa49jmuH4DbVTzMT61ds+/VnSG606TmZU/xpL83a5wBP82q11ilNiq0t7GghUMFo8TjLFzMeBoRKzcKtPWOz8VKpS2l6UVaQQcnGSGzNYZ/rLnNd2vDwfHNs616CyqUrzLZ7beVVDnCPVx1EwztbPWtXlEOdnGRi1ezOf3IXB9C48AXDm5dItM/GYqz3UnScxMF7TZA5wMbR7WM1LmC2MFb3EnTPT7erns0BHqfpQTTcNu/sDogelUw4xerDi0//dgbmNbmpHQH1t3CjQlwdilPHkoFwrx0Qu68+PAd40qvrVF2Kr5dib/dFb6oq/JoUBdhMUdHx3G0O5I/Yx3BVKMHMts0MXcSijU3PM2MIbJ/3lOGR7dwd0xGSPfjxu9islN1RH560eSjLAGeEjBVpidvZmZmeqZTipitP8oulpNJwCntFKSVB5ziKfT2ia3cid0SHU0DSvhOZv8d/XSJOw1l6QGwkSB+jTu9iYxUOI4ZeQRpGiWivXG+zuwPu85EHvqzrlFJSC+JBvmmhqL1iIbeUPyUTkxEMgnDbwvNKKdluwD3g3eBrEnEaTa+EqSnmLblEToUb7f44pZR3yDNIHk5r8xGwVJkNr5eQbZ/vsBgkbRbuqIYzyEENThlUTxCcLR+oScSTX4k7L1URp23sa1LY0MlOs5rSu6bBfetsBHx1tILjyiCfZAoEuAM600nccsY0eaqMPpt6Ov5740fGAnwRiOkqFr7cZut1Uk2WGWl4vBBH21mNw4p31qElFjJ2d8BZ/lAH4HXH53ZXGvkgHljDPV0U+ZQFk5HcPMmlIcF/NZ1bZOXsDR+K1FpzJwP/EyfaaHpkpr7ET5NT/d4pwDt6U163NwDemefb4wBP7FDuY7+74vWmkZktgP8fLottRyHAVdEAAAAASUVORK5CYII=",
    }
    const sc = {
        AT: Scratch.ArgumentType,
        BT: Scratch.BlockType,
        VM: Scratch.vm,
        RT: Scratch.vm.runtime,
        EXT: Scratch.vm.runtime.extensionManager,
        CAST: Scratch.Cast,
        block: new (class {
            label(name) { return { blockType: Scratch.BlockType.LABEL, text: name }; }
            xml(xml) { return { blockType: Scratch.BlockType.XML, text: xml }; }
            command(opcode, name, args, blockicon) {
                var block = { opcode: opcode, blockType: sc.BT.COMMAND };
                if (name) { block.text = name };
                if (args) { block.arguments = args };
                if (blockicon) { block.blockIconURI = icon[blockicon] }
                return block
            }
            reporter(opcode, name, args, blockicon, showstage) {
                var block = { opcode: opcode, blockType: sc.BT.REPORTER, disableMonitor: true };
                if (name) { block.text = name };
                if (args) { block.arguments = args };
                if (blockicon) { block.blockIconURI = icon[blockicon] }
                if (showstage) { block.disableMonitor = !showstage } else { }
                return block
            }
            boolean(opcode, name, args, blockicon) {
                var block = { opcode: opcode, blockType: sc.BT.BOOLEAN };
                if (name) { block.text = name };
                if (args) { block.arguments = args };
                if (blockicon) { block.blockIconURI = icon[blockicon] }
                return block
            }
            button(opcode, name) {
                var block = { blockType: sc.BT.BUTTON, func: opcode }
                if (name) { block.text = name }
                return block
            }
        }),
        Menus: {
            apis: {
                acceptReporters: false,
                items: [{
                    text: "https://apis.netstart.cn/music（推荐）",
                    value: "netstart"
                }, {
                    text: "https://ilygfw-musicapi.voyage200.top",
                    value: "nodejsvoyage200"
                }, {
                    text: "https://163api.qijieya.cn",
                    value: "163apiqijieya"
                }, {
                    text: "https://www.musicapi.cn",
                    value: "wwwmusicapi"
                }
                ]
            },
            country: {
                acceptReporters: true,
                items: ["无"],
            },
            retype: {
                acceptReporters: false,
                items: [{
                    text: "歌曲",
                    value: "songs"
                }, {
                    text: "歌单",
                    value: "resource"
                }, {
                    text: "话题",
                    value: "topic"
                }, {
                    text: "歌手",
                    value: "artist"
                }, {
                    text: "MV",
                    value: "mv"
                },]
            },
            datatype: {
                acceptReporters: false,
                items: [{
                    text: "歌曲",
                    value: "song"
                }, {
                    text: "MV",
                    value: "mv"
                }, {
                    text: "话题",
                    value: "topic"
                }, {
                    text: "专辑",
                    value: "album"
                }, {
                    text: "歌单",
                    value: "playlist"
                }, {
                    text: "歌手",
                    value: "artist"
                },]
            },
            linktype: {
                acceptReporters: false,
                items: [{
                    text: "JSON（设置的源）",
                    value: "JSON"
                }, {
                    text: "直链（设置的源）",
                    value: "link"
                },]
            },
            songainfotype: {
                acceptReporters: true,
                items: ["歌曲名", {
                    text: "歌手信息列表",
                    value: "歌手列表"
                }, "专辑名称", "专辑ID", "歌曲/专辑封面链接", "翻译名列表"]
            },
            audioc: {
                acceptReporters: false,
                items: ["暂停", "继续播放", {
                    text: "停止并释放",
                    value: "停止"
                }]
            },
            audiob: {
                acceptReporters: false,
                items: ["正在播放", "已尝试加载/加载中", "已识别并加载成功"]
            },
            audior: {
                acceptReporters: false,
                items: ["当前播放时间", "播放总时长", "音乐URL"]
            },
        },
    };
    /*函数类开头*/
    const Code = new (class {
        fetch(string) {
            try {
                return fetch(NMusicAPI + string).then((r) => r.text());
            } catch {
                return ""
            }
        };

        fetchtcode(string, funccode, data) {
            return fetch(NMusicAPI + string, data).then(r => r.json()).then(d => funccode(d))
        };
        /*示例：Code.fetchtcode("/search?keywords=\"bad apple!!\"",(function(d) {return d}))*/

        songinfo(data, type) {
            var info = data.songs[0];
            switch (type) {
                case "歌曲名":
                    return info.name;
                case "歌手列表":
                    return JSON.stringify(info.ar);
                case "专辑名称":
                    return info.al.name;
                case "专辑ID":
                    return info.al.id;
                case "翻译名列表":
                    return JSON.stringify(info.tns);
                case "歌曲/专辑封面链接":
                    return info.al.picUrl;
            }
        };

        jsonhasOwn(obj, property) { return Object.prototype.hasOwnProperty.call(obj, property) }

        securealert(info) {
            return confirm("此作品要通过扩展“wkrxiao的网易云音乐”(wkrxiao163Music)进行可能会有风险的操作:\n" + info + "\n请您谨慎操作，扩展开发者不承担任何责任")
        };

        getapilink(link) {
            return ({
                netstart: "https://apis.netstart.cn/music",
                nodejsvoyage200: "https://ilygfw-musicapi.voyage200.top",
                "163apiqijieya": "https://163api.qijieya.cn",
                "wwwmusicapi": "https://www.musicapi.cn"
            })[link]
        }
    })
    /*函数类结尾*/
    let NMusicAPI = Code.getapilink("netstart");
    class NMusicExtensionClass {
        getInfo() {
            return {
                id: "wkrxiao163Music",
                name: "wkrxiao的网易云音乐",
                color1: "#ff0000",
                blockIconURI: icon.default,
                docsURI: "https://learn.ccw.site/article/84c87acc-034b-4bc0-b001-b6edbead54b7",
                blocks: [
                    //积木
                    sc.block.button("refreshblocks", "刷新积木"),
                    sc.block.button("backtrack", "前往“扩展回溯”获取旧版本"),
                    sc.block.label("API设定"),
                    sc.block.command("setapi", "设置API为 [API]", { API: { type: sc.AT.STRING, defaultValue: "netstart", menu: "apis", } }),
                    sc.block.reporter("apilink", "API [API] 的链接", { API: { type: sc.AT.STRING, defaultValue: "netstart", menu: "apis", }, }),
                    sc.block.reporter("currentapi", "当前的API链接"),
                    sc.block.boolean("isapi", "当前API为 [API] ？", { API: { type: sc.AT.STRING, defaultValue: "netstart", menu: "apis", }, }),

                    sc.block.label("登录相关"),
                    sc.block.boolean("sendc", "尝试向手机号 [PHONE] 发送验证码", { PHONE: { type: sc.AT.NUMBER, defaultValue: 11451419198 }, },),
                    sc.block.boolean("captcha", "验证手机号 [PHONE] 的验证码 [CAP]", { PHONE: { type: sc.AT.NUMBER, defaultValue: 11451419198 }, CAP: { type: sc.AT.NUMBER, defaultValue: 1145 }, },),
                    sc.block.label("信息获取"),
                    sc.block.reporter("recommend", "每日推荐/热门 [RETYPE]", { RETYPE: { type: sc.AT.STRING, defaultValue: "songs", menu: "retype" }, },),
                    sc.block.reporter("datainfo", "获取ID为 [ID1] 的 [TYPE] 信息", { TYPE: { type: sc.AT.STRING, defaultValue: "song", menu: "datatype" }, ID1: { type: sc.AT.NUMBER, defaultValue: "1855080368", }, },),
                    sc.block.reporter(
                        "searchsongst",
                        "搜索歌曲 [NAME1]",
                        {
                            NAME1: {
                                type: sc.AT.STRING,
                                defaultValue: "bad apple!!",
                            },
                        },
                    ),
                    sc.block.reporter(
                        "checksongs",
                        "检测ID为 [ID1] 的歌曲是否可播放（详细信息）",
                        {
                            ID1: {
                                type: sc.AT.NUMBER,
                                defaultValue: "18520488",
                            },
                        },
                    ),
                    sc.block.boolean(
                        "songscanplay",
                        "ID为 [ID1] 的歌曲是否可播放？",
                        {
                            ID1: {
                                type: sc.AT.NUMBER,
                                defaultValue: "18520488",
                            },
                        },
                    ),
                    sc.block.reporter(
                        "getlrc",
                        "获取歌曲ID为 [ID1] 的歌词",
                        {
                            ID1: {
                                type: sc.AT.NUMBER,
                                defaultValue: "22645196",
                            },
                        },
                    ),
                    sc.block.reporter(
                        "linkup",
                        //reporter
                        "获取ID为 [ID1] 的 [TYPE] 链接的 [LINKTYPE]",
                        {
                            TYPE: {
                                type: sc.AT.STRING,
                                defaultValue: "song",
                                menu: "datatype"
                            },
                            LINKTYPE: {
                                type: sc.AT.STRING,
                                defaultValue: "JSON",
                                menu: "linktype"
                            },
                            ID1: {
                                type: sc.AT.NUMBER,
                                defaultValue: "1855080368",
                            },
                        },
                    ),
                    sc.block.reporter(
                        "songainfo",
                        //reporter
                        "获取歌曲ID为 [ID1] 的 [TYPE]",
                        {
                            TYPE: {
                                type: sc.AT.STRING,
                                defaultValue: "歌曲名",
                                menu: "songainfotype"
                            },
                            ID1: {
                                type: sc.AT.NUMBER,
                                defaultValue: "1855080368",
                            },
                        },
                    ),
                    sc.block.label("JSON处理"),
                    sc.block.reporter(
                        "json_get",
                        "对象 [json] 中的 [item]",
                        {
                            item: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "bad",
                            },
                            json: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '{"bad":"apple"}',
                            },
                        },
                        "jsonicon"
                    ),
                    sc.block.reporter(
                        "json_array_get",

                        "数组 [json] 的第 [item] 项",
                        {
                            item: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1,
                            },
                            json: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '["163","Music"]',
                            },
                        },
                        "jsonicon"
                    ),
                    sc.block.label("播放控制（改编至SIPC的云音乐）"),
                    sc.block.command(
                        'playMusic',
                        //command,
                        '播放网址为 [url] 的音乐（默认线程名：audio）',
                        {
                            url: {
                                type: sc.AT.STRING,
                                defaultValue: 'https://example.com/music.mp3'
                            }
                        }
                    ),
                    sc.block.command(
                        'playmoreaudio',
                        //command,
                        '播放网址为 [url] 的音乐，线程名为 [AUDIO]',
                        {
                            url: {
                                type: sc.AT.STRING,
                                defaultValue: 'https://example.com/music.mp3'
                            },
                            AUDIO: {
                                type: sc.AT.STRING,
                                defaultValue: 'audio'
                            }
                        }
                    ),
                    {
                        blockType: sc.BT.LABEL,
                        hideFromPalette: sc.EXT.isExtensionLoaded("GandiMedia"),
                        text: " 加载Gandi 媒体助手,可播放云背包内的音乐",
                    },
                    {
                        blockType: sc.BT.LABEL,
                        hideFromPalette: sc.EXT.isExtensionLoaded("GandiMedia"),
                        text: " 若加载后未显示，点击扩展列表开头的“刷新积木”",
                    },
                    {
                        blockType: sc.BT.XML,
                        hideFromPalette: !sc.EXT.isExtensionLoaded("GandiMedia"),
                        xml: "<label text=' 播放云背包内的音乐：'/><block type=\"wkrxiao163Music_playmoreaudio\"><value name=\"url\"><shadow type=\"GandiMedia_menu_AUDIO_LIST\"><field name=\"AUDIO_LIST\">0</field></shadow></value><value name=\"AUDIO\"><shadow type=\"text\"><field name=\"TEXT\">audio</field></shadow></value></block>",
                    },
                    sc.block.reporter(
                        "audios",
                        //reporter
                        "当前所有音乐线程",
                        "default",
                        true
                    ),
                    sc.block.reporter(
                        "curaudio",
                        //reporter
                        "当前选择音乐线程",
                        "default",
                        true

                    ),
                    sc.block.command(
                        'turntoaudio',
                        //command,
                        '切换到线程 [AUDIO]',
                        {
                            AUDIO: {
                                type: sc.AT.STRING,
                                defaultValue: 'audio'
                            }
                        }
                    ),
                    sc.block.command(
                        "audioc",
                        //command,
                        "[C] 音乐",
                        {
                            C: {
                                type: sc.AT.STRING,
                                defaultValue: "暂停",
                                menu: "audioc",
                            },
                        },
                    ),
                    sc.block.command(
                        "jumpTotime",
                        //command,
                        "跳转到时间 [time] 秒",
                        {
                            time: {
                                type: sc.AT.NUMBER,
                                defaultValue: 0
                            }
                        }
                    ),
                    sc.block.command(
                        'adjustthevolume',
                        //command,
                        '将音量调到 [volume] %',
                        {
                            volume: {
                                type: sc.AT.NUMBER,
                                defaultValue: 100
                            }
                        }
                    ),

                    sc.block.boolean(
                        "audiob",
                        "音乐是否 [B]",
                        {
                            B: {
                                type: sc.AT.STRING,
                                defaultValue: "正在播放",
                                menu: "audiob"
                            },
                        },
                    ),
                    sc.block.reporter(
                        "audior",
                        //reporter
                        "获取音乐的 [R]",
                        {
                            R: {
                                type: sc.AT.STRING,
                                defaultValue: "当前播放时间",
                                menu: "audior"
                            },
                        },
                    ),
                    sc.block.label("隐藏积木"),
                    {
                        opcode: "searchsongs",

                        blockType: sc.BT.REPORTER,
                        text: "⚠️（不完整）搜索 [NAME1]",
                        arguments: {
                            NAME1: {
                                type: sc.AT.STRING,
                                defaultValue: "bad apple!!",
                            },
                        },
                    }, {
                        opcode: "songslink",

                        blockType: sc.BT.REPORTER,
                        text: "⚠️（非直链）获取音乐链接 [ID1]",
                        arguments: {
                            ID1: {
                                type: sc.AT.NUMBER,
                                defaultValue: "22645196",
                            },
                        },
                    }, {
                        opcode: "songslinkup",

                        blockType: sc.BT.REPORTER,
                        text: "⚠️（被取代）获取音乐链接JSON [ID1]",
                        arguments: {
                            ID1: {
                                type: sc.AT.NUMBER,
                                defaultValue: "1855080368",
                            },
                        },
                    }, {
                        opcode: "mvlink",

                        blockType: sc.BT.REPORTER,
                        text: "⚠️（被取代）获取MV链接JSON [ID1]",
                        arguments: {
                            ID1: {
                                type: sc.AT.NUMBER,
                                defaultValue: "290067",
                            },
                        },
                    }, {
                        opcode: "songsinfo",

                        blockType: sc.BT.REPORTER,
                        text: "⚠️（被取代）获取音乐信息 [ID1]",
                        arguments: {
                            ID1: {
                                type: sc.AT.NUMBER,
                                defaultValue: "22645196",
                            },
                        },
                    }, {
                        opcode: "mvinfo",

                        blockType: sc.BT.REPORTER,
                        text: "⚠️（被取代）获取MV信息 [ID1]",
                        arguments: {
                            ID1: {
                                type: sc.AT.NUMBER,
                                defaultValue: "290067",
                            },
                        },
                    }, {
                        blockType: sc.BT.XML,

                        xml: "<label text='菜单：'/><block type='wkrxiao163Music_menu_apis'/><block type='wkrxiao163Music_menu_country'/><block type='wkrxiao163Music_menu_retype'/><block type='wkrxiao163Music_menu_datatype'/><block type='wkrxiao163Music_menu_linktype'/><block type='wkrxiao163Music_menu_songainfotype'>"
                    },
                    {
                        blockType: sc.BT.XML,
                        xml: (NUL => { var xml = "<label text='菜单：'/>"; for (var i = 0; i < Object.keys(sc.Menus).length; i++) { xml = xml + "<block type='wkrxiao163Music_menu_" + Object.keys(sc.Menus)[i] + "'/>" }; return xml })(null)
                    },
                ],
                menus: sc.Menus
            };
        }






        //功能实现
        checksongs(args) {
            return Code.fetch("/check/music?id=" + Number(args.ID1));
        }
        songscanplay(args) {
            return Code.fetchtcode("/check/music?id=" + Number(args.ID1), (function (r) {
                return Boolean(r.success)
            }));
        }
        songsinfo(args) {
            return Code.fetch("/song/detail?ids=" + Number(args.ID1));
        }
        songslink(args) {
            return "http://music.163.com/song/media/outer/url?id=" + Number(args.ID1);
        }
        getlrc(args) {
            return Code.fetch("/lyric?id=" + Number(args.ID1));
        }
        songslinkup(args) {
            return Code.fetch("/song/download/url?id=" + Number(args.ID1));
        }
        mvlink(args) {
            return Code.fetch("/mv/url?id=" + Number(args.ID1));
        }
        mvinfo(args) {
            return Code.fetch("/mv/detail?mvid=" + Number(args.ID1));
        }
        setapi(args) {
            NMusicAPI = Code.getapilink(args.API);
        }
        apilink(args) {
            return Code.getapilink(args.API);
        }
        isapi(args) {
            return Boolean(NMusicAPI === Code.getapilink(args.API))
        }
        currentapi() {
            return NMusicAPI;
        }
        searchsongst(args) {
            return Code.fetch("/cloudsearch?keywords=" + encodeURI(args.NAME1));
        }
        recommend(args) {
            switch (args.RETYPE) {
                case "songs":
                    {
                        return Code.fetch("/recommend/songs")
                    }
                case "resource":
                    {
                        return Code.fetch("/recommend/resource")
                    }
                case "topic":
                    {
                        return Code.fetch("/hot/topic")
                    }
                case "artist":
                    {
                        return Code.fetch("/top/artists")
                    }
                case "mv":
                    {
                        return Code.fetch("/personalized/mv")
                    }
            }
        }
        //获取 [TYPE] 链接的 [LINKTYPE] [ID1]
        linkup(args) {
            if (args.TYPE == "song") {
                switch (args.LINKTYPE) {
                    case "JSON":
                        {
                            return Code.fetch("/song/download/url?id=" + Number(args.ID1))
                        }
                    case "link":
                        {
                            return Code.fetchtcode("/song/download/url?id=" + Number(args.ID1), (function (d) {
                                try {
                                    return d.data.url
                                } catch {
                                    return ""
                                }
                            }))
                        }
                }
            };
            if (args.TYPE == "mv") {
                switch (args.LINKTYPE) {
                    case "JSON":
                        {
                            return Code.fetch("/mv/url?id=" + Number(args.ID1))
                        }
                    case "link":
                        {
                            return Code.fetchtcode("/mv/url?id=" + Number(args.ID1), (function (d) {
                                try {
                                    return d.data.url
                                } catch {
                                    return ""
                                }
                            }))
                        }
                }
            };
        }
        datainfo(args) {
            switch (args.TYPE) {
                case "song":
                    {
                        return Code.fetch("/song/detail?ids=" + Number(args.ID1));
                    }
                case "mv":
                    {
                        return Code.fetch("/mv/detail?mvid=" + Number(args.ID1));
                    }
                case "album":
                    {
                        return Code.fetch("/album?id=" + Number(args.ID1));
                    }
                case "artist":
                    {
                        return Code.fetch("/artist/detail?id=" + Number(args.ID1));
                    }
                case "topic":
                    {
                        return Code.fetch("/topic/detail?actid=" + Number(args.ID1));
                    }
                case "playlist":
                    {
                        return Code.fetch("/playlist/detail?id=" + Number(args.ID1));
                    }
            };
        }
        songainfo(args) {
            let type = args.TYPE;
            return Code.fetchtcode("/song/detail?ids=" + Number(args.ID1), (function (d) {
                return Code.songinfo(d, type);
            }))
        }

        sendc(args) {
            if (Code.securealert("向手机号\"" + Number(args.PHONE) + "\"发送验证码")) {
                return Code.fetchtcode("/captcha/sent?phone=" + Number(args.PHONE), (function (data) {
                    return Boolean(data.data)
                }), {
                    cache: "no-store"
                })
            } else {
                return false
            }
        }
        captcha(args) {
            if (Code.securealert("向手机号" + Number(args.PHONE) + "发送验证码")) {
                return Code.fetchtcode("/captcha/verify?phone=" + Number(args.PHONE) + "&captcha=" + Number(args.CAP), (function (data) {
                    return Boolean(data.data)
                }), {
                    cache: "no-store"
                })
            } else {
                return false
            };
        }

        playMusic(args) {
            const url = args.url;
            if (audioElement.audio) {
                audioElement.audio.pause();
            }
            audioElement.audio = new Audio(url);
            setaudioElement = "audio";
            audioElement.audio.play();
        }
        playmoreaudio(args) {
            const url = args.url;
            if (audioElement[args.AUDIO]) {
                audioElement[args.AUDIO].pause();
            }
            audioElement[args.AUDIO] = new Audio(url);
            setaudioElement = args.AUDIO;
            audioElement[args.AUDIO].play();
        }
        turntoaudio(args) {
            if (audioElement[args.AUDIO]) {
                setaudioElement = args.AUDIO
            }
        }
        audios() {
            return JSON.stringify(Object.keys(audioElement))
        }
        curaudio() {
            return setaudioElement
        }
        audioc(args) {
            if (args.C == "暂停") {
                if (audioElement[setaudioElement]) {
                    audioElement[setaudioElement].pause();
                }
            };
            if (args.C == "继续播放") {
                if (audioElement[setaudioElement]) {
                    audioElement[setaudioElement].play();
                }
            };
            if (args.C == "停止") {
                if (audioElement[setaudioElement]) {
                    audioElement[setaudioElement].pause();
                    delete audioElement[setaudioElement];
                }
            };
        }
        adjustthevolume(args) {
            if (audioElement[setaudioElement]) {
                const volumePercent = args.volume;
                if (volumePercent >= 0 && volumePercent <= 100) {
                    const volume = volumePercent / 100;
                    audioElement[setaudioElement].volume = volume;
                }
            }
        }
        audiob(args) {
            if (args.B == "正在播放") {
                if (audioElement[setaudioElement]) {
                    return !audioElement[setaudioElement].paused
                } else {
                    return false
                };
            };
            if (args.B == "已尝试加载/加载中") {
                return Boolean(audioElement[setaudioElement]);
            };
            if (args.B == "已识别并加载成功") {
                if (audioElement[setaudioElement]) {
                    return String(audioElement[setaudioElement].duration) != "NaN"
                } else {
                    return false
                };
            };
        }
        audior(args) {
            if (audioElement[setaudioElement]) {
                switch (args.R) {
                    case "当前播放时间":
                        return audioElement[setaudioElement].currentTime;
                    case "播放总时长":
                        return audioElement[setaudioElement].duration;
                    case "音乐URL":
                        return audioElement[setaudioElement].src
                };
            } else {
                return 0
            };
        }
        jumpTotime(args) {
            var t = args.time;
            audioElement[setaudioElement] && (audioElement[setaudioElement].currentTime = t)
        }
        refreshblocks() {
            sc.EXT.refreshBlocks();
        }
        searchsongs(args) {
            return Code.fetch("/search?keywords=" + args.NAME1)
        }
        json_get({ item, json }) {
            try {
                json = JSON.parse(json);
                if (Code.jsonhasOwn(json, item)) {
                    const result = json[item] ?? "";
                    if (typeof result === "object") {
                        return JSON.stringify(result);
                    } else {
                        return result;
                    }
                }
            } catch {
                // ignore
            }
            return "";
        }
        json_array_get({
            item,
            json
        }) {
            try {
                item = sc.CAST.toNumber(item);
                if (item == 0) return "";
                if (item > 0) {
                    item--;
                }
                json = JSON.parse(json);
                let result;
                if (item >= 0) {
                    result = json[item];
                } else {
                    result = json[json.length + item];
                }
                if (typeof result == "object") {
                    return JSON.stringify(result);
                } else {
                    return result;
                }
            } catch {
                return "";
            }
        };
        backtrack() {
            window.open("https://ccw.site/s/xWy1B")
        }
    };
    Scratch.extensions.register(new NMusicExtensionClass());
    // 	window.tempExt = {
    //     Extension: NMusicExtensionClass,
    //     info: {
    //         name: "wkrxiao的网易云音乐",
    //         description: "在Scratch调用网易云，不再如此繁琐",
    //         extensionId: "wkrxiao163Music",
    //         iconURL: "https://assets.ccw.site/_next/image?url=https%3A%2F%2Fm.ccw.site%2Fworks-covers%2F2a3abfe5-e2e6-4c9d-a22d-a0caf3eaa20a.png%3Fx-oss-process%3Dimage%252Fformat%252Cwebp%252Fresize%252Cs_150&w=384&q=75",
    //         insetIconURL: icon.default,
    //         featured: true,
    //         disabled: false,
    //         collaborator: "wkrxiao",
    //         collaboratorList: [
    //             {
    //                 collaborator: "wkrxiao",
    //                 collaboratorURL: "https://www.ccw.site/student/655739be4b9a4844976e9902",
    //             },
    //         ],
    //     },
    // };
})(Scratch)