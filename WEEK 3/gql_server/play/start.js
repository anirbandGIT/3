var express = require('express');
var express_graphql = require('express-graphql');
var {buildSchema} = require('graphql');
// {buildSchema} will help macke the schema, it will be used to describe the api
// ie. what operations are available to query and how to access the data

//Graphql schema
//we will store the schema in variable mySchema
var mySchema = buildSchema(`
    type Query {
        message: String
    }
`);

//now we need to make a resolver to resolve the query
//it will be the root resolver
var root = {
    message: () => 'Hello Graphql'
};

// Create an express and graphql endpoint
var app = express();
// getting back the instance of express server
app.use('/api/v1/graphql',express_graphql({
    schema: mySchema,
    rootValue: root,
    graphiql: true
}))
// above we attach the express graphql middleware

app.listen(5000, () => console.log('Express-graphql server running on port:5000'));