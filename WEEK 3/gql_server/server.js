var express = require('express');
var expressGraphQL = require('express-graphql');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var {buildSchema} = require('graphql');

const app = express();
const PORT = process.env.PORT || "5000";
const db = "mongodb://localhost:27017/graphQL";

var mySchema = buildSchema(`
    type User {
    id: Int!
    name: String!
    email: String!
  }
  type Query {
    user(id: Int!): User
    users: [User]
  }
  type Mutation {
    addUser(id: Int!, name: String!, email: String!): User
    editUser(id: Int!, name: String!, email: String!): User
    deleteUser(id: Int!, name: String!, email: String!): User
  }
`);


  var user = (args) => {
    return new Promise((resolve, reject) => {
      User.findOne(args).exec((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  };

  var users = () => {
    return new Promise((resolve, reject) => {
      User.find({})
        .populate()
        .exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
    });
  };


  var addUser = ({ id, name, email }) => {
    const newUser = new User({ id, name, email });

    return new Promise((resolve, reject) => {
      newUser.save((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  };

  var editUser = ({ id, name, email }) => {
    return new Promise((resolve, reject) => {
      User.findOneAndUpdate({ id }, { $set: { name, email } }).exec(
        (err, res) => {
          err ? reject(err) : resolve(res);
        }
      );
    });
  };

  var deleteUser = (args) => {
    return new Promise((resolve, reject) => {
      User.findOneAndRemove(args).exec((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  };


var root = {
  user: user,
  users: users,
  addUser: addUser,
  editUser: editUser,
  deleteUser: deleteUser
};


// Connect to MongoDB with Mongoose.
mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => console.log("CONNECTED WITH mongoDB"))
  .catch(err => console.error(err));

app.use(
  "/api/v1/graphql",
  cors(),
  bodyParser.json(),
  expressGraphQL({
    schema: mySchema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(PORT, () => console.log(`SERVER IS RUNNING ON ${PORT}`));
