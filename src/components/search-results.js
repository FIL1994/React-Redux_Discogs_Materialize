/**
 * Created by Philip
 *              on 2017-06-10.
 */
import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoadingCircle from './loading-circle';
import {Link} from 'react-router-dom';

class SearchResults extends Component {
    constructor(props){
        super(props);
        this.state = {
            results : {}
        };
    }

    renderResults(){
        //console.log(this.props.results);

        return _.map(this.props.results.undefined, result => {
            //console.log(result);
            return(
               <li className="collection-item avatar" key={result.id}>
                   <img className="circle" src={result.thumb} alt={result.title} />
                   <span className="title">{result.title}</span>
                   <br/>
                   <div className="chip">
                       {result.type}
                   </div>
                   <br/>
                   <Link className="waves-effect waves-light btn" to={`${result.type}/${result.id}`}>More Info</Link>
               </li>
            );
        });
    }

    render(){
        let isLoading;
        try {
            isLoading = this.props.results.loading === true ?
                <LoadingCircle/> : <ul className="collection">{this.renderResults()}</ul>;
        } catch(e){}
        return(
            <div>
                {isLoading}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        results : state.searchResults
    };
}

export default connect(mapStateToProps)(SearchResults);