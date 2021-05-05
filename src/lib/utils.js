
/**
 * @function resolveOptionsWithDefaults
 * @description Given a set of options and default options, combine into
 *   one set of options, overriding the defaultOptions if necessary.
 *
 *    Note: This only combines 1 level deep - nested defaults will be overriden by the input options
 * @param {*} inputOptions
 * @param {*} defaultOptions
 */
function resolveOptionsWithDefaults (inputOptions, defaultOptions) {
  if (typeof defaultOptions !== 'object' || defaultOptions === null) {
    throw new Error('defaultOptions must be an object')
  }

  if (typeof inputOptions !== 'object' || inputOptions === null) {
    throw new Error('inputOptions must be an object')
  }

  return {
    ...defaultOptions,
    ...inputOptions
  }
}

module.exports = {
  resolveOptionsWithDefaults
}
