Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('posts'); }
});

Router.map(function() {
  this.route('postsList', {
    path: '/'
  }); //FOR POST LISTS
  
  this.route('postPage', {
    path: '/posts/:_id',
    data: function() { return Posts.findOne(this.params._id); } //MONGO DB query
  });

  //EDIT POSTS
  this.route('postEdit', {
    path: '/posts/:_id/edit',
    data: function() { return Posts.findOne(this.params._id); }
  });

  //SUBMIT POSTS
  this.route('postSubmit', {
    path: '/submit'
  });

  var requireLogin = function() {
    if ( ! Meteor.user()) {
        if (Meteor.logginIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
        this.stop();
    }
  }
    
  Router.before(requireLogin, {only: 'postSubmit'});
  Router.before(function() { Errors.clearSeen() });

});
