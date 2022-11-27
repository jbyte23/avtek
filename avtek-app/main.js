const { app, BrowserWindow, Menu } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    });

    win.loadFile('izbor.html');

    // Open the DevTools.
    win.webContents.openDevTools()
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

const isMac = process.platform === 'darwin'

const template = [
    // { role: 'appMenu' }
    ...(isMac ? [{
        label: app.name,
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideOthers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    }] : []),
    // { role: 'fileMenu' }
    {
        label: 'Datoteka',
        submenu: [
            isMac ? { role: 'close' } : { role: 'quit', label: "Izhod" }
        ]
    },
    // { role: 'editMenu' }
    {
        label: 'Uredi',
        submenu: [
            { role: 'undo', label: "Razveljavi" },
            { role: 'redo', label: "Uveljavi" },
            { type: 'separator' },
            { role: 'cut', label: "Izreži" },
            { role: 'copy', label: "Kopiraj" },
            { role: 'paste', label: "Prilepi" },
            ...(isMac ? [
                { role: 'pasteAndMatchStyle' },
                { role: 'delete' },
                { role: 'selectAll' },
                { type: 'separator' },
                {
                    label: 'Speech',
                    submenu: [
                        { role: 'startSpeaking' },
                        { role: 'stopSpeaking' }
                    ]
                }
            ] : [

            ])
        ]
    },
    // { role: 'viewMenu' }
    {
        label: 'Pogled',
        submenu: [
            { role: 'zoomIn', label: "Povečaj" },
            { role: 'zoomOut', label: "Pomanjšaj" },
            { role: 'resetZoom', label: "Ponastavi povečavo" },
            { type: 'separator' },
            { role: 'togglefullscreen', label: "Celoten zaslon" }
        ]
    },
    // { role: 'windowMenu' }
    {
        label: 'Okno',
        submenu: [
            { role: 'minimize', label: "Minimiraj" },
            ...(isMac ? [
                { type: 'separator' },
                { role: 'front' },
                { type: 'separator' },
                { role: 'window' }
            ] : [
                { role: 'close', label: "Zapri" }
            ])
        ]
    },
    {
        role: 'Pomoč',
        submenu: [
            {
                label: 'Learn More',
                click: async () => {
                    const { shell } = require('electron')
                    await shell.openExternal('https://electronjs.org')
                }
            }
        ]
    }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)