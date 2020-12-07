const {app, BrowserWindow} = require('electron');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({width: 1400, height: 800});
    mainWindow.loadURL('http://localhost:3000/');
    mainWindow.webContents.openDevTools();
});