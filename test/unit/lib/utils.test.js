const { resolveOptionsWithDefaults } = require("../../../src/lib/utils")

describe('utils', () => {
  describe('resolveOptionsWithDefaults', () => {
    it('returns the default options if inputOptions is an empty map', () => {
      // Arrange
      const inputOptions = {}
      const defaultOptions = {
        promiseLibrary: global.Promise,
        useUnifiedTopology: true,
      }
      
      // Act
      const result = resolveOptionsWithDefaults(inputOptions, defaultOptions)
      
      // Assert
      expect(result).toStrictEqual(defaultOptions);
    })

    it('throws if params are invalid', () => {
      // Arrange
      // Act
      // Assert
      expect(() => resolveOptionsWithDefaults({}, null)).toThrow("defaultOptions must be an object")
      expect(() => resolveOptionsWithDefaults({})).toThrow("defaultOptions must be an object")
      expect(() => resolveOptionsWithDefaults({}, 'hello')).toThrow("defaultOptions must be an object")

      expect(() => resolveOptionsWithDefaults(null, {})).toThrow("inputOptions must be an object")
      expect(() => resolveOptionsWithDefaults('hello', {})).toThrow("inputOptions must be an object")
    })

    it('overrides the default options if set in inputOptions', () => {
      // Arrange
      const inputOptions = {
        promiseLibrary: "myLibrary",
        settingB: {
          subSetting: true,
        }
      }
      const defaultOptions = {
        promiseLibrary: global.Promise,
        useUnifiedTopology: true,
        settingB: {
          subSetting: false,
        }
      }

      const expected = {
        promiseLibrary: "myLibrary",
        settingB: {
          subSetting: true,
        },
        useUnifiedTopology: true,
      }

      // Act
      const result = resolveOptionsWithDefaults(inputOptions, defaultOptions)

      // Assert
      expect(result).toStrictEqual(expected);
    })
  })
})