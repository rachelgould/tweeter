"use strict";

// We don't need to require MongoClient again because it's passing the whole db in from index.js

// Defines helper functions for saving and getting tweets, using the MongoDB database
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      console.log(newTweet);
      db.collection("tweets").insertOne(newTweet, (err, r) => {
        callback(err, r)
      })
    },

    // Get all tweets in `db`
    getTweets: function(callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
        callback(err, tweets); // There's a callback in tweets.js
      })
    }
  };
}
