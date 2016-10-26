import Relay from 'react-relay';

class AddUserMutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`
      mutation { addUser }
    `;
  }

  getVariables() {
    return {
      name: this.props.name,
      address: this.props.address,
      email: this.props.email,
      status: this.props.status,
      age: this.props.age

    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddUserPayload {
        userEdge,
        viewer { users }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewerId,
      connectionName: 'users',
      edgeName: 'userEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }];
  }
}

export default AddUserMutation;
