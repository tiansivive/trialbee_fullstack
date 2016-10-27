/* eslint-disable global-require */
import React from 'react';
import Relay from 'react-relay';
import Dropdown from 'react-dropdown';

import User from './User';
import Page from '../Page/Page';

import styles from './List.scss';



const limitOpts = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 50, label: '50' }
];


class List extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired,
    relay: React.PropTypes.object.isRequired,
  };

  state = {
    order: {
      field: 'age',
      direction: 'ASC'
    },
    match: {
      name: '',
      address: '',
      email: '',
      status: '',
      age: ''
    },
    limit: 10
  };

  onChangeMatchPattern(e) {
    const obj = this.props.relay.variables.match;
    obj[e.target.id] = e.target.value;
    this.props.relay.setVariables({
      match: obj
    });
  }

  onSelectLimit(e) {
    this.props.relay.setVariables({
      limit: e.value
    });
  }

  onSelectOrderField(e) {
    const obj = this.state.order;
    obj.field = e.value;
    this.setState({ order: obj });
  }

  onSelectOrderDirection(e) {
    const obj = this.state.order;
    obj.direction = e.value;
    this.setState({ order: obj });
  }

  commitFilterChanges() {
    this.props.relay.setVariables({
      match: this.state.match,
      limit: this.state.limit,
      order: this.state.order
    });
  }

  render() {
    const arr = this.props.viewer.users.edges.map((edge) => {
      const usr = edge.node;
      if (!usr.image) {
        try {
          usr.image = require(`../../assets/${usr.name.toLowerCase()}.png`);
        } catch (e) {
          usr.image = 'http://cdn.playbuzz.com/cdn/30021037-fba5-48e2-882d-a1aa8556e630/0861e162-3adb-4a10-bba7-f9d761694770.png';
        }
      }

      return (
        <User key={usr.id} viewer={this.props.viewer} user={usr} />
      );
    });

    const vars = this.props.relay.variables;
    const fields = Object.keys(vars.match).map((key) => {
      let type = 'text';
      if (key === 'age') type = 'number';
      return <li key={key}><input id={key} type={type} placeholder={key} value={this.state.match[key]} onChange={this.onChangeMatchPattern.bind(this)} /></li>;
    }, this);

    return (
      <Page heading='Users'>
        <div>
          <div className={styles.filters}>
            <span>Limit: </span>
            <Dropdown options={limitOpts} onChange={this.onSelectLimit.bind(this)} value={{ value: this.state.limit, label: this.state.limit }} />
          </div>
          <ul className={styles.list}>{arr}</ul>
        </div>
      </Page>
    );
  }
}

export default Relay.createContainer(List, {

  initialVariables: {
    order: {
      field: 'age',
      direction: 'ASC'
    },
    match: {
      name: '',
      address: '',
      email: '',
      status: '',
      age: undefined
    },
    limit: 10
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Admin {
        id,
        users(first: $limit, order: $order, match: $match) {
          edges {
            node {
              id
              name
              address
              email
              status
              age
              image
            }
            cursor
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
        }
      }`
  }
});

