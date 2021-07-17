// @ts-nocheck
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Dispatcher } from 'flux';
import { ReduceStore, Container } from 'flux/utils';

// Dispatcher
const dispatcher = new Dispatcher();

// Action
const act = {
  SEND: 'send'
};

const FormAction = {
  send(val) {
    console.log('action');

    dispatcher.dispatch({
      type: act.SEND,
      value: val
    });
  }
};

// Store
class FormStore extends ReduceStore {

  getInitialState() {
    console.log('store');
    return {
      'value': null // ...[1]
    };
  }

  reduce(state, action) {
    console.log('store2');
    switch (action.type) { // ...[7]
      case act.SEND:
        return {
          'value': action.value // ...[8]
        };
    }
  }

};

// Storeのインスタンス生成
const formStore = new FormStore(dispatcher);

// View (React Component)
class FormApp extends Component {
  static getStores() {
    console.log('view1');
    return [formStore]; // ...[9]
  }
  static calculateState(prevState) {
    console.log('view2');
    return formStore.getState(); // ...[10]
  }
  render() {
    console.log('view3');
    console.log(this.state);
    return (
      <div>
        <FormInput />
        <FormDisplay data={this.state.value} /> 
      </div>
    );
  }
};

class FormInput extends Component {
  _send(e) { // ...[4]
    e.preventDefault();
    // @ts-ignore
    FormAction.send(this.refs.myInput.value.trim()); // ...[5]
    this.refs.myInput.value = '';
    return;
  }
  render() {
    return (
      <form>
        <input type="text" ref="myInput" defaultValue="" /> 
        <button onClick={this._send.bind(this)}>Send</button> 
      </form>
    );
  }
};

class FormDisplay extends Component {
  render() {
    return (
      <div>{this.props.data}</div> /* ...[12] */
    );
  }
};

// Container
const FormAppContainer = Container.create(FormApp);


ReactDOM.render(
  <FormAppContainer />,
  document.getElementById('root')
);
