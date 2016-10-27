/* eslint-disable no-unused-vars, no-use-before-define */
import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInputObjectType
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  cursorForObjectInConnection
} from 'graphql-relay';

import {
  Admin,
  getAdmin,
  User,
  getUser,
  getUsers,
  addUser,
  removeUser,
  editUser,
  filter
} from './database';


/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'Admin') {
      return getAdmin(id);
    } else if (type === 'User') {
      return getUser(id);
    }
    return null;
  },
  (obj) => {
    if (obj instanceof Admin) {
      return adminType;
    } else if (obj instanceof User) {
      return userType;
    }
    return null;
  }
);

/**
 * Define your own types here
 */

const orderParamType = new GraphQLInputObjectType({
  name: 'Order',
  fields: {
    field: { type: GraphQLString },
    direction: { type: GraphQLString },
    baseline: { type: GraphQLString }
  }
});

const matchParamType = new GraphQLInputObjectType({
  name: 'Match',
  fields: {
    age: { type: GraphQLInt },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    email: { type: GraphQLString },
    status: { type: GraphQLString }
  }
});


const adminType = new GraphQLObjectType({
  name: 'Admin',
  description: 'The administrator who uses the app',
  fields: () => ({
    id: globalIdField('Admin'),
    users: {
      description: 'User list',
      type: userConnection,
      args: {
        order: {
          type: orderParamType,
          defaultValue: {},
        },
        match: {
          type: matchParamType,
          defaultValue: {},
        },
        ...connectionArgs,
      },
      resolve: (_, { order, match, ...args }) => {
        let users;
        if (order.field && order.direction) {
          users = getUsers(order);
        } else users = getUsers();

        console.log('order', order, 'match', match);
        Object.keys(match).forEach((key) => {
          if (match[key] && match[key] !== '') users = filter(users, key, match[key]);
        });

        return connectionFromArray(users, args);
      }
    }
  }),
  interfaces: [nodeInterface]
});

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'The users that are managed',
  fields: () => ({
    id: globalIdField('User'),
    name: {
      type: GraphQLString,
      description: 'Users\'s name'
    },
    address: {
      type: GraphQLString,
      description: 'User\'s address'
    },
    email: {
      type: GraphQLString,
      description: 'Users\'s email'
    },
    age: {
      type: GraphQLInt,
      description: 'Users\'s age'
    },
    status: {
      type: GraphQLString,
      description: 'Users\'s current status'
    },
    image: {
      type: GraphQLString,
      description: 'Users\'s image url'
    }
  }),
  interfaces: [nodeInterface]
});

/**
 * Define your own connection types here
 */
const { connectionType: userConnection, edgeType: userEdge } = connectionDefinitions({ name: 'User', nodeType: userType });

/**
 * Create feature example
 */

const addUserMutation = mutationWithClientMutationId({
  name: 'AddUser',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    address: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    image: { type: new GraphQLNonNull(GraphQLString) }
  },

  outputFields: {
    userEdge: {
      type: userEdge,
      resolve: (obj) => {
        const cursorId = cursorForObjectInConnection(getUsers(), obj);
        return { node: obj, cursor: cursorId };
      }
    },
    viewer: {
      type: adminType,
      resolve: () => getAdmin(0)
    }
  },

  mutateAndGetPayload: ({ name, address, email, status, age, image }) => addUser(name, address, email, age, status, image)
});

const removeUserMutation = mutationWithClientMutationId({
  name: 'RemoveUser',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    viewer: {
      type: adminType,
      resolve: () => getAdmin(0)
    },
    deletedId: {
      type: GraphQLID,
      resolve: ({ id }) => id
    }
  },
  mutateAndGetPayload: ({ id }) => {
    const { id: usrID } = fromGlobalId(id);
    removeUser(usrID);
    return { id };
  },
});

const editUserMutation = mutationWithClientMutationId({
  name: 'EditUser',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    address: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) }
  },
  outputFields: {
    user: {
      type: userType,
      resolve: ({ usrID }) => getUser(usrID)
    }
  },
  mutateAndGetPayload: ({ id, name, address, email, status, age }) => {
    const { id: usrID } = fromGlobalId(id);

    editUser(usrID, name, address, email, status, age);
    return { usrID };
  },
});


/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    // Add your own root fields here
    viewer: {
      type: adminType,
      resolve: () => getAdmin(0)
    }
  })
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addUser: addUserMutation,
    removeUser: removeUserMutation,
    editUser: editUserMutation
    // Add your own mutations here
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
