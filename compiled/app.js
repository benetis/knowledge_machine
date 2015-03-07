var React = require('react');
var Router = require('react-router');
var request = require('superagent');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Route = Router.Route;
var auth = require('./users/services/auth');

var App = React.createClass({displayName: "App",
    getInitialState: function() {
        return {
            loggedIn : auth.isLoggedIn()
        }
    },
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("ol", null, 
                    React.createElement("li", null, React.createElement(Link, {to: "login"}, "Login")), 
                    React.createElement("li", null, React.createElement(Link, {to: "invite-users"}, "Invite users")), 
                    React.createElement("li", null, React.createElement(Link, {to: "logout"}, "Log out"))
                ), 
                React.createElement(RouteHandler, null)
            )
        );
    }
});

var SignedIn = React.createClass({displayName: "SignedIn",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("h2", null, "Signed In"), 
                React.createElement(RouteHandler, null)
            )
        );
    }
});

var SignedOut = React.createClass({displayName: "SignedOut",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("h2", null, "Signed Out"), 
                React.createElement(RouteHandler, {logIn: auth.logIn})
            )
        );
    }
});

var InviteUsers = require('./users/components/users/inviteUsers');
var LogIn = require('./users/components/auth/login');
var LogOut = React.createClass({displayName: "LogOut",
   componentDidMount: function() {
        auth.logOut(function(result){
        });
   },
    render: function() {
        return (
            React.createElement("div", null, "You are logged out")
        );
    }
});
var routes = (
    React.createElement(Route, {handler: App}, 
            React.createElement(Route, {handler: SignedIn}, 
                React.createElement(Route, {name: "invite-users", handler: InviteUsers}), 
                React.createElement(Route, {name: "logout", handler: LogOut})
            ), 
            React.createElement(Route, {handler: SignedOut}, 
                React.createElement(Route, {name: "login", handler: LogIn})
            )
    )
);

Router.run(routes, function (Handler) {
    React.render(React.createElement(Handler, null), document.getElementById('view'));
});