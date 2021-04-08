import { app, BrowserWindow } from'electron';


interface ISize {
  width: number;
  height: number;
}

const loginSize: ISize = {
  width: 280,
  height: 400
};

let mainWindow: BrowserWindow = null;
const createWindow = (size: Partial<ISize> = {}) => {
  mainWindow = new BrowserWindow({
    ...size,
    webPreferences: {
      contextIsolation: true, //启用上下文隔离
      nodeIntegration: true
    }
    // fullscreenable:false,
    // maximizable:false
  });
  // mainWindow.webContents.openDevTools();
  mainWindow.loadURL('http:localhost:8080');
  mainWindow.on('closed', function() {
      mainWindow = null;
  });
};



app.on('ready', () => {
  createWindow(loginSize);
});
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