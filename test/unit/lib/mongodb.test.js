describe('mongodb', () => {
  it('exports Mongoose', () => {
    // Arrange

    // Act
    const exported = require('../../../src/lib/mongodb')

    // Assert
    expect(exported.Mongoose).toBeDefined()
  })
})
