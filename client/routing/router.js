Tracker.autorun(function() {
    console.log("Is allUserData ready?:", FlowRouter.subsReady("allUserCollections"));
    console.log("Is allMessages ready?:", FlowRouter.subsReady("currentMessages"));
    console.log("Is allRooms ready?:", FlowRouter.subsReady("currentRooms"));
    console.log("Is singleRoom ready?:", FlowRouter.subsReady("currentRoom"));
    console.log("Are all subscriptions ready?:", FlowRouter.subsReady());

});

FlowRouter.route( '/', {

    middlewares: [requiredLogin],

    subscriptions: function(params) {
        //this.register('currentMessages', Meteor.subscribe('messages', params._id));
        this.register('allUserCollections', Meteor.subscribe('allUserData'));
        this.register('currentMessages', Meteor.subscribe('allMessages'));
        this.register('currentRooms', Meteor.subscribe('allRooms'));
    },
    action: function() {
        console.log("Rendering / route layout");
        BlazeLayout.render( 'applicationRootLayout', {
            header: 'navHeader',
            sidebar: 'siteSidebar',
            main: 'main',
            footer: 'footer'
        });
    }
});

FlowRouter.route( '/login', {
    action: function() {
        console.log("Rendering splash");
        BlazeLayout.render( 'applicationRootLayout', {

            header: 'navHeader',
            sidebar: 'siteSidebar',
            main: 'splash',
            footer: 'footer'
        });
    }
});

FlowRouter.route( '/dashboard', {
    action: function() {
        console.log("Rendering splash");
        BlazeLayout.render( 'applicationRootLayout', {

            header: 'navHeader',
            sidebar: 'siteSidebar',
            main: 'main',
            footer: 'footer'
        });
    }
});


/***
 * lets design the triggers for the main / route group
 * */

function requiredLogin() {
    // context is the output of `FlowRouter.current()`
    console.log("trackRouteEntrySite now triggering preconditions..");
    if (Meteor.isClient){
        console.log("trackRouteEntrySite is client: user?" + Meteor.user());
        if (!!Meteor.user()) {
            console.log("trackRouteEntrySite User NOT logged in!");
            FlowRouter.go("/login");
        }

    }
    if (Meteor.isServer){
        console.log("trackRouteEntrySite is server");

    }
}

function trackRouteEntrySite() {
    // context is the output of `FlowRouter.current()`
    console.log("trackRouteEntrySite now triggering preconditions..");
    if (Meteor.isClient){
        console.log("trackRouteEntrySite is client: user?" + Meteor.user());
        if (Meteor.user()) {
            console.log("trackRouteEntrySite User logged in");
        }

    }
    if (Meteor.isServer){
        console.log("trackRouteEntrySite is server");

    }
}

function trackRouteCloseSite() {
    //Mixpanel.track("move-from-home", context.queryParams);

    console.log("trackRouteCloseSite now triggering postconditions..");
    if (Meteor.isClient){
        console.log("trackRouteCloseSite is client");

    }
    if (Meteor.isServer){
        console.log("trackRouteCloseSite is server");

    }
}
var rooms = FlowRouter.group({
    prefix: "/rooms",
    name: "rooms",
    subscriptions: function(params) {
        this.register('currentUsersData', Meteor.subscribe('allUserData', params._id));
        this.register('currentMessages', Meteor.subscribe('allMessages', params._id));
        this.register('currentRooms', Meteor.subscribe('allRooms', params._id));
    },
    triggersEnter: [trackRouteEntryRoom],
    triggersExit: [trackRouteCloseRoom]
});

// http://app.com/rooms
rooms.route( '/', {
    action: function( params, queryParams ) {
        console.log( "Route: /roooms/ = " + params);
        BlazeLayout.render( 'applicationRootLayout', {

            header: 'navHeader',
            sidebar: 'siteSidebar',
            main: 'roomlist',
            footer: 'footer'
        });
    }
});

// http://app.com/rooms/:_id
rooms.route( '/:roomId', {
    subscriptions: function(params) {

        console.log( "Subscribing to singleRoom Data with id "+ params.roomId);
        this.register('currentUsersData', Meteor.subscribe('allUserData', params._id));
        this.register('currentMessages', Meteor.subscribe('allMessages', params._id));
        this.register('currentRoom', Meteor.subscribe('singleRoom', params.roomId));

    },
    action: function (params, queryParams) {
        console.log( "Route: /:roomId = " + params.roomId);
        console.log("We're viewing a single room. Params: " + params.roomId + " Queryparams: " + queryParams.toString());
        console.log("Group name: "+FlowRouter.current().route.group.name);
        BlazeLayout.render('applicationRootLayout', {
            header: 'navHeader',
            sidebar: 'siteSidebar',
            main: 'room',
            footer: 'footer'
        });
    }
});

/***
 * lets design the triggers for the route
 * */

function trackRouteEntryRoom(context) {
    // context is the output of `FlowRouter.current()`
    console.log("trackRouteEntryRoom now triggering preconditions..");
    if (Meteor.isClient){
        // redirect("rooms/" + params._id );
        //Session.set("roomId", context.params.roomId);
    }
    if (Meteor.isServer){
        console.log("trackRouteEntryRoom is server");

    }
}

function trackRouteCloseRoom(context) {
    //Mixpanel.track("move-from-home", context.queryParams);

    console.log("trackRouteCloseRoom now triggering postconditions..");
    if (Meteor.isClient){
        console.log("trackRouteCloseRoom is client");
    }
    if (Meteor.isServer){
        console.log("trackRouteCloseRoom is server");

    }
}
/*
*
*       Profile Route
*
*
*
*
*
*
 */
var profile = FlowRouter.group({
    prefix: "/profile",
    name: "profile",

    triggersEnter: [trE_Profile],
    triggersExit: [trC_Profile]
});

//// http://app.com/rooms
profile.route( '/', {
    action: function( params, queryParams ) {
        console.log( params );
        console.log( queryParams );
        BlazeLayout.render( 'applicationRootLayout', {
            header: 'navTemplate',
            main: 'users',
            footer: 'footer'
        });
    }
});

// http://app.com/rooms/:_id
profile.route( '/:userId', {
    //subscriptions: function(params) {
    //    //this.register('currentMessages', Meteor.subscribe('messages', params.roomId));
    //    //this.register('currentRoom', Meteor.subscribe('singleRoom', params.roomId));
    //},
    action: function (params, queryParams) {
        console.log("We're viewing a single Profile. Params: " + params.userId + " Queryparams: " + queryParams.toString());
        console.log("Group name: "+FlowRouter.current().route.group.name);
        BlazeLayout.render('applicationRootLayout', {
            header: 'navHeader',
            sidebar: 'profileSidebar',
            main: 'profileMain',
            footer: 'footer'
        });
    }
});


/***
 * lets design the triggers for the route
 * */

function trE_Profile(context) {

    if (Meteor.isClient){


    }
    if (Meteor.isServer){


    }
}

function trC_Profile(context) {
    //Mixpanel.track("move-from-home", context.queryParams);


    if (Meteor.isClient){

    }
    if (Meteor.isServer){


    }
}

