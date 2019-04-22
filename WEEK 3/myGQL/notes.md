What is REST?

REST (Representational State Transfer) is an Architectural Style that defines a set of constraints to be used for creating web services to send data over HTTP (Hypertext Transfer Protocol). REST is the successor of SOAP (Simple Object Access Protocol). As the current standard, REST architecture has many downfalls and some developers are switching to a modern architecture deveoped by Facebook: GraphQL.

What Is GraphQL?

GraphQL (Graph Query Language) is an open source data Query and Manipulation Language built on using the Graph Data Structure. GraphQL can be used to Query from an API and/or Database. GraphQL has 3 pimary operations:

Query: Read data.
Mutation: Write data.
Subscription: Observe Event and automatically send data

Unlike REST, GraphQL contains a schema, so the developer can extract the exact data he or she needs (See Advantage #1). This can result in performance benefits as well writing less code. Additionally, REST architecture uses GET, POST, PUT, DELETE, and etc. to query or modify data. GraphQL does these actions, but in a different way using Queries and Mutations. Although this difference isn’t really advantageous, it’s notably worth mentioning.

What Are The Advantages Of Using GraphQL?
Note: Examples to outline the GraphQL advantages will be used using Apollo Client (Apollo-Client/Apollo-Boost/React-Apollo) and Apollo Server (Apollo-Server/Apollo-Server-Express).

1. Efficiency (Over-Fetching And Under-Fetching Data)
GraphQL solves REST’s efficiency problem by migitating Over-fetching (Response contained too much data) and Under-fetching (Response didn’t contain enough data and another request has to be made). You either use more bandwidth than you should or you’re making more HTTP requests that you should.

In this example, we will be make an HTTP request to fetch an Author by ID and the books the Author has written. I mentioned previously that GraphQL can be used to query an API and/or Database, but we will be fetching data from the server to an API for this example. In this example, we will be fetching data on the author “Stephen King” (ID: 100) and his book “The Green Mile” (ID: 20). The data we want to fetch the following three pieces of data:

Author’s first name
Book Title
Book Price
Example #1: REST (POST Request)
To use the REST architecture, this would take two REST API Endpoints: One for the book and one for the Author.

https://www.example.com/api/author/id/100/
https://www.example.com/api/book/id/20/
Endpoint #1: REST (Data Returned)
{
  "id": "100",
  "firstName": "Stephen",
  "lastName": "King",
}
Endpoint #2: REST (Data Returned)
{
  "id": 20
  "title": "The Green Mile"
  "publishedDate": "1996"
  "price": "$2.99"
  "genre": "Drama/Fantasy"
}
Now if look back to what we outlined as our original criteria, we only needed our three pieces of data: Author’s first name, Book Title, and Book Price.

If we only made a POST request with the ID “100” to the Endpoint #1, we would be underfetching becuase we wouldn’t have retrieved the Book data. So to get all of the data, we hit both endpoint #1 and #2, but now we are faced with the performance issue of Over-fetching data.

All the data we needed for the three pieces of data we originally needed, but now have this extra data we didn’t need. This extra data takes up bandwidth and with a larger application with millions of API requests a day, bandwidth can add up quickly and become costly.

Example #2: GraphQL (Query)
GraphQL is superior such that we can explicitly request which data we want with one single request.

{
  author(id: 100) {
    firstName
    books {
      title
      price
    }
  }
}
Example #2: GraphQL (Data Returned)
The data returned is exactly what we wanted with no Over-fetching and no Under-fetching, solving that performance issue issue that could lead to heavy financial impacts on a popular application. Note: GraphQL returns data queries on a “Data” Object.

{
  "data" {
    "firstName": "Stephen",
    "books" {
      "title": "The Green Mile"
      "price": "$2.99"
    }
  }
}
2. Introspection
This gif (Credit: Website) demonstrates how the developer can view the available data before the request has been made.


Introspection is an optional feature, enabled by default, which allows clients (Usually developers) to navigate into the Types (TypeDefs) and discover the schema. This allows the Developer to see exactly what her or she can query, which is done through a GraphQL IDE (Integrated Development Environment). Developers can easily add new fields to existing queries because they can see exactly how the data is setup. A GraphQL IDE runs in the browser, where the developer can also run Queries and Mutations (POST, GET, PUT, DELETE). Two popular GraphQL IDEs are:

GraphQLPlayground (Github Repo)
GraphiQL (Github Repo)
I started off using GraphiQL because that’s what Apollo-Server-Express 1.0 was using, but since then, I’ve upgraded to Apollo-Server-Express 2.0 and I’ve migrated to GraphQLPlayground. So far I prefer GraphQLPlayground, in which it has some advantages over GraphiQL. If you’re in thinking about migrating your web application from 1.0 to 2.0, I’ve also written and in-depth article on migrating that can be found here.

3. Data Typing
Data typing in REST is weak and isn’t always consistently structured. You just don’t know what you’re going to get nor do you know what the data types of the returned data will be. GraphQL has an advantage over REST due to Types (TypeDefs). Types are a requirement for the Schema along with Resolvers. Types define the model and the data types, which we will have 2 types for our example: Book and Author. We define our types, the values in them, and the exact data types those values require. The data is much more predictable for the developer to know exactly what data the returned data will look like.

Additionally, can even add “!” at the end of our data types to make it a required field. For example, say we wanted to do a GraphQL Mutation (REST POST Request) to add a book into our database. The GraphQL Mutation wouldn’t execute since the requirement wasn’t met.

Note: There are two things to point out in the the types we setup:

Our Book type has a key “author” and the value “Author.” Since we’ve defined Author, our Book type will be able to use the Author type when necessary and return the Author data when querying for Books.
The Second thing to point out in on our Author type. Author has a key “books” and the value “Book.” It’s similar to how we linked the two types in the Book type, but we’ve wrapped it in [ ] brackets. The [ ] brackets signifies that key books has a value of an array and each element will use the book type.
typeDefs.js
// Imports: GraphQL
import { gql } from 'apollo-server-express';

// GraphQL: TypeDefs
const typeDefs = gql`
  type Query {
    type Book {
      id: ID
      title: String!
      published: Date!
      price: String!
      author: Author!
    }
    type Author {
      id: ID
      firstName: String!
      lastName: String!
      books: [Book]!
    }
  }
`
// Exports
export default typeDefs;
3. Shared Definition
One of the issues with REST architecture is that most people know how a REST API works for example, but aren't actually familar with the REST constraints. The constraints were set by one of the authors of the HTTP specification, Roy Thomas Fielding, in which he set 6 requirements for REST:

Uniform Interface
Client–Server
Stateless
Cacheable
Layered System
Code On Demand (Optional)
You’ve probably have written or used a REST API, but these 6 constraints and the name Roy Thomas Fielding doesn’t sound familiar. You’re not alone. If you were to ask 20 people what a REST API is, you will probably get 20 answers that share similarities, but also share differences. REST architecture doesn’t necessarily have a shared definition amongst developers.

On the contrary, GraphQL shares an identical definition format in all applications. The data model and data types are setup using a GraphQL Schema, Types (TypeDefs), and Resolvers.

4. Subscriptions
In addition to the Queries and Mutations, GraphQL brings a third operation to the table: Subscriptions. GraphQL subscriptions are a way to push data from the server to the clients that choose to listen to real time messages from the server. This gif (Credit: Github Repo) demonstrates well how data updated in real-time (When user clicks Broadcast in this example gif) using subscriptions:


Subscriptions are similar to queries in that they specify a set of data fields to be delivered to the client, but instead of recieving data once like in an ordinary Query, a result is sent every time a particular event happens on the server. Here are some example uses for subscriptions:

Automatically send notification to client when new comment is added.
Automatically send notification to client when new direct message is recieved.
Automatically send new data to shared grocery list to client when new data is added.
5. Conceptual Model (Not An Advantage, But A Comparison)
REST: Made up of Resources (Files).
GraphQL: Made up of up of Graphs. If you’re not familar with the data structure, Graphs are comprised of Nodes. These Nodes can possibly contain related information, which connect to each other or as it’s formally called an Edge in the Graph Data Structure.