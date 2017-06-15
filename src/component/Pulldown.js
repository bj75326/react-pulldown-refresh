//Pulldown.js
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import PULLDOWN_STATS from './constants.js';

import styles from './style.css';

let noop = ()=>{};

class Pulldown extends Component {

    constructor(props){
        super(props);

        const pulldownStatus = props.defaultStatus !== undefined ? props.defaultStatus : PULLDOWN_STATS.init;

        this.state
    }

    static defaultProps = {
        prefixCls: 'bin-pulldown',
        className: '',
        handleRefresh: noop,
        defaultStatus: PULLDOWN_STATS.init
    };

    static PropTypes = {
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        handleRefresh: PropTypes.func,
        defaultStatus: PropTypes.string
    };

    componentDidMount(){
        //if this.state.pulldownStatus === PULLDOWN_STATS.refreshing
    }

    render(){

        return (
            <div className="bin-pulldown">
                <div className="bin-pulldown-content" style={{}}>
                    <div className="bin-pulldown-top">
                        <span className="bin-pulldown-arrow">↓</span>
                        <span><div className="bin-pulldown-snake"></div></span>
                        <span className="bin-pulldown-tips"></span>
                    </div>
                    <div className="bin-pulldown-list">

                    </div>
                </div>
            </div>
        );
    }
}

export default Pulldown;