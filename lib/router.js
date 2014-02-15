Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { 
    return  [  
              Meteor.subscribe('notifications')
            ]; 
  }
});

PostsListController = RouteController.extend({
  template:     'postsList',
  increment:    5,
  limit:        function() {
                  return parseInt(this.params.postsLimit) || this.increment;
                },
  findOptions:  function() {
                  return {sort: {submitted: -1}, limit: this.limit()};
                },
  waitOn:       function() {
                  return Meteor.subscribe('posts', this.findOptions());
                },
  posts:        function() {
                  return Posts.find({}, this.findOptions());
                },
  data:         function() {
                  var hasMore = this.posts().fetch().length === this.limit();
                  var nextPath = this.route.path({postsLimit: this.limit() + this.increment});
                  return {
                    posts: this.posts(),
                    nextPath: hasMore ? nextPath : null
                  }
                }
});

Router.map(function() {
  // this.route('postsList', {
  //   path: '/'
  // }); //FOR POST LISTS

  this.route('postsList', {
    path: '/:postsLimit?',
    controller: PostsListController
  }); //FOR POST LISTS
  
  this.route('postPage', {
    path: '/posts/:_id',
    //now we are going to load the comments here at the route level
    waitOn: function() {
      return  [
        Meteor.subscribe('singlePost', this.params._id),
        Meteor.subscribe('comments', this.params._id)
      ];
    },
    data: function() { return Posts.findOne(this.params._id); } //MONGO DB query
  });

  //EDIT POSTS
  this.route('postEdit', {
    path: '/posts/:_id/edit',
    waitOn: function() {return Meteor.subscribe('singlePost', this.params._id)},
    data: function() { return Posts.findOne(this.params._id); }
  });

  //SUBMIT POSTS
  this.route('postSubmit', {
    path: '/submit',
    disableProgress: true
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
  Router.before(function() { clearErrors() });

});
