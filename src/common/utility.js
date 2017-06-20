//utility.js

export const on = (element, type, handler, userCapture)=>{
    if(document.attachEvent){
        element.attachEvent('on' + type, handler);
    }else if(document.addEventListener){
        element.addEventListener(type, handler, userCapture);
    }
};

export const off = (element, type, handler, userCapture)=>{
    if(document.detachEvent){
        element.detachEvent('on' + type, handler);
    }else if(document.removeEventListener){
        element.removeEventListener(type, handler, userCapture);
    }
};

export const customAjaxCall = (method, data, url, async)=>{
    if(method.toLowerCase() === 'get'){
        return new Promise((resolve, reject)=>{
            const xhr = new XMLHttpRequest();
            //xhr.timeout = 3000;
            xhr.responseType = 'json';
            xhr.onreadystatechange = ()=>{
                if(xhr.readyState === 4){
                    if(xhr.status === 200 || xhr.status === 304){
                        //test only
                        /*let a = +new Date();
                        let b;
                        do{
                            b = +new Date();
                        }while(b-a < 3000) */
                        //test only
                        resolve(xhr.response);
                    }else{
                        reject(xhr.status);
                    }
                }
            };
            xhr.open('GET', url, async);
            xhr.send(null);
        });
    }else if(method.toLowerCase() === 'post'){
        return new Promise((resolve, reject)=>{
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.onreadystatechange = ()=>{
                if(xhr.readyState === 4){
                    if(xhr.status === 200 || xhr.status === 304){
                        resolve(xhr.response);
                    }else{
                        reject(xhr.status);
                    }
                }
            };
            xhr.open('POST', url, async);
            xhr.send(data);
        });
    }
};