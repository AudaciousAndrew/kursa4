import React, { Component } from 'react';
import Menu from './Menu';
import '../css/SignUp.css';

class RegistrationForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      login: '',
      password: '',
      passwordConf: '',
      error: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfChange = this.handlePasswordConfChange.bind(this);
    this.checkFields = this.checkFields.bind(this);
    this.emailCheck = this.emailCheck.bind(this);
    this.loginCheck = this.loginCheck.bind(this);
    this.passwordCheck = this.passwordCheck.bind(this);
  }

  emailCheck(){
    var res = false;
    let cnt = 0;
    for(var i=0; i < this.state.email.length; i++){
      if(this.state.email[i] === '@')cnt++;
    }
    if(cnt === 1)res = true;
    if (/[^0-9a-zA-z\-_@.]/.test(this.state.email)) res = false;
    return res;
  }

  loginCheck(){
      if (/[^0-9a-zA-z\-_а-яА-я.]/.test(this.state.login)) return false;
      return true;
  }

  passwordCheck(){
    if(this.state.password !== this.state.passwordConf) return false;
    return true;
  }

  checkFields(){
    this.setState({error: ''});
    if(!this.emailCheck()){
      this.setState({error: 'Неверный email'});
      return false;
    }
    if(this.state.login.length < 3 || this.state.login.length > 20){
      this.setState({error: 'Длина логина должна быть от 3 до 20 символов'});
      return false;
    }
    if(!this.loginCheck()){
      this.setState({error: 'Неверный логин'});
      return false;
    }
    if(this.state.password.length < 3 || this.state.password.length > 20){
      this.setState({error: 'Длина пароля должна быть от 3 до 20 символов'});
      return false;
    }
    if(!this.passwordCheck()){
      this.setState({error: 'Пароли не совпадают'});
      return false;
    }
    return true;
  }

  handleSubmit(event){
    event.preventDefault();
    let test = this.checkFields();
    if (!test){
      console.log('not submitted')
      return;
    }
    console.log('submitted');
    this.props.history.push("/regsuccess");
  }

  handleEmailChange(event){
    this.setState({ email: event.target.value});
  }

  handleLoginChange(event){
    this.setState({ login: event.target.value});
  }

  handlePasswordChange(event){
    this.setState({ password: event.target.value});
  }

  handlePasswordConfChange(event){
    this.setState({ passwordConf: event.target.value});
  }

  render(){
    return (
      <div>
        <Menu />
        <div className="mainContainer">
          <form className="mainForm" onSubmit={this.handleSubmit}>
          <h2>Регистрация</h2>
          <div className="container">
            <input
              type="text"
              id="Email"
              placeholder="E-mail"
              value={this.state.email}
              onChange={this.handleEmailChange}
              className="floatLabel"
            />
            <input
              type="text"
              placeholder="Логин"
              value={this.state.login}
              onChange={this.handleLoginChange}
              className="floatLabel"
            />
            <input
              type="password"
              placeholder="Пароль"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              className="floatLabel"
            />
            <input
              type="password"
              placeholder="Повторите пароль"
              value={this.state.passwordConf}
              onChange={this.handlePasswordConfChange}
              className="floatLabel"
            />
            <div className="error"> <h3>{this.state.error}</h3> </div>
        		<input type="submit" value="Создать аккаунт" id="submit" onClick={this.handleSubmit}/>
            <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
          </div>
          </form>
        </div>
      </div>
    )
  }

}

export default RegistrationForm;
