class Metadata {
  constructor() {
    this.metadata = []
  }

  addMetadata(data) {
    this.metadata.push(data)
    // return this.metadata
    return 'METADATA_LENGTH' + this.metadata.length
  }

  replaceMetadata(newMetadata) {
    this.metadata = newMetadata
  }

  toString() {
    var ret = ''
    for(var i = 0; i < this.metadata.length; i++) {
      ret += this.metadata[i].songName
    }
    return ret
  }
}

module.exports = Metadata