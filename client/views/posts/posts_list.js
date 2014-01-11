<<<<<<< HEAD
// var postsData = [
//      {
//          title: 'Introducing Telescope',
//          author: 'Sacha Greif',
//          url: 'http://sachagreif.com/introducing-telescope/'
//      }, 
//      {
//          title: 'Meteor',
//          author: 'Tom Coleman',
//          url: 'http://meteor.com'
//      }, 
//      {
//          title: 'The Meteor Book',
//          author: 'Tom Coleman',
//          url: 'http://themeteorbook.com'
//      }
// ];

Template.postsList.helpers({
    posts: function() {
        return Posts.find();
    }
});
=======
Template.postsList.helpers({
  postsWithRank: function() {
    this.posts.rewind();
    return this.posts.map(function(post, index, cursor) {
      post._rank = index;
      return post;
    });
  },
  hasMorePosts: function(){
    this.posts.rewind();
    return Router.current().limit() == this.posts.fetch().length;
  }
});
>>>>>>> 97db48e8d1e0bf4a4abed9d1a0fd1d8a2b85e9ee
