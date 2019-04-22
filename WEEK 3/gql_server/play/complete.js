var express = require('express');
var express_graphql = require('express-graphql');
var {buildSchema} = require('graphql');

// {buildSchema} will help macke the schema, it will be used to describe the api
// ie. what operations are available to query and how to access the data

//Graphql schema
//we will store the schema in variable mySchema
var mySchema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String!): [Course]
    }
    type Mutation {
        updateCourseTopic(id: Int!, topic: String!): Course
    }
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

var coursesData = [
    {
        id: 1,
        title: 'COMPLETE node.js DEVELOPER COURSE',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn node.js by building real world application ...',
        topic: 'node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: ' node.js, Express & mongodb DEV TO DEPLOYMENT',
        author: 'Brad Traversy',
        description: 'Learn by example building real world application ...',
        topic: 'node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    }
]

var getCourse = function(args) {
    var id = args.id;
    return coursesData.filter(course => course.id == id)[0];
};

var getCourses = function(args) {
    if(args.topic) {
        var topic = args.topic;
        return coursesData.filter(element => element.topic === topic);
    }
    else {
        return courseData;
    }
};

var updateCourseTopic = function({id, topic}) {
    coursesData.map(element => {
        if(element.id === id) {
            element.topic = topic;
            return topic;
        }
    });
    return coursesData.filter(element => element.id === id)[0];
}

//now we need to make a resolver to resolve the query
//it will be the root resolver
var root = {
    course: getCourse,
    courses: getCourses,
    updateCourseTopic: updateCourseTopic
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

app.listen(5000, () => console.log('express-graphql SERVER RUNNING ON PORT:5000'));


//QUERIES
/* query getSingleCourse($courseID: Int!) {
    course(id: $courseID) {
      title
      author
      description
      topic
      url
    }
  } */
//   {"courseID":1}


/* query getCoursesForTopic($courseTopic: String!) {
    courses(topic: $courseTopic) {
      title
      author
      description
      topic
      url
    }
  } */
//   {"courseTopic": "node.js"}

/* query getCoursesWithFragments($courseID1: Int!, $courseID2: Int!) {
	course1: course(id: $courseID1){
    ...courseFields
  }
  course2: course(id: $courseID2){
    ...courseFields
  }
}

fragment courseFields on Course {
  title
  author
  description
  topic
  url
} */

/* {
    "courseID1": 1,
    "courseID2": 2
  } */

 /*  mutation updateCourseTopic($id: Int!, $topic: String!) {
    updateCourseTopic(id: $id, topic: $topic){
      ...courseFields
    }
  } */
  /* 
  fragment courseFields on Course {
    title
    author
    description
    topic
    url
  } */