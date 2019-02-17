class Metadata {
  constructor() {
    this.metadata = []
  }

  addMetadata(data) {
    this.metadata.push(data)
    return metadata
  }

  replaceMetadata(newMetadata) {
    this.metadata = newMetadata
  }
}

module.exports = Metadata