import React from 'react';
import Relay from 'react-relay';

import { Button } from 'react-mdl';
import Page from '../Page/Page';
import AddUserMutation from './AddUserMutation';


export default class AddUser extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  };

  state = {};

  onChange(e) {
    const obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }

  addUser() {
    const addUserMutation = new AddUserMutation({ viewerId: this.props.viewer.id, ...this.state });
    Relay.Store.commitUpdate(addUserMutation);
  }

  render() {
    return (
      <Page heading='Add a User'>
        <div>
          <input id='name' type='text' placeholder='Name' value={this.state.name} onChange={this.onChange.bind(this)} required />
          <input id='status' type='text' placeholder='Status' value={this.state.status} onChange={this.onChange.bind(this)} required />
          <input id='age' type='number' placeholder='Age' value={this.state.age} onChange={this.onChange.bind(this)} required />
          <input id='address' type='text' placeholder='Address' value={this.state.address} onChange={this.onChange.bind(this)} required />
          <input id='email' type='text' placeholder='Email' value={this.state.email} onChange={this.onChange.bind(this)} required />
          <input id='image' type='text' placeholder='Image URL' value={this.state.image} onChange={this.onChange.bind(this)} required />
          <Button raised onClick={this.addUser.bind(this)}>Add</Button>
        </div>
      </Page>
    );
  }
}
