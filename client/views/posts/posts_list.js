Template.postsList.helpers({
//   posts: function() {
//     return Posts.find({}, {sort: {submitted: -1}});
//   }

    hasMorePosts: function() {
        this.posts.rewind();
        return Router.current().limit() == this.posts.fetch().length;
    }
});