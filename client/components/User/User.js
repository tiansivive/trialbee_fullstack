/* eslint-disable global-require */
import React from 'react';
import Relay from 'react-relay';

import { Button } from 'react-mdl';
import styles from './User.scss';

import RemoveUserMutation from './RemoveUserMutation';
import EditUserMutation from './EditUserMutation';


export default class User extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired
  };

  state = {
    editing: false,
    editedUser: Object.assign({}, this.props.user)
  };

  onChange(e) {
    const obj = this.state.editedUser;
    obj[e.target.id] = e.target.value;
    this.setState({ editedUser: obj });
  }

  editUser() {
    const editUserMutation = new EditUserMutation({ user: this.props.user, data: this.state.editedUser });
    Relay.Store.commitUpdate(editUserMutation);
    this.setState({ editing: false });
  }

  removeUser() {
    const removeUserMutation = new RemoveUserMutation({ viewer: this.props.viewer, user: this.props.user });
    Relay.Store.commitUpdate(removeUserMutation);
  }

  toggleEdit() {
    if (this.state.editing) {
      this.setState({ editing: false });
    } else this.setState({ editing: true });
  }

  render() {
    const usr = this.props.user;

    return (
      <div className={styles.user}>
        <img src={usr.image} height='200' width='300' role='presentation' />
        <div className={styles.about}>
          <h1 className={styles.title}>
            { this.state.editing ?
              <input id='name' type='text' placeholder='Name' value={this.state.editedUser.name} onChange={this.onChange.bind(this)} required />
              : <span>{usr.name}</span>
            }
          </h1>
          <p className={styles.line}>Age:
            { this.state.editing ?
              <input id='age' type='number' placeholder='Age' value={this.state.editedUser.age} onChange={this.onChange.bind(this)} required />
              : <span> {usr.age}</span>
            }
          </p>
          <p className={styles.line}>Address:
            { this.state.editing ?
              <input id='address' type='text' placeholder='Address' value={this.state.editedUser.address} onChange={this.onChange.bind(this)} required />
              : <span> {usr.address}</span>
            }
          </p>
          <p className={styles.line}>Email:
            { this.state.editing ?
              <input id='email' type='text' placeholder='Email' value={this.state.editedUser.email} onChange={this.onChange.bind(this)} required />
              : <span> {usr.email}</span>
            }
          </p>
          <p className={styles.line}>Current Status:
            { this.state.editing ?
              <input id='status' type='text' placeholder='Status' value={this.state.editedUser.status} onChange={this.onChange.bind(this)} required />
              : <span> {usr.status}</span>
            }
          </p>
        </div>
        <div className={styles.actions}>
          { !this.state.editing ?
            <Button onClick={this.toggleEdit.bind(this)}>Edit</Button>
            : (
              <span>
                <Button onClick={this.toggleEdit.bind(this)}>Cancel</Button>
                <Button onClick={this.editUser.bind(this)}>Save</Button>
              </span>
            )
          }
          <Button onClick={this.removeUser.bind(this)}>Remove</Button>
        </div>
      </div>
    );
  }
}
