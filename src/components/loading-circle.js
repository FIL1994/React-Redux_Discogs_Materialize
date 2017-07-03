/**
 * Created by Philip
 *              on 2017-06-10.
 */
import React, {Component} from 'react';

class LoadingCircle extends Component {
    render(){
        {/*<div className="center-block loader"/>*/}
        {/*<div className="center-block la-line-scale-pulse-out la-dark la-2x">*/}
        {/*<div></div>*/}
        {/*<div></div>*/}
        {/*<div></div>*/}
        {/*<div></div>*/}
        {/*<div></div>*/}
        {/*</div>*/}

        {/*<div className="center-block loader"/>*/}
        return(
            <div className="progress center-align">
                <div className="indeterminate"></div>
            </div>
        );
    }
}

export default LoadingCircle;