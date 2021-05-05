/*****
 License
 --------------
 Copyright © 2017 Bill & Melinda Gates Foundation
 The Mojaloop files are made available by the Bill & Melinda Gates Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.

 * Gates Foundation
 - Name Surname <name.surname@gatesfoundation.com>

 * Miguel de Barros <miguel.debarros@modusbox.com>
 * Valentin Genev <valentin.genev@modusbox.com>
 * Lewis Daly <lewisd@crosslaketech.com>
 --------------
 ******/
'use strict'

const Mongoose = require('mongoose')
const Logger = require('@mojaloop/central-services-logger')

const { resolveOptionsWithDefaults } = require('./utils')

Mongoose.connection.on('error', (err) => { Logger.info('MongoDB connection error ', err) })
Mongoose.connection.once('open', function callback () {
  Logger.info('MongoDB succesfully connected')
})

Mongoose.set('useFindAndModify', false)
Mongoose.set('useNewUrlParser', true)
Mongoose.set('useCreateIndex', true)

exports.Mongoose = Mongoose
exports.db = Mongoose.connection

/**
 * @function connect
 * @description connects to the MongoDb Server
 * @param {String} uri - The uri string to connect to
 * @param {ConnectionOptions} options - Connection options to pass to Mongoose.
 *   Defaults to:
 *   {
 *     promiseLibrary: global.Promise,
 *     useUnifiedTopology: true,
 *   }
 *   see https://mongoosejs.com/docs/api.html#mongoose_Mongoose-connect
 *   and http://mongodb.github.io/node-mongodb-native/3.0/api/MongoClient.html
 *   for all available options.
 */
exports.connect = (uri, options = {}) => {
  const defaultOptions = {
    promiseLibrary: global.Promise,
    useUnifiedTopology: true
  }

  const resolvedOptions = resolveOptionsWithDefaults(options, defaultOptions) 
  Logger.verbose(`connecting to mongodb with uri: ${uri} and options: ${JSON.stringify(resolvedOptions)}`)

  return Mongoose.connect(uri, resolvedOptions)
}
