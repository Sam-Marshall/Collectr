/*
    @author: anupsawant
    @desc: routes for groups feature
    @date: 2nd june 2017
*/

var db = require('../models');

var groups = new Map();
groups.set('history',[1,2,3,4]);
groups.set('games',[5,6,7,8]);
groups.set('apparel',[9,10,11,12]);
groups.set('music',[13,14,15,16]);

var postSet = new Set();
var userSet = new Set();
var userids = new Set();
var useridsDone = new Set();

function getUserById(userID){
      db.User.findOne({
			where: {
                id: userID
			}
		}).then(function(dbUser) {
            userSet.add(dbUser);
		});
}

function getAllPostsInCategory(categories,callback) {
    db.Post.findAll({
            include: [{
                model: db.User
            }, {
                model: db.Category
            }, {
                model: db.Post2Tags,
                include: [db.Tags]
            }],
            where: { 
                $or: [
                    {
                        category_id: categories[0]
                    },
                    {
                        category_id: categories[1]
                    },
                    {
                        category_id: categories[2]
                    },
                    {
                        category_id: categories[3]
                    },
                ]
            },
            order: 'id ASC'
        }).then(function(response) {
            for(var i=0; i < response.length; i++){
                postSet.add(response[i]);
                if(userids.has(response[i].owner_id) === false){
                    userSet.add(response[i].User)
                }
                userids.add(response[i].owner_id);
            }
        }).done(
        function(){
            callback();
        });
}

module.exports = function(app) {

    app.get('/groups/:groupName', function(req, res) {

        var categories = groups.get(req.params.groupName);
        var groupName = req.params.groupName;

        var firstLetter = groupName.slice(0, 1).toUpperCase();
        var withoutFirstLetter = groupName.slice(1);
        var groupName = firstLetter + withoutFirstLetter;

        getAllPostsInCategory(categories,function callback() {
            console.log('UserSet',userSet.size);
            console.log('PostSet',postSet.size);
            res.render('groups', {
                user: Array.from(userSet),
                post: Array.from(postSet),
                group: groupName,
                currentUser: req.session && req.session.user
            });
        });
        postSet.clear();
        userSet.clear();
//        useridsDone.clear();
        userids.clear();
    });
    
    app.get('/groups', function(req, res) {
        res.render('select-categories', {
            user: Array.from(userSet),
            post: Array.from(postSet),
            currentUser: req.session && req.session.user
        });
    });
    

}
