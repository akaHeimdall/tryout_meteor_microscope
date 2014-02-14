Template.postSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var post = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val(),
            message: $(e.target).find('[name=message]').val(),
        }

        Meteor.call('post', post, function(error, id) {
            if (error) {
                // return alert(error.reason);
                // diplay error to user
                throwError(error.reason);

                // and if duplicate send to that page to edit
                // shouldn't this be cased if has permissions?
                if (error.error === 302) {
                    Router.go('postPage', {_id: error.details})
                }   else    {
                    Router.go('postPage', {_id: id});
                }
            }
            
            // post._id = Posts.insert(post);
            Router.go('postPage', { _id: id});    
        });
        
    }
});