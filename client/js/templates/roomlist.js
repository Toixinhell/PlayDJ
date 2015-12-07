/**
 * Created by ToixInHell on 05.12.2015.
 */
//VIDEOLIST TEMPLATE Configuration
Template.roomlist.helpers({
    rooms: function () {
        console.log("fetching Rooms from roomlist");
        return Rooms.find().fetch();
    }
});
Template.roomlist.events({
    'click .enterRoom': function (e, t) {
        Meteor.call("addUserToRoom",this._id,  Meteor.userId());
        console.log("enter Room: " + this._id);
        console.log("client: setting Room Session for u to: " + this._id);
        Session.set('roomId', this._id);

        FlowRouter.go('rooms/'+this._id);
    }
});