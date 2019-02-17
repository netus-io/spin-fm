const express     = require('express')
const bodyParser  = require('body-parser')
const multer = require('multer');
const Metadata    = require('./spin-metadata')
const P2PServer   = require('./spin-p2p-server')

const HTTP_PORT = process.env.HTTP_PORT || 3001
// HTTP_PORT=3002 npm run dev //example

const upload = multer({
  dest: 'playlist/' // this saves your file into a directory called "playlist"
}); 

const app = express()
const metadata = new Metadata()
const p2pServer = new P2PServer(metadata)

app.use(bodyParser.json())

app.get('/metadata', (req, res) => {
  res.json(metadata.metadata.length)
})

app.get('/spinningfm')

// Adding a song is like mining
app.post('/addSong', (req, res) => {
  // const metadata = metadata.addMetadata(req.body.data)
  const song = metdata.addMetadata(req.body.data)
  console.log(`New song added to the queue: ${song.toString()}`)
  p2pServer.syncMetdata()
  res.redirect('/metadata') // Share updated metadata
})

// Adding a song is like mining
app.post('/addNewSong', upload.single('file-to-upload'), (req, res) => {
  const song = metadata.addMetadata(req.body.data)
  console.log(`New song added to the queue: ${song.toString()}`)

  p2pServer.syncMetadata()

  res.redirect('/metadata') // Share updated metadata
});


let currentTrack = 0

app.get('/spinningfm', function(req, res) {
    const paths = ['./track0.mp3', './track1.mp3', './track2.mp3']
    const path = paths[currentTrack]
    console.log('PATH: ' + path)
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range

    console.log(`FILE SIZE ${fileSize}`)
    console.log(`HEADER:RANGE ${range}`)

    if(range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      // const end = parts[1]
      //   ? parseInt(parts[1], 10)
      //   : fileSize - 1
      
      // const chunksize = (end - start) + 1
      // const chunksize = 500000
      let chunksize = 250000
      const end = (start + chunksize > fileSize) ? fileSize - 1 : start + chunksize

      if(start + chunksize > fileSize) {
        console.log('\nSERVING LAST CHUNK')
        chunksize = (end - start) + 1
        const query = req.query.next
        if(query) {
          currentTrack++
        }
      }

      console.log(`\nCHUNKSIZE: ${chunksize}`)
      console.log(`SERVING\: bytes ${start}-${end}/${fileSize}`)
      const file = fs.createReadStream(path, {start, end})
      // const dummyStart = parseInt(598304, 10)
      // const dummyEnd = parseInt(4610225, 10)
      // const file = fs.createReadStream(path, {dummyStart, dummyEnd})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        // 'Content-Type': 'application/octet-stream'
        'Content-Type': 'video/mp4'
      }

      res.writeHead(206, head)
      file.pipe(res)
      // CHUNKSIZE: 3365042
      // bytes 1245184-4610225/4610226
    } else {
      const head = {
        'Content-Length': fileSize1,
        'Content-Type': 'application/octet-stream'
      }
      console.log(`..........FIRST REQUEST:\n${req.headers}`)
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }
})

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`))

p2pServer.listen() // fire up P2PServer