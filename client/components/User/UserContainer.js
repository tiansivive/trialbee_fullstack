import Relay from 'react-relay';
import User from './UserComponent';

export default Relay.createContainer(User, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Admin {
        id,
        users(first: 50) {
          edges {
            node {
              id
              name
              address
              email
              status
              age
            }
          }
        }
      }`
  }
});
