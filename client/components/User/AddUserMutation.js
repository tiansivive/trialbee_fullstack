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
      age: parseInt(this.props.age, 10),
      image: this.props.image
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
      parentID: this.props.viewer.id,
      connectionName: 'users',
      edgeName: 'userEdge',
      rangeBehaviors: {
        '': 'prepend',
      },
    }];
  }
}

export default AddUserMutation;
