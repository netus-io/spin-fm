const express     = require('express')
const bodyParser  = require('body-parser')
const Metadata    = require('./spin-metadata')
const P2PServer   = require('./spin-p2p-server')

const HTTP_PORT = process.env.HTTP_PORT || 3001
// HTTP_PORT=3002 npm run dev //example

const app = express()
const metadata = new Metadata()
const p2pServer = new P2PServer(metadata)

app.use(bodyParser.json())

app.get('/metadata', (req, res) => {
  // res.json(metadata.metadata)
  res.json('HEY!!!!!')
})

app.post('/mine', (req, res) => {
  const metadata = metadata.addMetadata(req.body.data)
  console.log(`New block added: ${block.toString()}`)

  p2pServer.syncMetdata()

  res.redirect('/metadata')
})

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`))

p2pServer.listen() // fire up P2PServer