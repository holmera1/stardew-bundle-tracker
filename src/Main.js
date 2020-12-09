const {app, BrowserWindow, shell } = require('electron');
const Store = require('electron-store');
const { ipcMain } = require('electron');
const path = require('path');

const store = new Store();

let mainWindow;

// create main window
const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 1000,
        webPreferences: {
            nodeIntegration: true
        }
    });
    // used for development purposes
    mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
    //mainWindow.loadURL('http://localhost:3000');
    
    mainWindow.setMenu(null);
    mainWindow.webContents.on("new-window", function(event, url) {
        event.preventDefault();
        shell.openExternal(url);
    });
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

// changes checkbox stored state when it is clicked
ipcMain.on('data', (event, bundle, itemIdx) => {
    if(store.has(`${bundle}${itemIdx}`)) {
        let val = (store.get(`${bundle}${itemIdx}`));
        store.set(`${bundle}${itemIdx}`, !val);
    } else {
        store.set(`${bundle}${itemIdx}`, true);
    }
});

// clear stored checkbox state
ipcMain.on('clear', () => {
    store.clear();
    mainWindow.reload();
});

// used to retrieve checkbox states when app launches
ipcMain.handle('get', (event, bundle, itemIdx) => {
    if(store.has(`${bundle}${itemIdx}`)) {
        return store.get(`${bundle}${itemIdx}`);
    } else {
        return false;
    }
});

if(require('electron-squirrel-startup')) return;

app.whenReady().then(createWindow);