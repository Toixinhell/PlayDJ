/**
 * Created by ToixInHell on 09.12.2015.
 */
Template.navHeader.helpers({

});
Template.navHeader.events({
    'click .enterProfile': function (e, t) {
        FlowRouter.go('/profile/'+Meteor.userId());
    },
    'click .enterRooms': function (e, t) {
        FlowRouter.go('/rooms/');
    },
    'click .enterHome': function (e, t) {
        FlowRouter.go('/');
    },
    'click .enterDashboard': function (e, t) {
        FlowRouter.go('/');
    }
});