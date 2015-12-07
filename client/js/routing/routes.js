var privateRoutes = FlowRouter.group({
    name: 'private',
    triggersEnter: [
        trackRouteEntrySite
    ],
    triggersExit: [trackRouteCloseSite]
})


privateRoutes.route( '/', {
    action: function() {
        BlazeLayout.render( 'applicationRootLayout', {
            header: 'navTemplate',
            main: 'splash',
            footer: 'footerTemplate'
        });
    }


});

/***
 * lets design the triggers for the main / route group
 * */

function trackRouteEntrySite() {
    // context is the output of `FlowRouter.current()`
    console.log("trackRouteEntrySite now triggering preconditions..");
    if (Meteor.isClient){
        console.log("trackRouteEntrySite is client");
        if (Meteor.user()) {
            console.log("trackRouteEntrySite User logged in");
            FlowRouter.go('/rooms');
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
var rooms = privateRoutes.group({
    prefix: "/rooms",
    name: "rooms",
    subscriptions: function(params) {
        console.log( "Subscribing to room Data");
        this.register('currentMessages', Meteor.subscribe('messages', params._id));
        this.register('currentRooms', Meteor.subscribe('rooms', params._id));

    },
    triggersEnter: [trackRouteEntryRoom],
    triggersExit: [trackRouteCloseRoom]
});

// http://app.com/rooms
rooms.route( '/', {
    action: function( params, queryParams ) {
        console.log( params );
        console.log( queryParams );

        BlazeLayout.render( 'applicationRootLayout', {
            header: 'navTemplate',
            main: 'roomlist',
            footer: 'footerTemplate'
        });
    }
});

// http://app.com/rooms/:_id
rooms.route( '/:roomId', {
    action: function (params, queryParams) {
        console.log("We're viewing a single room. Params: " + params.roomId + " Queryparams: " + queryParams.toString());
        console.log("Group name: "+FlowRouter.current().route.group.name);
        BlazeLayout.render('applicationRootLayout', {
            header: 'navTemplate',
            //sidebar: 'sidebarTemplate',
            main: 'main'
            //footer: 'footerTemplate'
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
        Session.set("roomId", context.params.roomId);
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