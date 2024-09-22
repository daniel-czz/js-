// nodemon index.js 运行index.js 

const express = require("express");

const app = express()

app.get("/server", (req, res) => {
    // 设置响应头
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send('hello AJAX')
})

app.post("/server", (req, res) => {
    // 设置响应头
    res.setHeader('Access-Control-Allow-Origin', '*')
    console.log(req)
    res.send('post request - hello AJAX')
})

app.all("/json-server", (req, res) => {
    // 设置响应头
    res.setHeader('Access-Control-Allow-Origin', '*')
    let data = { msg: 'hello AJAX JSON111222' }
    setTimeout(() => { res.send(JSON.stringify(data)) }, 5000)

})

app.all("/jquery-server", (req, res) => {
    // 设置响应头
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')

    let data = { msg: 'hello AJAX Jquery' }
    setTimeout(() => { res.send(JSON.stringify(data)) }, 2000)
})

app.all("/axios-server", (req, res) => {
    // 设置响应头
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Headers', '*')

    let data = { msg: 'hello AJAX Axios' }
    setTimeout(() => { res.send(JSON.stringify(data)) }, 5000)
})

// 处理预检请求 (OPTIONS 请求)
app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // 允许所有来源
    res.setHeader('Access-Control-Allow-Headers', '*'); // 允许所有头部
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // 允许的方法
    res.sendStatus(204); // 预检请求成功返回204，无内容
});
app.all("/axios-server-error", (req, res) => {
    // 设置响应头
    res.setHeader('Access-Control-Allow-Origin', '*'); // 允许所有来源
    res.setHeader('Access-Control-Allow-Headers', '*'); // 允许所有头部
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // 允许的方法

    return res.status(401).send(JSON.stringify({ message: 'Unauthorized. Please provide a valid token.' }));
});

app.all("/fetch-server", (req, res) => {
    // 设置响应头
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')

    let data = { msg: 'hello Fetch' }
    setTimeout(() => { res.send(data) }, 5000)
    
})

app.post("/cros-test", (req, res) => {
    // 设置响应头
    // res.setHeader('Access-Control-Allow-Origin', '*')
    // res.setHeader('Access-Control-Allow-Headers', '*')

    let data = { msg: 'hello AJAX Jquery' }
    res.send('123')
})



app.listen(9000, () => {
    console.log('port 9000 listening...');
})