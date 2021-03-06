var request = require('superagent');

module.exports = {
    inviteUsers: function(data, callback) {
        request
            .post('/invite-users')
            .send({data})
            .end(function(error, res){
                callback(JSON.parse(res.text));
            });
    },
    getUsers: function(cb) {
        request
            .get('/users')
            .end(function(error, res) {
                cb(JSON.parse(res.text))
            });
    }
};