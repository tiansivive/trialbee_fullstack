/* eslint-disable global-require */
import React from 'react';
import { Button } from 'react-mdl';
import styles from './User.scss';

export default class User extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired
  };

  render() {
    const usr = this.props.data;

    return (
      <div className={styles.user}>
        <img src={usr.image} height='200' width='300' role='presentation' />
        <div className={styles.about}>
          <h1 className={styles.title}>
            <span>{usr.name}</span>
          </h1>
          <p className={styles.line}>Age:
            <span>{usr.age}</span>
          </p>
          <p className={styles.line}>Address:
            <span>{usr.address}</span>
          </p>
          <p className={styles.line}>Email:
            <span>{usr.email}</span>
          </p>
          <p className={styles.line}>Current Status:
            <span>{usr.status}</span>
          </p>
        </div>
        <div className={styles.actions}>
          <Button>Edit</Button>
          <Button>Remove</Button>
        </div>
      </div>
    );
  }
}
