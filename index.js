const electron = require('electron')
const { app, BrowserWindow, ipcMain } = electron

const MainWindow = require('./app/main-window')

let mainWindow

function createWindow () {
  mainWindow = new MainWindow(`file://${__dirname}/src/index.html`)

  mainWindow.on('closed', function() {
    console.log('MainWindow closed')
    mainWindow = null
  })
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

// ipcMain.on('oauth:accepted', (event, arg) => {
//   if(arg === true) {
//     mainWindow.show()
//     loginWindow.destroy()  // loginWindow.hide()
//   }
// })