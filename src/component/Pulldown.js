//Pulldown.js
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {PULLDOWN_STATS} from './constants.js';
import FontAwesome from 'react-fontawesome';

import Card from './Card.js';

import styles from './style.css';

let noop = ()=>{};

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
        failureTips: '加载失败'
    };

    static PropTypes = {
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        handleRefresh: PropTypes.func,
        defaultStatus: PropTypes.string,
        refreshDone: PropTypes.bool
    };

    handleTouchStart(e){

    }

    handleTouchMove(e){

    }

    handleTouchEnd(e){

    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps.defaultStatus);
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
    }

    render(){

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
            <div className={pulldownClassName}>
                <div className={styles[`${prefixCls}-content`]} style={style}
                     onTouchStart={this.handleTouchStart.bind(this)}
                     onTouchMove={this.handleTouchMove.bind(this)}
                     onTouchEnd={this.handleTouchEnd.bind(this)}
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