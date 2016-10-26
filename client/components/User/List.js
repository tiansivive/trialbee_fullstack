/* eslint-disable global-require */
import React from 'react';
import Relay from 'react-relay';

import User from './User';
import Page from '../Page/Page';

import styles from './List.scss';


class List extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  };

  render() {
    const arr = this.props.viewer.users.edges.map((edge) => {
      const usr = edge.node;
      try {
        usr.image = require(`../../assets/${usr.name.toLowerCase()}.png`);
      } catch (e) {
        usr.image = 'http://cdn.playbuzz.com/cdn/30021037-fba5-48e2-882d-a1aa8556e630/0861e162-3adb-4a10-bba7-f9d761694770.png';
      }

      return (
        <User key={usr.id} viewer={this.props.viewer} user={usr} />
      );
    });

    return (
      <Page heading='Users'>
        <ul className={styles.list}>{arr}</ul>
      </Page>
    );
  }
}

export default Relay.createContainer(List, {
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

