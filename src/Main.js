const {app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const Store = require('electron-store');
const { ipcMain } = require('electron');

const store = new Store();

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 1000,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
});

ipcMain.on('data', (event, bundle, itemIdx) => {
    if(store.has(`${bundle}${itemIdx}`)) {
        let val = (store.get(`${bundle}${itemIdx}`));
        store.set(`${bundle}${itemIdx}`, !val);
    } else {
        store.set(`${bundle}${itemIdx}`, true);
    }
});

ipcMain.on('clear', () => {
    store.clear();
});


ipcMain.handle('get', (event, bundle, itemIdx) => {
    if(store.has(`${bundle}${itemIdx}`)) {
        return store.get(`${bundle}${itemIdx}`);
    } else {
        return false;
    }
})

if(require('electron-squirrel-startup')) return;

app.whenReady().then(createWindow);