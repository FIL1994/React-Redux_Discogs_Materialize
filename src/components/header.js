/**
 * Created by Philip
 *              on 2017-06-10.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import ListItemLink from './list-item-link';

class Header extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <nav role="navigation" className="blue-grey darken-2">
                <ul className="left">
                    <ListItemLink to="/" name="MusicApp"/>
                </ul>
                <ul id="slide-out" className="side-nav blue-grey darken-1">
                    <ListItemLink to="/" name="MusicApp"/>
                </ul>
                <a href="" data-activates="slide-out" className="button-collapse show-on-large">
                    <i class="mdi-navigation-menu"></i>
                </a>
            </nav>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        state
    };
}

export default Header;