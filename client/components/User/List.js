/* eslint-disable global-require */
import React from 'react';
import Relay from 'react-relay';
import { Grid } from 'react-mdl';

import User from './User';
import Page from '../Page/Page';


class List extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  };

  render() {
    const arr = this.props.viewer.users.edges.map((edge) => {
      const usr = edge.node;
      usr.image = require(`../../assets/${usr.name.toLowerCase()}.png`);
      return (
        <User key={usr.id} data={usr} />
      );
    });

    return (
      <Page heading='Users'>
        <Grid>{arr}</Grid>
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

