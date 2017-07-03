/**
 * Created by Philip
 *              on 2017-06-10.
 */
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {fetchSearchResults, setSearch} from '../actions';

class RadioField extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <span className="radio-inline">
                <Field name={this.props.name} component="input" type="radio"
                       value={this.props.value}
                       id={this.props.title}/>
                <label for={this.props.title}>{this.props.title}</label>
            </span>
        );
    }
}

class Search extends Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            submittingPost : false,
            results : {}
        };
    }

    renderField(field){
        //destructuring ES6
        const {meta : {touched, error}} = field;
        const className=`form-group ${touched && error ? 'has-error' : ''}`;
        return(
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    renderSearchField(field){
        //destructuring ES6
        const {meta : {touched, error}} = field;
        const placeholder =  touched && error ? error : 'Search';
        return(
            <input
                className="form-control"
                type="text"
                value={field.value}
                placeholder={placeholder}
                aria-describedby="basic-addon1"
                {...field.input}
            />
        );
    }

    onSubmit(values){
        this.props.setSearch();
        this.props.fetchSearchResults(values);

        /*
         (response) => {
         console.log(response);
         console.log("Request URL", response.request.responseURL);
         this.setState({
         results : response.data.results,
         //submittingPost: false
         });
         console.log("props", this.props.search);
         }
         */
        //console.log("props", this.props.submittingPost);
    }

    componentDidUpdate(){
        $(':radio').each(function (i) {
            if($(this).next().is("label")){
                const rID = "radio" + i;
                $(this).attr("id", rID);
                $(this).next().attr("for", rID);
            }
        });
        $("#frmSearch nav input").attr("id", "search");
        $('#searchLabel').attr("for", "search");
    }

    render(){
        const {handleSubmit} = this.props;

        return(
            <form id="frmSearch" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <nav>
                    <div className="nav-wrapper">
                        <div className="input-field blue-grey search-bar">
                            <Field
                             name="txtSearch"
                             component={this.renderSearchField}
                             id="search"
                            />
                            <label id="searchLabel" for="search" className="label-icon">
                                <i className="material-icons">search</i>
                            </label>
                        </div>
                    </div>
                </nav>
                <div className="top-space">
                    <RadioField
                        name="searchOption"
                        title="All"
                        value=""
                    />
                    <RadioField
                        name="searchOption"
                        title="Artist"
                        value="artist"
                    />
                    <RadioField
                        name="searchOption"
                        title="Master"
                        value="master"
                    />
                    <RadioField
                        name="searchOption"
                        title="Release"
                        value="release"
                    />
                    <RadioField
                        name="searchOption"
                        title="Label"
                        value="label"
                    />
                </div>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};
    //errors.title= "enter a title";
    if(!values.txtSearch){
        errors.txtSearch = "Search for an artist, master, release or label";
    }
    return errors;
}

function mapStateToProps(state) {
    return {submittingPost : state.searching};
}

export default reduxForm({
    validate,
    form: 'SearchForm',
    initialValues: {searchOption:""}
})(
    connect(mapStateToProps, {fetchSearchResults, setSearch})(Search)
);