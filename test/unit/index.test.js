const lib = require('../../src/index')

describe('index', () => {

  it('should be defined', () => {
    expect(lib.Db).toBeDefined()
    expect(lib.Models).toBeDefined()
    expect(lib.Models.BulkTransfer).toBeDefined()
  })
})