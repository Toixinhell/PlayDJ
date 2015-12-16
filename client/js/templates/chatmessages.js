/**
 * Created by ToixInHell on 03.12.2015.
 */
Template.chatMessages.helpers({
    chatMessages: function() {
        return Messages.find({room: Session.get("roomname")}, {sort: {ts: -1}});
    },
    roomname: function() {
        return Session.get("roomname");
    }
});


//INPUT TEMPLATE Configuration
// we define the Events
Template.chatMessages.events({
    'click .sendMsg': function (e) {
        _sendMessage();
    },
    'keyup #chatboxMessageInput': function (e) {
        if (e.type == "keyup" && e.which == 13) {
            _sendMessage();
        }
    }
});

// Extracted function for a message event
_sendMessage = function () {
    var el = document.getElementById("msg");
    Messages.insert({user: Meteor.user().username, msg: el.value, ts: new Date()});
    el.value = "";
    el.focus();
};