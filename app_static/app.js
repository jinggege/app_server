/**
 * Created by dell on 2016/2/26.
 */
var basePath = __dirname;
var http  = require("http");
var path  = require("path");
var fs    = require("fs");
var url   = require("url");
var mine  = require(basePath+"/lib/mine.js");
var trace = require(basePath+"/lib/trace.js");

http.createServer(function(request,response){

    var relativePath = url.parse(request.url).pathname;
    var lastName = path.extname(relativePath).slice(1);
    /*
    var getRealDir = function(lastName){
        switch(lastName){
            case "js":
                return "js";
                break;
            case "css":
                return "css";
                break;
            case "jpg":
            case "png":
                return "imgs";
                break;
        }
    };

    */

   // var localPath = basePath +'/'+getRealDir(relativePath)+relativePath;
    var localPath = basePath +relativePath;
    fs.exists(localPath,function(exists){
        if(exists){
            fs.readFile(localPath,"binary",function(err,data){
                if(err != null || err != undefined){
                    response.end("can't read:"+localPath);
                    return;
                }
                var contentType = mine.types[lastName] || "text/plain";
                response.writeHead(200,{'Content-Type':contentType});
                response.write(data,'binary');
                response.end();
            });

        }else{
            response.end("file not found!");
        }
    });




}).listen(80);