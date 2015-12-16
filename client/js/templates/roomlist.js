/**
 * Created by ToixInHell on 05.12.2015.
 */
//roomlist TEMPLATE Configuration

    Template.roomlist.helpers({
    authInProcess: function() {
        return Meteor.loggingIn();
    },
    canShow: function() {
        return !!Meteor.user();
    },
    adminname: function(userId) {
        return Meteor.users.findOne(userId).username;
    },
    rooms: function () {

        var postRoomId = Session.get('selectedRoomId');
        if(postRoomId){
            console.log(postRoomId);
            return Rooms.find({roomname: {$regex:postRoomId, $options:'i'}},{sort: {created: -1}}).fetch();
        }
        return Rooms.find({},{sort: {created: -1}}).fetch();

    }
});

Template.roomlist.events({
    'click .enterRoom': function (e, t) {
        Rooms.update(this._id, {$push: {users: Meteor.userId()}});
         FlowRouter.go('/rooms/'+this._id);
    },
    'click .addRoom': function (e, t) {
        var el = document.getElementById("roomname");
         Meteor.call("addNewRoom", Meteor.userId(), el.value);
        return false;
    },
    'click .deleteRoom': function (e, t) {

         Meteor.call("deleteRoom", Meteor.userId(), this._id);
    },
    'keyup #roomSearchInput': function (e) {

    _filterRooms();

    },
    'click .filterUser': function (e) {

    _filterUsers();

    }

});


// Extracted functions for a message event
_filterUsers = function () {

    if(Session.get('filterUserState')) {
        Session.set('filterUserState', false);
    }
    Session.set('filterUserState', false);
};

// Extracted function for a message event
_filterRooms = function () {
    var postListId = document.getElementById("roomSearchInput");
    Session.set('selectedRoomId', postListId.value);
};

