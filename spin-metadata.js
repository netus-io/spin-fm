class Metadata {
  constructor() {
    this.songs = []
  }

  addMetadata(data) {
    this.songs.push(data)
    // return this.metadata
    // return 'METADATA_LENGTH' + this.songs.length
  }

  replaceMetadata(newMetadata) {
    this.songs = newMetadata
  }

  toString() {
    var ret = ''
    for(var i = 0; i < this.songs.length; i++) {
      ret += this.songs[i].songName
    }
    return ret
  }
}

module.exports = Metadata