/**
 * Created by ToixInHell on 07.12.2015.
 */
Template.splash.helpers({
});

Template.splash.events({
    'click .enterSite': function (evt, tmpl) {
       FlowRouter.go('/');
    }
});