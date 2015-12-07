Accounts.onLogin(function() {
    var path = FlowRouter.current().path;
    // we only do it if the user is in the login page
    if(path === "/login"){
        FlowRouter.go("/");
    }
    else {
        FlowRouter.go("/");
    }
});

var privateRoutes = FlowRouter.group({
    name: 'private',
    triggersEnter: [trackRouteEntrySite],
    triggersExit: [trackRouteCloseSite]
})


privateRoutes.route( '/', {
    subscriptions: function(params) {
        console.log( "Subscribing to room Data");
        //this.register('currentMessages', Meteor.subscribe('messages', params._id));
        this.register('currentMessages', Meteor.subscribe('allMessages', params._id));
        this.register('currentRooms', Meteor.subscribe('allRooms', params._id));
    },
    action: function() {
        console.log("Rendering splash");
        BlazeLayout.render( 'applicationRootLayout', {
            header: 'navTemplate',
            main: 'main',
            footer: 'fotterTemplae'
        });
    }
});

privateRoutes.route( '/login', {
    action: function() {
        console.log("Rendering splash");
        BlazeLayout.render( 'applicationRootLayout', {
            header: 'navTemplate',
            main: 'splash',
            footer: 'fotterTemplae'
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
        console.log("trackRouteEntrySite is client: user?" + Meteor.user());
        if (Meteor.user()) {
            console.log("trackRouteEntrySite User logged in");
        }
        else {
            FlowRouter.go("/login");
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
        this.register('currentMessages', Meteor.subscribe('allMessages', params._id));
        this.register('currentRooms', Meteor.subscribe('allRooms', params._id));
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
    subscriptions: function(params) {
        console.log( "Route: /:roomId = " + params.roomId);
        console.log( "Subscribing to singleRoom Data with id "+ params.roomId);
        //this.register('currentMessages', Meteor.subscribe('messages', params.roomId));
        //this.register('currentRoom', Meteor.subscribe('singleRoom', params.roomId));
    },
    action: function (params, queryParams) {
        console.log("We're viewing a single room. Params: " + params.roomId + " Queryparams: " + queryParams.toString());
        console.log("Group name: "+FlowRouter.current().route.group.name);
        BlazeLayout.render('applicationRootLayout', {
            header: 'navTemplate',
            //sidebar: 'sidebarTemplate',
            main: 'room',
            footer: 'footerTemplate'
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
