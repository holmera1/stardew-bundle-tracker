const {app, BrowserWindow, shell } = require('electron');
const Store = require('electron-store');
const { ipcMain } = require('electron');
const path = require('path');

const store = new Store();

let mainWindow;

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
    //mainWindow.toggleDevTools();
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
ipcMain.on('data', async (event, bundle, itemIdx) => {
    const contains = await store.has(`${bundle}${itemIdx}`);
    if(contains) {
        let val = await (store.get(`${bundle}${itemIdx}`));
        await store.set(`${bundle}${itemIdx}`, !val);
    } else {
        await store.set(`${bundle}${itemIdx}`, true);
    }
});

// clear stored checkbox state
ipcMain.on('clear', async (event) => {
    await store.clear();
    mainWindow.reload();
});

// used to retrieve checkbox states when app launches
ipcMain.handle('get', async (event, bundle, itemIdx) => {
    const contains = await store.has(`${bundle}${itemIdx}`);
    if(contains) {
        return await store.get(`${bundle}${itemIdx}`);
    } else {
        return false;
    }
});

if(require('electron-squirrel-startup')) return;

app.whenReady().then(createWindow);