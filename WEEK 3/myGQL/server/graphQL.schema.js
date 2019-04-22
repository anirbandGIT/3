const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

// Customer Type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    // in the schema we are using GraphQLString for string and GraphQLInt for integer
    fields: () => ({
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
    })
});


/**
 * GraphQL schema define root types for each type of operation. These types are
 * the same as any other type and can be named in any manner, however there is
 * a common naming convention:
 *
 *   schema {
 *     query: Query
 *     mutation: Mutation
 *   }
 *
 * When using this naming convention, the schema description can be omitted.
 */

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

        // this query is for fetch select data
        // we may remove the name or age and query
        // then we can navigate to http://localhost:3000/customers/2 to fetch json
        // here / args.id = 2

        // {
        //     customer(id:"2") {
        //       name,
        //       age,
        //       email,
        //       id
        //         }
        //     }

        customer: {
            type: CustomerType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(parentValue, args) {
                return axios.get('http://localhost:3000/customers/' + args.id)
                    .then(res => res.data);

            }
        },

        // this query is for fetch all data
        // we may remove the name or age and the query all
        // then we can navigate to http://localhost:3000/customers to fetch json

        // {
        //     customers {
        //       name,
        //       age,
        //       email,
        //       id
        //         }
        //     }

        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args) {
                return axios.get('http://localhost:3000/customers')
                    .then(res => res.data);
            }
        }
    }
});

// MUTATIONS
// except query all and selective query all are observables
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // this is CREATE mutation

        // mutation {
            // id is needed as we mentioned id
        //     addCustomer (id: "3", name: "Peter Parker", email: "peter.parker@gmail.com", age: 25  )
        //       {
        //     id,
        //     name,
        //     email
        // we can give age also
        //   }
            
        //   }

        addCustomer: {
            type: CustomerType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                email: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                age: {
                    type: new GraphQLNonNull(GraphQLInt)
                },
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parentValue, args) {
                return axios.post('http://localhost:3000/customers', {
                    // this is the body
                        name: args.name,
                        email: args.email,
                        age: args.age,
                        id: args.id
                    })
                    .then(res => res.data);
            }
        },
        // this is DELETE mutation

        // mutation {
        //     deleteCustomer (id: "3") {
        //     id
        //   }
            
        //   }

        // the id returned will be null indication of delete
        deleteCustomer: {
            type: CustomerType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parentValue, args) {
                return axios.delete('http://localhost:3000/customers/' + args.id)
                    .then(res => res.data);
            }
        },
        // this is EDIT mutation

        // mutation {
        //     editCustomer (id: "1", age: 24) {
        //     id,
        //       name,
        //     age
        //   }
            
        //   }

        // age will be changed as needed
        editCustomer: {
            type: CustomerType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                name: {
                    type: GraphQLString
                },
                email: {
                    type: GraphQLString
                },
                age: {
                    type: GraphQLInt
                }
            },
            resolve(parentValue, args) {
                return axios.patch('http://localhost:3000/customers/' + args.id, args)
                    .then(res => res.data);
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});