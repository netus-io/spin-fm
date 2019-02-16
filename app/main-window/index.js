const electron = require('electron')

const { app, BrowserWindow, ipcMain } = electron

class MainWindow extends BrowserWindow {
  constructor(url) {
    super({
      height: 1000,
      width: 1200,
      resizable: false,
      show: true,
      webPreferences: {
        backgroundThrottling: false,
  
      }
    })

    this.loadURL(url)

    this.on('unresponsive', this.onUnresponsive.bind(this))

    let mainContents = this.webContents
    // Triggered when navigation or WebContents fail to load
    mainContents.on('did-fail-load', this.onDidFailLoad.bind(this))
    // Monitor render process,reload if it crashes
    mainContents.on('crashed', this.onCrashed.bind(this))
  }

  onUnresponsive() {
    console.log('MainWindow is Unresponsive')
  }

  onDidFailLoad(event, errCode) {
    console.log('MainWindow failed load')
  }

  onCrashed(event, killed) {
    console.log('MainWindow Render Process Crashed.')
    if(!killed) {
      mainWindow.reload()
    }
  }
}

module.exports = MainWindow