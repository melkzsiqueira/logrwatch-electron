const { app, BrowserWindow } = require('electron');
const path = require('path');

app.on('ready', function createWindow(){

    let win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true
        }
    });

    win.loadURL(path.join('file://', __dirname, '../resources/index.html'));

    win.webContents.openDevTools()

    win.on('closed', () => {
        win = null;
    });

});

app.on('window-all-closed', () => {

    if(process.platform !== 'darwin'){
        app.quit();
    }

});

app.on('activate', () => {

    if(win == null){
        createWindow();
    }

});