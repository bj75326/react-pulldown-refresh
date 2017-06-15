// Test.js
import React, {Component} from 'react';
import Pulldown from './Pulldown.js';

import PULLDOWN_STATS from './constants.js';

//简单封装 ajax call
const customAjaxCall = (method, data, url, async)=>{
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
};

class Test extends Component{

    constructor(props){
        super(props);
        this.state = {
            data: []
        };
    }

    handleRefresh(){

        let url = '';
        customAjaxCall('get', null, url, true).then((response)=>{
            //setState put here
            console.log(response);
        }, (status)=>{
            console.log(status);
        });
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
                    <Pulldown renderData={this.state.data} handleRefresh={this.handleRefresh.bind(this)} defaultStatus={PULLDOWN_STATS.refreshing}/>
                </div>
            </div>
        );
    }
}

export default Test;