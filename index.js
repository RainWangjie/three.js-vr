/**
 * Created by gewangjie on 2017/10/9
 */
const Koa = require('koa');
const app = new Koa();
const fs = require('fs');

const path = require('path');
const serve = require('koa-static');
const opn = require('opn');
const server = require('http').createServer(app);
const QRCode = require("qrcode-terminal");

var localhost = '',
    port = process.env.PORT || 3000;

try {
    var network = os.networkInterfaces();
    localhost = network['en0'][1].address
} catch (e) {
    localhost = 'localhost';
}

// Terminal内绘制二维码
var url = 'http://' + localhost + ':' + port;
QRCode.setErrorLevel('Q');
QRCode.generate(url);

console.log(__dirname);

const static_res = serve(path.join(__dirname + '/resources/'));
app.use(static_res);

const main = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./resources/index.html');
};
app.use(main);

app.listen(port, function () {
    // 打开默认浏览器
    console.log('连接同一wifi下打开or扫码：', url);
    opn(url);
});

console.log('koa 监听开启');