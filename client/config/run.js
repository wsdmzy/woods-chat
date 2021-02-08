const path = require('path');
const chalk = require('chalk');
const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack');
const { ROOT_DIR } = require('./common');
const rendererConfig = require('./renderer.config');
const mainConfig = require('./main.config');
const child_process = require('child_process')
const electron = require('electron');

let electronProcess = null
let manualRestart = false

const devHost = '0.0.0.0';
const devPort = 8080;

const electronLog = (data, color) => {
  let log = ''
  data = data.toString().split(/\r?\n/)
  data.forEach(line => {
    log += `  ${line}\n`
  })
  if (/[0-9A-z]+/.test(log)) {
    console.log(
      chalk[color].bold('┏ Electron -------------------') +
      '\n\n' +
      log +
      chalk[color].bold('┗ ----------------------------') +
      '\n'
    )
  }
}

const readyRenderer = () => {
  return new Promise((resolve, reject) => {
    // rendererConfig.entry.renderer = [path.join(__dirname, 'dev-client')].concat(rendererConfig.entry.renderer);
    const compiler = webpack(rendererConfig);

    const server = new WebpackDevServer(compiler, {
      contentBase: path.join(ROOT_DIR, 'dist/electron'),
      hot: true,
      compress: true,
    })

    server.listen(devPort, devHost, () => {
      console.log('renderer server running on port 8080');
      resolve();
    })
  })
}

const readyMain = () => {
  return new Promise((resolve, reject) => {
    // 如果不传 callback 回调函数，就会返回一个 Compiler 实例,不会立即启动
    const compiler = webpack(mainConfig);

    compiler.watch({}, (err, stats) => {
      if (err) {
        console.log(err)
        return
      }
  
      if (electronProcess && electronProcess.kill) {
        manualRestart = true
        process.kill(electronProcess.pid)
        electronProcess = null
        startElectron()
  
        setTimeout(() => {
          manualRestart = false
        }, 5000)
      }
  
      resolve()
    })
  })

}

const startElectron = () => {
  // electronProcess = spawn(electron, ['--inspect=5858', path.join(ROOT_DIR, 'dist/electron/main.js')])
  electronProcess =  child_process.spawn(electron, [path.join(ROOT_DIR, 'dist/electron/main.js')])

  electronProcess.stdout.on('data', data => {
    electronLog(data, 'blue')
  })
  electronProcess.stderr.on('data', data => {
    electronLog(data, 'red')
  })

  electronProcess.on('close', () => {
    if (!manualRestart) process.exit()
  })
}

const run = () => {
  Promise.all([readyRenderer(), readyMain()])
    .then(() => {
      startElectron()
    })
    .catch(err => {
      console.error(err);
    })

}

run();