import Relay from 'react-relay';

class RemoveUserMutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`
      mutation { removeUser }
    `;
  }

  getVariables() {
    return {
      id: this.props.user.id
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on RemoveUserPayload {
        deletedId
        viewer { users }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'users',
      deletedIDFieldName: 'deletedId'
    }];
  }
}

export default RemoveUserMutation;
