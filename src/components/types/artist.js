/**
 * Created by Philip
 *              on 2017-06-29.
 */
import React, {Component} from 'react';
import {fetchInfoByType} from '../../actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import LoadingCircle from '../loading-circle';

class Artist extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        this.props.fetchInfoByType(id, "artist");
    }

    componentDidUpdate(){
        $(document).ready(function(){
            $('ul.tabs').tabs();
        });
    }

    render(){
        const {id} = this.props.match.params;
        let info = this.props.info[id];

        const content = info === undefined ? <LoadingCircle/> :
            <div className="row">
                <div className="col s10 offset-s1">
                    <div className="card hoverable">
                        <div className="card-image">
                            <img src={info.images[0].uri} alt={info.name}/>
                            <span className="card-title">{info.name}</span>
                        </div>
                        <div className="card-tabs">
                            <ul className="tabs tabs-fixed-width">
                                <li className="tab"><a href="#profile">Profile</a></li>
                                <li className="tab"><a href="#members">Members</a></li>
                                <li className="tab"><a href="#links">Links</a></li>
                            </ul>
                        </div>
                        <div className="card-content grey lighten-4">
                            <div id="profile" className="active">
                                {info.profile}
                            </div>
                            <div id="members">
                                {
                                    info.members === undefined ? "" :
                                        <div>
                                            {
                                                info.members.map(function (m) {
                                                    if (m.active)
                                                        return <p key={m.id}>{m.name}</p>;
                                                })
                                            }
                                        </div>

                                }
                            </div>
                            <div id="links">
                                {
                                    info.urls === undefined ? "" :
                                        info.urls.map(function (u) {
                                            return (
                                                <a href={u} key={u}>{u}<br/></a>
                                            );
                                        })
                                }
                            </div>
                        </div>
                        <div className="card-action">
                            <a href={info.uri} className="waves-effect waves-light btn">View on Discogs</a>
                            <Link className="left-space waves-effect waves-light btn" to={`../artistReleases/${info.id}`}>
                                View Releases
                            </Link>
                        </div>
                    </div>
                </div>
            </div>;

        return(
            <div className="">
                {content}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {info : state.searchByType};
}

//searchByType
export default connect(mapStateToProps, {fetchInfoByType})(Artist);