import Relay from 'react-relay';

class RemoveUserMutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`
      mutation { removeUser }
    `;
  }

  getVariables() {
    return {
      id: this.props.userID
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

export default RemoveUserMutation;
