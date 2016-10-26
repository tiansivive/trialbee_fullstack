/* eslint-disable global-require */
import React from 'react';
import { Cell, Card, CardTitle, CardMedia, CardText, CardActions, Button } from 'react-mdl';
import styles from './User.scss';

export default class User extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired
  };

  render() {
    const usr = this.props.data;
    console.log(usr);
    return (
        <Card className={styles.card}>
          <CardMedia>
            <img src={usr.image} role='presentation' height='300' width='500' />
          </CardMedia>
          <CardTitle style={{background: url: }>{usr.name}</CardTitle>
          <CardText className={styles.description}>
            {usr.address}
          </CardText>
          <CardText className={styles.description}>
            {usr.email}
          </CardText>
          <CardText className={styles.description}>
            {usr.age}
          </CardText>
        </Card>

    );
  }
}
