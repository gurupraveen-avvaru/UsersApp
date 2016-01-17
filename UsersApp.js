
var userApp ={
	
	expressMod : require('express'),
	bodyParser : require('body-parser'),
   
	 expressApp : '',
	_serviceMod : require("./js/serviceMod.js"),
	
	/**
	*   Method for initializing
	*
	**/
	init : function (){
		var thisRef = this;		
		thisRef._serviceMod.getConnection();		
		thisRef.expressApp = thisRef.expressMod();
		// Add headers
thisRef.expressApp.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
		thisRef.expressApp.use(thisRef.bodyParser.json());
		thisRef.expressApp.get('/userapp/users', function (req, res) {			
			thisRef._serviceMod.getUsers(function(usersObj){
				var arr = [];
				usersObj.each(function(err,doc){
										if (doc != null) {
						arr.push(doc);						
					}else{
						res.json(200,arr);
					} 
			    });					
			});			
		});
		thisRef.expressApp.post('/userapp/users', function (req, res) {						
			thisRef._serviceMod.addUser(req.body,function(){
				res.statusCode = 200;
				res.write("User Added!!!");
				res.end();
			});
		});
		thisRef.expressApp.put('/userapp/users/:id',function(req,res){
			thisRef._serviceMod.updateUser(req.params.id,req.body,function(){
				console.log("Call Back function");
				res.statusCode = 200;
				res.end();
			});			    
		});
		thisRef.expressApp.delete('/userapp/users', function (req, res) {						
			thisRef._serviceMod.deleteAllUsers(function(){
				res.statusCode = 200;
				res.write("All User's deleted!!!");
				res.end();
			});
		});
		var server = thisRef.expressApp.listen(1337, function () {
            var host = server.address().address
			var port = server.address().port
		});
	}
	

};
userApp.init();



