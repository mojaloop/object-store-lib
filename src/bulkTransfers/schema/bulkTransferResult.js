/*****
 License
 --------------
 Copyright © 2020-2025 Mojaloop Foundation
 The Mojaloop files are made available by the Mojaloop Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Mojaloop Foundation for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.

 * Mojaloop Foundation
 - Name Surname <name.surname@mojaloop.io>

 * ModusBox
 - Georgi Georgiev <georgi.georgiev@modusbox.com>
 - Miguel de Barros <miguel.debarros@modusbox.com>
 --------------
 ******/
'use strict'

const mongoose = require('../../lib/mongodb').Mongoose

const TransferResult = require('./individualTransferResult').TransferResult
// Disabled writing to ML Object Store (individualTransferResults) as it is not used:
// const IndividualTransferResultModelFactory = require('../models/individualTransferResult')

let BulkTransferResultSchema = null

const getBulkTransferResultSchema = () => {
  if (!BulkTransferResultSchema) {
    // Disabled writing to ML Object Store (individualTransferResults) as it is not used:
    // let IndividualTransferResultModel = IndividualTransferResultModelFactory.getIndividualTransferResultModel()
    BulkTransferResultSchema = new mongoose.Schema({
      messageId: { type: String, required: true },
      destination: { type: String, required: true },
      headers: {
        type: Object, required: true
      },
      bulkTransferId: {
        type: String, required: true, index: true
      },
      bulkTransferState: {
        type: String, required: true
      },
      completedTimestamp: {
        type: Date
      },
      individualTransferResults: [new mongoose.Schema(Object.assign({
        _id: false
      }, TransferResult))],
      extensionList: {
        extension: [{
          _id: false,
          key: String,
          value: String
        }]
      }
    })
    BulkTransferResultSchema.index({ messageId: 1, destination: 1 }, { unique: true })
    /**
     * Disabled writing to ML Object Store (individualTransferResults) as it is not used:
     */
    // BulkTransferResultSchema.pre('save', function () {
    //   try {
    //     this.individualTransferResults.forEach(async transfer => {
    //       try {
    //         if (!transfer._doc.extensionList.extension.length) {
    //           delete transfer._doc.extensionList
    //         }
    //         let individualTransferResult = new IndividualTransferResultModel({
    //           _id_bulkTransferResults: this._id,
    //           messageId: this.messageId,
    //           destination: this.destination,
    //           bulkTransferId: this.bulkTransferId,
    //           payload: transfer._doc
    //         })
    //         await individualTransferResult.save()
    //       } catch (e) {
    //         throw e
    //       }
    //     })
    //     if (!this.extensionList.extension.length) {
    //       delete this._doc.extensionList
    //     }
    //   } catch (e) {
    //     throw (e)
    //   }
    // })
  }
  return BulkTransferResultSchema
}

module.exports = {
  getBulkTransferResultSchema
}
