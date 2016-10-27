import React from 'react';
import Relay from 'react-relay';

import 'normalize.css/normalize.css';
import 'react-mdl/extra/css/material.cyan-red.min.css';


import AddUser from '../User/AddUser';
import styles from './App.scss';


class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired,
    viewer: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.content}>
          <AddUser viewer={this.props.viewer} />
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Admin {
        id
      }`
  }
});


