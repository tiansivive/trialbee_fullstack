import Relay from 'react-relay';

class EditUserMutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`
      mutation { editUser }
    `;
  }

  getVariables() {
    return {
      id: this.props.user.id,
      name: this.props.data.name,
      address: this.props.data.address,
      email: this.props.data.email,
      status: this.props.data.status,
      age: parseInt(this.props.data.age, 10)
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on EditUserPayload {
        user{
          name
          address
          email
          status
          age
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        user: this.props.user.id
      }
    }];
  }
}

export default EditUserMutation;
