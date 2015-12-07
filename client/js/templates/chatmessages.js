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
Template.chatMessage.helpers({
    timestamp: function() {
        return this.ts.toLocaleString();
    }
});