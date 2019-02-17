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
}

module.exports = Metadata