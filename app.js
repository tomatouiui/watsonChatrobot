var express = require('express');
var bodyParser = require('body-parser');

var watson = require('watson-developer-cloud');

var assistant = new watson.AssistantV1({
  iam_apikey: 'NE6yWK7JBIoWoiNxWTkTnKIBhPL8_HDSranpWax9veyd',
  version: '2019-03-15',
  url: 'https://gateway.watsonplatform.net/assistant/api'
});

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express();

app.use('/assets', express.static('assets'));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    //res.send('Hello World');
    //res.sendFile(__dirname + '/index.html');
    res.render('index');
})

app.post('/api/:name', urlencodedParser, function(req, res) {
    if(req.params.name == 'chat'){
        //console.log(req.body)
        assistant.message({
            workspace_id: '46d91600-3bbf-40b0-9d08-507a0a9e1fe6',
            input: {'text': req.body.msg}
        },  function(err, response) {
            if (err)
            console.log('error:', err);
            else
            //console.log(JSON.stringify(response, null, 2));
            res.send(response);
        });
        //res.send('ok')
    }else{
        collection.find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            //console.log(result);
            res.send(result)
        });
    }
})

var server = app.listen(8081, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})