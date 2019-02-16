const electron = require('electron')
// const { session } = require('electron')
const { app, BrowserWindow, ipcMain } = electron

const MainWindow = require('./app/main-window')

// const Portis = require ('@portis/web3')
// const Web3  = require('web3')

// const portis = new Portis('55f3b60f-eacd-4e7b-8d39-bcf0d516dee1', 'kovan');
// const web3 = new Web3(portis.provider);

let mainWindow
let session
let webContents

function createWindow () {
  mainWindow = new MainWindow(`file://${__dirname}/src/index.html`)

  mainWindow.on('closed', function() {
    console.log('MainWindow closed')
    mainWindow = null
  })

  // session = mainWindow.webContents.session
  webContents = mainWindow.webContents

  // webContents.on('new-window',  (event, url) => {
  //   console.log('NEW WINDOW: ' + url)
  //   // event.preventDefault();
  // })
}

app.on('ready', createWindow)

app.on('before-quit', function(e) {
  console.log('App is about to quit')
})

app.on('browser-window-blur', function(e) {
  console.log('App window is out of focus')
})

app.on('browser-window-focus', function(e) {
  console.log('App window is in focus')
})

// Quit when all windows are closed
app.on('window-all-closed', function() {
  // On macOS it is common for application and their menu bar 
  // to stay active until the user explicitly stops the app
  if(process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('active', function() {
  // On macOS it is common to re-create a window in the app when 
  // the dock icon is clicked and there are no other windows open 
  if(mainWindow === null) {
    createWindow()
  }
})



// ipcMain.on('oauth:portis', (event, arg) => {
//   web3.eth.getAccounts((error, accounts) => {
//     if(error) {
//       console.log(`ERROR: ${error}`)
//       return
//     }
//     console.log(`SUCCESS!`)
//     console.log(`PORTIS ACCOUNT: ${accounts}`);
//     event.sender.send('oauth:portis:response', accounts);
//   });
// })

// ipcMain.on('oauth:accepted', (event, arg) => {
//   if(arg === true) {
//     mainWindow.show()
//     loginWindow.destroy()  // loginWindow.hide()
//   }
// })