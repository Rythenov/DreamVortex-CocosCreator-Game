/**
 * Http 请求封装
 */
const HttpHelper = cc.Class({
    extends: cc.Component,

    statics: {
    },

    properties: {

    },

    /**
     * get请求
     * @param {string} url 
     * @param {function} callback 
     */
    httpGet(url, callback) {
        cc.myGame.gameUi.onShowLockScreen();
        let xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            // cc.log("Get: readyState:" + xhr.readyState + " status:" + xhr.status);
            if (xhr.readyState === 4 && xhr.status == 200) {
                let respone = xhr.responseText;
                let rsp = JSON.parse(respone);
                cc.myGame.gameUi.onHideLockScreen();
                callback(rsp);
            } else if (xhr.readyState === 4 && xhr.status == 401) {
                cc.myGame.gameUi.onHideLockScreen();
                callback({status:401});
            } else {
                //callback(-1);
            }


        };
        xhr.withCredentials = true;
        xhr.open('GET', url, true);

        // if (cc.sys.isNative) {
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
        xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type,authorization');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader('Authorization', 'Bearer ' + cc.myGame.gameManager.getToken());
        // xhr.setRequestHeader('Authorization', 'Bearer ' + "");
        // }

        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 8000;// 8 seconds for timeout

        xhr.send();
    },

    /**
     * post请求
     * @param {string} url 
     * @param {object} params 
     * @param {function} callback 
     */
    httpPost(url, params, callback) {
        cc.myGame.gameUi.onShowLockScreen();
        let xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            // cc.log('xhr.readyState=' + xhr.readyState + '  xhr.status=' + xhr.status);
            if (xhr.readyState === 4 && xhr.status == 200) {
                let respone = xhr.responseText;
                let rsp = JSON.parse(respone);
                cc.myGame.gameUi.onHideLockScreen();
                callback(rsp);
            } else {
                callback(-1);
            }
        };
        xhr.open('POST', url, true);
        // if (cc.sys.isNative) {
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
        xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader('Authorization', 'Bearer ' + cc.myGame.gameManager.getToken());
        // }

        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 8000;// 8 seconds for timeout

        xhr.send(JSON.stringify(params));
    },

    /**
     * 登录专用
     * @param {string} url 
     * @param {object} params 
     * @param {function} callback 
     * @param {string} account 
     * @param {string} password 
     */
    httpPostLogin(url, params, callback, account, password) {
        cc.myGame.gameUi.onShowLockScreen();
        let xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            // cc.log('xhr.readyState=' + xhr.readyState + '  xhr.status=' + xhr.status);
            if (xhr.readyState === 4 && xhr.status == 200) {
                let respone = xhr.responseText;
                let rsp = JSON.parse(respone);
                cc.myGame.gameUi.onHideLockScreen();
                callback(rsp);
            } else {
                callback(-1);
            }
        };
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
        xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');
        xhr.setRequestHeader("Content-Type", "application/json");
        let str = account + "@" + password;
        xhr.setRequestHeader('Authorization', 'Basic' + ' ' + window.btoa(str));

        xhr.timeout = 8000;// 8 seconds for timeout

        xhr.send(JSON.stringify(params));

    }
});

window.HttpHelper = new HttpHelper();