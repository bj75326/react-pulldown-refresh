// Card.js
// typical example used only

import React, {Component} from 'react';

export default class Card extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="card">
                <section>{this.props.content}</section>
            </div>
        );
    }
}