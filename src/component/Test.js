// Test.js
import React, {Component} from 'react';
import Pulldown from './Pulldown.js';

import {PULLDOWN_STATS} from './constants.js';

import {customAjaxCall} from '../common/utility.js';

//简单封装 ajax call
/*const customAjaxCall = (method, data, url, async)=>{
    if(method.toLowerCase() === 'get'){
        return new Promise((resolve, reject)=>{
            let xhr = new XMLHttpRequest();
            //xhr.timeout = 3000;
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
            xhr.open('GET', url, async);
            xhr.send(null);
        });
    }else if(method.toLowerCase() === 'post'){
        return new Promise((resolve, reject)=>{
            let xhr = new XMLHttpRequest();
            //xhr.timeout = 3000;
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
            //xhr.setRequestHeader("Content-Type", "application/json");
            //xhr.setRequestHeader("Content-Type", "mutipart/form-data");
            xhr.send(data);
        });
    }
};*/

let page = 0;
let pageLoading = 0;

//let pulldownStatus = PULLDOWN_STATS.refreshing;
let refreshDone = true;

class Test extends Component{

    constructor(props){
        super(props);
        this.state = {
            data: [],
            pulldownStatus: PULLDOWN_STATS.refreshing
        };
    }

    handleRefresh(){

        //let url = 'http://localhost:63342/react-pulldown-refresh/data/pulldown.json';
        let url = 'https://bj75326.github.io/react-pulldown-refresh/data/pulldown.json';

        customAjaxCall('get', null, url, true).then((response)=>{
            //setState put here
            //logic here used only for typical example.
            //data preprocessing
            //console.log(response);
            page--;
            let content = response.content;
            if(Object.prototype.toString.call(content).slice(8, -1) === 'Array' && content.length > 0){
                /*
                content = content.map((value, index)=>{
                    if(page < -1){
                        if(index<10){
                            value.content = parseInt(value.content) + (page + 1) * 10 + '';
                            return value;
                        }
                    }else{
                        return value;
                    }
                });*/
                if(page < -1){
                    content = content.slice(0, 10).map((value)=>{
                        value.content = parseInt(value.content) + (page + 1) * 10 + '';
                        return value;
                    });
                }
                const data = content.concat(this.state.data);
                const pulldownStatus = PULLDOWN_STATS.refreshed;
                refreshDone = true;
                this.setState({
                    data: data,
                    pulldownStatus: pulldownStatus
                });
            }
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve();
                }, 600);
            });
        }, (status)=>{
            console.log(status);
            const pulldownStatus = PULLDOWN_STATS.refreshed;
            refreshDone = false;
            this.setState({
                pulldownStatus: pulldownStatus
            });
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve();
                }, 600);
            });
        }).then(()=>{
            const pulldownStatus = PULLDOWN_STATS.resetAfterRefreshed;
            this.setState({
                pulldownStatus: pulldownStatus
            });
        });
    }

    handleLoading(){

    }

    componentDidMount(){
        //
    }

    render(){

        return (
            <div className="page">
                <div className="subtitle">
                    <div className="page-back"></div>
                    <div className="page-title">Pull Down</div>
                    <div className="extension"></div>
                    <div className="desc">
                        <p>向下拖拽页面加载数据</p>
                        <p>此例请用移动端查看</p>
                    </div>
                </div>
                <div className="viewport pulldown">
                    <Pulldown renderData={this.state.data} handleRefresh={this.handleRefresh.bind(this)} defaultStatus={this.state.pulldownStatus}
                    refreshDone={refreshDone} />
                </div>
            </div>
        );
    }
}

export default Test;