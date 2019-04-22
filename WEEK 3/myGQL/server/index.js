const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./graphQL.schema');

const app = express();
// now we can use the app

app.use('/graphql', expressGraphQL({
    schema:schema,
    graphiql:true
    // graphiql is set to true to run the graphiql server
}));

app.listen(4000, () => {
    console.log('GRAPHQL SERVER ON PORT: 4000');
});