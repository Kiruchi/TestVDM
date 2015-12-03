var frisby = require('frisby');

// Frisby is a REST API Unit Testing library

// Test the API's posts endpoint
frisby.create('Test posts')
    .get('http://localhost:8080/api/posts')
    // Test the API is working
    .expectStatus(200)
    // Test the API sends a JSON
    .expectHeaderContains('content-type', 'application/json')
    // Test we have a well-formed JSON
    .expectJSONTypes({
        posts: Array,
        count: Number
    })
    // Test posts are well-formed as well
    .expectJSONTypes({
        posts: [{
            id: Number,
            content: String,
            date: String,
            author: String
        }]
    })
    // Test we have 200 posts
    .expectJSON({count: 200})
    .toss();

// Test the API's posts/:id endpoint
frisby.create('Test posts/:id')
    .get('http://localhost:8080/api/posts/1')
    // Test the API is working
    .expectStatus(200)
    // Test the API sends a JSON
    .expectHeaderContains('content-type', 'application/json')
    // Test we have a well-formed JSON
    .expectJSONTypes({
        posts: Array,
        count: Number
    })
    // Test posts are well-formed as well
    .expectJSONTypes({
        posts: [{
            id: Number,
            content: String,
            date: String,
            author: String
        }]
    })
    // Test we have 1 post
    .expectJSON({count: 1})
    .toss();
