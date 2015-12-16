/**
 * Created by ToixInHell on 08.12.2015.
 */


Template.users.helpers({
    users: function () {
        var postListId = Session.get('selectedUserId');

        if(postListId){
            console.log(postListId);
            return Meteor.users.find({username: {$regex:postListId, $options:'i'}}).fetch();
        }
         return Meteor.users.find().fetch();
    }
});


Template.users.events({

    'click .filterUsers': function (e) {
        _filterUsers();
    },
    'click .resetFilerts': function (e) {
        Session.set('selectedUserId', "");
    },
    'keyup #userSearchInput': function (e) {

            _filterUsers();

    }

});
// Extracted function for a message event
_filterUsers = function () {
    var postListId = document.getElementById("userSearchInput");
    Session.set('selectedUserId', postListId.value);
};