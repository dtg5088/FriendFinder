   
var friendsData = require("../data/friends");

   module.exports = function(app){

    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
      });
       
    //   app.get("/api/waitlist", function(req, res) {
    //     res.json(waitListData);
    //   });


    //posting information
    app.post("/api/friends", function(req, res) {
      friendsData.push(req.body);
      res.json(true);
        res.json(friendsData);
      });

   }