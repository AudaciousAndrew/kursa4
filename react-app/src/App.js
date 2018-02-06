import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from './components/Menu';

class App extends Component{
  addTrack(){
    console.log('addTrack');
    this.props.onAddTrack(this.trackInput.value);
  }

  render(){
    return (
      <div>
        <Menu />
        home page
        <img src={require('/home/pavel/IdeaProjects/kursa4/react-app/src/181549.svg')} width='200px'/>
      </div>
    )
  }

}

export default connect(
  state => ({
    testStore: state
  }),
  dispatch => ({
    onAddTrack: (trackName) =>
      dispatch({ type: 'ADD_TRACK', payload: trackName})
  })
)(App);