const { remote } = require('electron');
const TabGroup = require("electron-tabs");
const path = require('path');

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

    var head = document.head;
    //var link = null;
    var ref = [
        '../../../node_modules/electron-tabs/electron-tabs.css',
        '../css/main.css'
    ];

    //for(var i = 0; i < ref.length; i++){

        var link = document.createElement('link');

        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = ref[1];

        head.appendChild(link);

    //}

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

