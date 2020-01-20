const { remote } = require('electron');
const TabGroup = require("electron-tabs");
const path = require('path');
const { dialog } = require('electron').remote;
const fs = require('fs');
const url = require('url');

// When document has loaded, initialise
document.onreadystatechange = () => {

    if (document.readyState == "complete"){
        handleWindowControls();
        styleSheet();
    }

};

function handleWindowControls(){

    let win = remote.getCurrentWindow();
    // Make minimise/maximise/restore/close buttons work when they are clicked
    document.getElementById('min-button').addEventListener("click", event => {
        win.minimize();
    });

    document.getElementById('max-button').addEventListener("click", event => {
        win.maximize();
    });

    document.getElementById('restore-button').addEventListener("click", event => {
        win.unmaximize();
    });

    document.getElementById('close-button').addEventListener("click", event => {
        win.close();
    });

    // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
    toggleMaxRestoreButtons();

    win.on('maximize', toggleMaxRestoreButtons);
    win.on('unmaximize', toggleMaxRestoreButtons);

    function toggleMaxRestoreButtons() {
        if(win.isMaximized()){
            document.body.classList.add('maximized');
        }else{
            document.body.classList.remove('maximized');
        }
    }

}

function styleSheet(){

    var i = document.createElement('i'); 
    var icon = document.createTextNode('add');    
    var head = document.head;
    var link = null;
    var ref = [

        'https://fonts.googleapis.com/icon?family=Material+Icons',
        '../css/tabs.css',
        '../css/main.css'
    ];

    for(var x = 0; x < ref.length; x++){

        var link = document.createElement('link');

        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = ref[x];

        head.appendChild(link);

    }

    i.appendChild(icon);    
    document.getElementsByClassName('etabs-tab-button-new')[0].textContent = '';
    document.getElementsByClassName('etabs-tab-button-new')[0].appendChild(i).className = 'material-icons';

}

let tabGroup = new TabGroup({
    newTab: {
        title: 'New Tab'
    }
});

tabGroup.addTab({
    title: 'Google',
    src: 'http://google.com',
    visible: true,
});

tabGroup.addTab({
    title: "Electron",
    src: "../../../node_modules/electron-tabs/electron-tabs.css",
    visible: true,
});

tabGroup.on('tab-added', (tab) => {

    dialog.showOpenDialog({

        properties: ['openFile']

    }).then((data) => {

        var pathData = data.filePaths[0]
        var pathFile = new URL(`file:///${pathData}`).href;
        var fileName = path.parse(pathData).base;
        let webview = tab.webview;
        
        webview.loadURL(pathFile);
        document.getElementById('title-name').textContent = fileName + ' - LogrWatch';
        tab.setTitle(fileName);
        tab.activate();

    });

});

tabGroup.on('tab-active', (tab) => {

    document.getElementById('title-name').textContent = tab.getTitle() + ' - LogrWatch';
    
});
