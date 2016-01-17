var serviceMod = module.exports = {
	
	MongoClient : require('mongodb').MongoClient,
	url : 'mongodb://127.0.0.1:27017/test',
	collectioName : 'simpleCRUD',
	dbConnSucc : 'Mongo DB connection created.',
	dbObj : "",
	insertSucc : 'Inserted document into the simpleCRUD collection.',
	updateSucc : 'Updated document into the simpleCRUD collection.',
	
	/**
	*   Method to get DB Connection
	*   return db obj
	**/
	getConnection : function(){
		var thisRef = this;
		thisRef.MongoClient.connect(thisRef.url,function(err,db){
			thisRef.dbObj = db;
		});
	},
	/**
	*   Method to add user into DB.
	*
	**/
	addDocument : function(obj,callBack){
		 var thisRef = this;
		 thisRef.dbObj.collection(thisRef.collectioName).insertOne(obj,function(err,result){
			 callBack();
		 });
	},
	/**
	*  Method to get all documents
	*
	**/
	getAllDocuments : function(callBack){
		 var thisRef = this;		
	     callBack(thisRef.dbObj.collection(thisRef.collectioName).find());
	},
	/**
	*   Method to get all users from DB.
	*
	**/
	getUsers : function(callBack){
		var thisRef = this;
		thisRef.getAllDocuments(function(cursor){	           
			callBack(cursor);
		});
	},
	/**
	*   Method to add user into DB.
	*
	**/
	addUser : function(obj,callBack){
		var thisRef = this;
		thisRef.addDocument(obj,function(){
			callBack();
		});
	},
	deleteAllUsers : function(callBack){
		var thisRef = this;
		thisRef.dbObj.collection(thisRef.collectioName).deleteMany({},function(err,res){
			callBack();
		});
	},
	updateUser : function(id,obj,callBack){
		console.log(id);
		console.log(obj);
		var thisRef = this;
		thisRef.dbObj.collection(thisRef.collectioName).updateOne(
			{'id':obj.id},
				{
					$set : {"name":obj.name}
				},function(err,res){
					console.log(err);
					console.log(res);
					callBack();
				}
		)
	}
};


