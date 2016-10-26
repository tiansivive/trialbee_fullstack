import React from 'react';
import Relay from 'react-relay';
import Dropdown from 'react-dropdown';
import { Grid, Cell, Button } from 'react-mdl';
import Page from '../Page/PageComponent';
import AddUserMutation from './AddUserMutation';

const options = [
  { value: 'none', label: 'Please select a user' },
  { value: 'Cersei', label: 'Cersei' },
  { value: 'Theon', label: 'Theon' },
  { value: 'Margaery', label: 'Margaery' },
];

const inputData = {
  Cersei: { name: 'Cersei', address: 'King\'s Landing', email: 'cersei@got.hbo', age: 39, status: 'Scheming and Manipulating' },
  html: { name: 'Theon', address: 'Boat', email: 'theon@got.hbo', age: 20, status: 'Invading Westeros' },
  css: { name: 'Margaery', address: 'Under the temple\'s rubble', email: 'margaery@got.hbo', age: 32, status: 'dead' }
};

export default class AddUser extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  };

  state = {
    form: {
      dropdown: options[0]
    }
  }

  onSelect = (e) => {
    this.setState({ form: { dropdown: e } });
  }

  addUser = () => {
    const value = this.state.form.dropdown.value;
    if (value === 'none') {
      return;
    }

    const addUserMutation = new AddUserMutation({ viewerId: this.props.viewer.id, ...inputData[value] });
    Relay.Store.commitUpdate(addUserMutation);
  }

  render() {
    return (
      <Page heading='Add a Feature'>
        <Grid>
          <Cell col={9}>
            <Dropdown options={options} onChange={this.onSelect.bind(this)} value={this.state.form.dropdown} />
          </Cell>
          <Cell col={3} style={{ textAlign: 'center' }}>
            <Button raised accent onClick={this.addUser.bind(this)}>Add User</Button>
          </Cell>
        </Grid>
      </Page>
    );
  }
}
