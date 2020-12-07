const {app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const Store = require('electron-store');
const { ipcMain } = require('electron');

const store = new Store();

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL('http://localhost:3000/');
    mainWindow.webContents.openDevTools();
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});

ipcMain.on('data', (event, bundle, itemIdx) => {
    console.log(`changing ${bundle}${itemIdx}`);
    if(store.has(`${bundle}${itemIdx}`)) {
        let val = (store.get(`${bundle}${itemIdx}`));
        store.set(`${bundle}${itemIdx}`, !val);
    } else {
        store.set(`${bundle}${itemIdx}`, true);
    }
});

ipcMain.on('clear', (event) => {
    store.clear();
});


ipcMain.handle('get', (event, bundle, itemIdx) => {
    if(store.has(`${bundle}${itemIdx}`)) {
        return store.get(`${bundle}${itemIdx}`);
    } else {
        return false;
    }
})

app.whenReady().then(createWindow);