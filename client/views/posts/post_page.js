// post_page.js

Template.postPage.helpers({
    comments: function() {
        return Comments.find({postId:this._id});
    },

    commentsCount: function() {
    return Comments.find({postId: this._id}).count();
  }
});