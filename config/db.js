import mongoose from 'mongoose';
const dbname = "sample";
const mongodbURL = `mongodb://localhost:27017/`+dbname;

var options = {
	useNewUrlParser: true
};
mongoose.Promise = global.Promise;
mongoose.connect(mongodbURL, options);

export var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection failed"));
db.once('open', function () {
	console.log("Database conencted successfully and project Started!");
});
mongoose.set('debug', false);
mongoose.set('autoIndex', false )
