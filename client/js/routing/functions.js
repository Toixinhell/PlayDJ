Accounts.onLogin(function () {
    if (FlowRouter.current().route.group.name === 'private') {
        console.log("on login triggered")
        FlowRouter.go('/rooms')
    }

});
Tracker.autorun(function() {
    console.log("Is myPost ready?:", FlowRouter.subsReady("currentRooms"));
    console.log("Does all subscriptions ready?:", FlowRouter.subsReady());
});