//Pulldown.js
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {PULLDOWN_STATS} from './constants.js';
import FontAwesome from 'react-fontawesome';

import Card from './Card.js';

import {on, off} from '../common/utility.js';

import styles from './style.css';



let noop = ()=>{};

let isTouched = false;
let startY;

class Pulldown extends Component {

    constructor(props){
        super(props);

        //during mount, pulldown status can only be allowed set as 'refreshing' or 'init'
        const pulldownStatus = props.defaultStatus === PULLDOWN_STATS.refreshing ? PULLDOWN_STATS.refreshing : PULLDOWN_STATS.init;

        const pulldownDistance = pulldownStatus === PULLDOWN_STATS.refreshing ? 50 : 0;

        this.state = {
            pulldownStatus: pulldownStatus,
            pulldownDistance: pulldownDistance
        }
    }

    static defaultProps = {
        prefixCls: 'bin-pulldown',
        className: '',
        handleRefresh: noop,
        defaultStatus: PULLDOWN_STATS.init,
        refreshDone: true,
        successTips: '加载成功',
        failureTips: '加载失败',
        readyDistance: 70
    };

    static PropTypes = {
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        handleRefresh: PropTypes.func,
        defaultStatus: PropTypes.string,
        refreshDone: PropTypes.bool,
        readyDistance: PropTypes.number
    };

    handleTouchStart(e){
        if(!isTouched && this.pulldownWrapper.scrollTop <= 0){
            isTouched = true;
            const touch = e.touches[0];
            startY = touch.clientY;

            this.setState({
                pulldownStatus: PULLDOWN_STATS.pulling
            });
        }
    }

    handleTouchMove(e){
        if(isTouched && this.pulldownWrapper.scrollTop <=0){
            const touch = e.touches[0];
            const deltaY = touch.clientY - startY;
            const readyDistance = this.props.readyDistance;
            let pulldownStatus;
            console.log(deltaY);
            if(deltaY > 0){
                e.preventDefault();
                //content下滑距离暂定为手指下滑距离的 1/2。
                if(deltaY/2 > readyDistance){
                    pulldownStatus = PULLDOWN_STATS.ready;
                }else{
                    pulldownStatus = PULLDOWN_STATS.pulling;
                }
                const pulldownDistance = deltaY/2;
                this.setState({
                    pulldownStatus: pulldownStatus,
                    pulldownDistance: pulldownDistance
                });
            }
        }
    }

    handleTouchEnd(e){
        if(isTouched && this.pulldownWrapper.scrollTop <=0){
            isTouched = false;
            let pulldownStatus;
            let pulldownDistance;
            if(this.state.pulldownStatus === PULLDOWN_STATS.pulling){
                pulldownStatus = PULLDOWN_STATS.reset;
                pulldownDistance = 0;
            }else if(this.state.pulldownStatus === PULLDOWN_STATS.ready){
                pulldownStatus = PULLDOWN_STATS.refreshing;
                pulldownDistance = 50;
                this.props.handleRefresh();
            }
            this.setState({
                pulldownDistance: pulldownDistance,
                pulldownStatus: pulldownStatus
            });
        }
    }

    getPulldownWrapper(pulldownRootDom){

        if(pulldownRootDom === null){
            this.pulldownWrapper = null;
        }else{
            this.pulldownWrapper = pulldownRootDom.parentNode;
        }
    }

    componentWillReceiveProps(nextProps){
        //console.log(nextProps.defaultStatus);
        const pulldownStatus = nextProps.defaultStatus;
        let pulldownDistance;
        switch(pulldownStatus){
            case PULLDOWN_STATS.resetAfterRefreshed:
                pulldownDistance = 0;
                break;
            case PULLDOWN_STATS.reset:
                pulldownDistance = 0;
                break;
            case PULLDOWN_STATS.refreshing:
                pulldownDistance = 50;
                break;
            case PULLDOWN_STATS.refreshed:
                pulldownDistance = 50;
                break;
            case PULLDOWN_STATS.init:
                pulldownDistance = 0;
                break;
            default:
                pulldownDistance = 0;
        }
        this.setState({
            pulldownDistance: pulldownDistance,
            pulldownStatus: pulldownStatus
        });
    }

    componentDidMount(){
        //if (this.state.pulldownStatus === PULLDOWN_STATS.refreshing)
        //should run this.props.handleRefresh here.
        if(this.state.pulldownStatus === PULLDOWN_STATS.refreshing){
            this.props.handleRefresh();
        }

        //as passive event need to do preventDefault, bind event manually here.
        on(this.pulldownWrapper, 'touchstart', this.handleTouchStart.bind(this), false);
        on(this.pulldownWrapper, 'touchmove', this.handleTouchMove.bind(this), false);
        on(this.pulldownWrapper, 'touchend', this.handleTouchEnd.bind(this), false);
    }

    componentWillUnmount(){
        //unbind event bind here.

        off(this.pulldownWrapper, 'touchstart', this.handleTouchStart.bind(this), false);
        off(this.pulldownWrapper, 'touchmove', this.handleTouchMove.bind(this), false);
        off(this.pulldownWrapper, 'touchend', this.handleTouchEnd.bind(this), false);
    }

    render(){
        //console.log(this.props.renderData);
        const {className, prefixCls, refreshDone, successTips, failureTips} = this.props;

        const pulldownStatus = this.state.pulldownStatus;
        const style = {
            transform: 'translate3d(0px, ' + this.state.pulldownDistance + 'px, 0px)'
        };

        const pulldownClassName = classnames({
            [styles[prefixCls]]: true,
            [styles[className]]: !!className,
            [styles[`${prefixCls}-pulling`]]: pulldownStatus === PULLDOWN_STATS.pulling,
            [styles[`${prefixCls}-ready-refresh`]]: pulldownStatus === PULLDOWN_STATS.ready,
            [styles[`${prefixCls}-refreshing`]]: pulldownStatus === PULLDOWN_STATS.refreshing,
            [styles[`${prefixCls}-refreshed`]]: pulldownStatus === PULLDOWN_STATS.refreshed,
            [styles[`${prefixCls}-reset`]]: pulldownStatus === PULLDOWN_STATS.reset,
            [styles[`${prefixCls}-reset-afterR`]]: pulldownStatus === PULLDOWN_STATS.resetAfterRefreshed
        });

        return (
            <div className={pulldownClassName} ref={this.getPulldownWrapper.bind(this)}>
                <div className={styles[`${prefixCls}-content`]} style={style}
                     //onTouchStart={this.handleTouchStart.bind(this)}
                     //onTouchMove={this.handleTouchMove.bind(this)}
                     //onTouchEnd={this.handleTouchEnd.bind(this)}
                >
                    <div className={styles[`${prefixCls}-top`]}>
                        <span className={styles[`${prefixCls}-arrow`]}>↓</span>
                        <span className={styles[`${prefixCls}-snake`]}/>
                        <span className={styles[`${prefixCls}-tips`]}>
                            {refreshDone ? <FontAwesome name="check"/> : <FontAwesome name="close"/>}
                            <span>{refreshDone ? successTips : failureTips}</span>
                        </span>
                    </div>
                    <div className={styles[`${prefixCls}-list`]} >
                        {this.props.renderData.map((card, index)=>{
                            return <Card content={card.content} key={index} />
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Pulldown;