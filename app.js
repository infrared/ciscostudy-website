var express         = require('express');
var path            = require('path');
var http            = require('http');


var app = express();
app.configure(function(){
    app.set('port',6789);
    app.use(express.favicon());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.logger('dev'));
    
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    

});


app.get('/',function(req,res){
    res.sendfile('public/index.html');
});

var server = http.createServer(app);
server.listen(app.get('port'));
