var React = require('react');
var Router = require('react-router')
    , RouteHandler = Router.RouteHandler
    , Link = Router.Link
    , Route = Router.Route
    , DefaultRoute = Router.DefaultRoute
    , Navigation = Router.Navigation
    , State = Router.State

var auth = require('./main/services/auth');
var Header = require('./main/components/header/menu');
var LogIn = require('./main/components/auth/login');
var Authentication = require('./main/components/authentication')

var App = React.createClass({displayName: "App",
    getInitialState: function () {
        return {
            loggedIn: auth.isLoggedIn()
        };
    },
    componentDidMount: function() {
        auth.onChange = this.onChange;
    },
    onChange: function() {
      this.setState({
          loggedIn: auth.isLoggedIn()
      })
    },
    render: function () {
        var loginOrDashboard = this.state.loggedIn
            ? React.createElement(Dashboard, null)
            : React.createElement(LogIn, {logIn: auth.logIn, onChange: this.onChange})
            return (
            React.createElement("div", null, 
                loginOrDashboard, 
                React.createElement(RouteHandler, {logIn: auth.logIn})
            )
        );
    }
});

var Dashboard = React.createClass({displayName: "Dashboard",
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement(Header, null), 
                "Dashboard"
            )
        )
    }
});

var InviteUsers = require('./main/components/users/inviteUsers');
var LogOut = require('./main/components/auth/logout')

var routes = (
    React.createElement(Route, {handler: App}, 
        React.createElement(Route, {name: "logout", handler: LogOut}), 
        React.createElement(Route, {name: "login", handler: LogIn}), 
        React.createElement(Route, {name: "invite-users", handler: InviteUsers}), 
        React.createElement(Route, {name: "students", handler: InviteUsers})
    )
);

Router.run(routes, function (Handler) {
    React.render(React.createElement(Handler, null), document.getElementById('view'));
});