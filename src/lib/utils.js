


/**
 * @function resolveOptionsWithDefaults
 * @description Given a set of options and default options, combine into 
 *   one set of options, overriding the defaultOptions if necessary.
 * @param {*} inputOptions 
 * @param {*} defaultOptions 
 */
function resolveOptionsWithDefaults(inputOptions, defaultOptions) {
  return {
    ...defaultOptions,
    ...inputOptions
  }
}


module.exports = {
  resolveOptionsWithDefaults
}