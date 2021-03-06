import React, { Component } from 'react';
import '../css/Menu.css';
import Menu from "./Menu";
import {connect} from 'react-redux';
import axios from "axios/index";
import UserMiniInfo from './UserMiniInfo';
import UserSearch from './UserSearch';
import '../css/Search.css';
import Tops from './Tops';
const defaultAvatar = require('../resources/user.png');
const apiPath='http://localhost:8080/kursa4_war_exploded/rest';

var users =[];

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [
            ],
            founded: null
        };
        this.loadFromServer = this.loadFromServer.bind(this);
        this.loadFromServer();
        this.props.onLoadUsers();
    }

    loadFromServer() {
        axios.get(apiPath + '/user/top/100')
            .then((response) => {
                console.log(response.data);
                this.setState({users: response.data});
                //  resolve();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    search(){
        let login = document.getElementById('search').value;
        if(login.length === 0)return;
            console.log(login);
        axios.get(apiPath + '/user/' + login)
            .then((response) => {
                this.setState({founded: response.data});
                //  resolve();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    checkSearch(){
        let val = document.getElementById('search').value;
        if(val.length === 0){
            this.setState({founded: null});
        }
    }

    render(){
        var userslist = <div><h3>По вашему запросу ничего не найдено.</h3></div> ;
        if(this.state.founded !== null && this.state.founded !==''){
                let path, el = this.state.founded;
                if(typeof el.avatarpath !== 'undefined')
                    path="http://localhost:8080/"+el.login;
                else path=defaultAvatar;
                userslist = <UserMiniInfo login={el.login}
                                     email={el.email} rating={el.rating} avatar={path} />
        } else if(this.state.founded !== '')
        userslist = this.state.users.map((el, index) => {
            let path;
            if(typeof el.avatarpath !== 'undefined')
                path="http://localhost:8080/"+el.login;
            else path=defaultAvatar;
            return <UserMiniInfo key={index} login={el.login}
                                 email={el.email} rating={el.rating} avatar={path} />
        });
        return(
            <div>
                <Menu />
                <div>
                    <div className="userSearch">
                        <input type="search" name="" id="search"
                               placeholder="Поиск по пользователям" className="input" onChange={this.checkSearch.bind(this)} />
                        <input type="submit" name="" value="" className="submit" onClick={this.search.bind(this)}/>
                    </div>
                </div>
                <div className="flex-container">
                    <div className="usersList">
                        {userslist}
                    </div>
                    <Tops />
                </div>
            </div>
        )
    }
}


export default connect(
    state => ({
        uStore: state
    }),
    dispatch => ({
        onLoadUsers: () => {
            dispatch({type: 'LOAD_USERS', payload: users})
        }
    })
)(Users);
