import { app, BrowserWindow } from'electron';

let mainWindow: BrowserWindow = null;
const createWindow = function() {
  mainWindow = new BrowserWindow({
    width:800, 
    height:600, 
    webPreferences: {
      contextIsolation: true, //启用上下文隔离
      nodeIntegration: true
    }
    // fullscreenable:false,
    // maximizable:false
  });
  // mainWindow.webContents.openDevTools();
  // mainWindow.loadFile('../../dist/electron/index.html');
  mainWindow.loadURL('http:localhost:8080');
  mainWindow.on('closed', function() {
      mainWindow = null;
  });
};
app.on('ready', createWindow);
app.on('window-all-closed', ()=>{
  if (process.platform !== 'darwin') {
      app.quit();
  }
});

app.on('activate', ()=>{
  if (mainWindow === null) {
      createWindow();
  }
});