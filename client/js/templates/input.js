/**
 * Created by ToixInHell on 03.12.2015.
 */
    //INPUT TEMPLATE Configuration
    // we define the Events
Template.input.events({
    'click .sendMsg': function (e) {
        _sendMessage();
    },
    'keyup #msg': function (e) {
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