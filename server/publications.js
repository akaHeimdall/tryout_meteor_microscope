<<<<<<< HEAD
Meteor.publish('posts', function() {
    return Posts.find();
=======
Meteor.publish('posts', function(options) {
  return Posts.find({}, options);
});

Meteor.publish('singlePost', function(id) {
  return id && Posts.find(id);
});


Meteor.publish('comments', function(postId) {
  return Comments.find({postId: postId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
>>>>>>> 97db48e8d1e0bf4a4abed9d1a0fd1d8a2b85e9ee
});