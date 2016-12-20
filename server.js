const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('./webpack.config');
const bundler = webpack(webpackConfig);

const os = require('os');
const childProcess = require('child_process')

var ipv4, cmd, netFlag = true;

var netObj = os.networkInterfaces()


for (var i in netObj) {
    if (netFlag) {
        for (var j = 0; j < netObj[i].length; j++) {
            if (netObj[i][j].family === 'IPv4' && netObj[i][j].internal === false) {
                ipv4 = netObj[i][j].address
                netFlag = false
                break
            }
        }
    } else {
        break
    }
}

var server = new WebpackDevServer(bundler, {
    stats: {
        colors: true //显示不同的颜色区分打包的文件
    }
})

server.listen(4000, (err) => {
    if (err) {
        console.log(err)
        return
    }

    console.log('----------local IP: ' + ipv4 + ':4000/');

    if (process.platform === 'win32') {
        cmd = 'start "start"';
    } else if (process.platform === 'linux') {
        cmd = 'xdg-open';
    } else if (process.platform === 'darwin') {
        cmd = 'open';
    }

    childProcess.exec(cmd + ' "http://' + ipv4 + ':4000/"')
})