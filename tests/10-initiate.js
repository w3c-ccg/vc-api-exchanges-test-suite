/*!
 * Copyright (c) 2022 Digital Bazaar, Inc. All rights reserved.
 */
import {shouldBeHTTPError, shouldBeInitiateResponse} from './assertions.js';
import chai from 'chai';
import {endpoints} from 'vc-api-test-suite-implementations';
import {requestBodies} from './mock.data.js';

const should = chai.should();
const tag = 'vc-api-exchangers';
const {
  match,
  nonMatch
} = endpoints.filterByTag({property: 'exchangers', tags: [tag]});

describe('Initiate Exchange', function() {
  // FIXME implement mediated tests using either webdriver or karma
  describe('Mediated', function() {
    // this will tell the report
    // to make a matrix with this suite
    this.matrix = true;
    this.report = true;
    this.implemented = [...match.keys()];
    this.notImplemented = [...nonMatch.keys()];
    this.rowLabel = 'Test Name';
    this.columnLabel = 'Exchanger';
  });
  describe('Unmediated', function() {
    // this will tell the report
    // to make a matrix with this suite
    this.matrix = true;
    this.report = true;
    this.implemented = [...match.keys()];
    this.notImplemented = [...nonMatch.keys()];
    this.rowLabel = 'Test Name';
    this.columnLabel = 'Exchanger';
    for(const [columnId, {endpoints}] of match) {
      const [exchanger] = endpoints;
      if(!exchanger) {
        throw new Error(`Vendor ${columnId} has no exchanger with tag ${tag}`);
      }
      describe(columnId, function() {
        it('MUST proceed if POST to /exchanges/:exchangeId/ is valid',
          async function() {
            this.test.cell = {columnId, rowId: this.test.title};
            const {
              error,
              result,
              data
            } = await exchanger.post(
              {json: requestBodies.valid.get('initiate')});
            shouldBeInitiateResponse({error, result, data});
          });
        for(const [invalidDataType, invalidBody] of requestBodies.invalid) {
          it(`MUST NOT proceed if POST to initiate is ${invalidDataType}`,
            async function() {
              this.test.cell = {columnId, rowId: this.test.title};
              const {result, error} = await exchanger.post({json: invalidBody});
              should.not.exist(
                result,
                `Expected exchanger to error when body is ${invalidDataType}`
              );
              should.exist(
                error,
                `Expected exchanger to error when body is ${invalidDataType}`
              );
              shouldBeHTTPError(error);
              error.should.have.property('status', 400);
            });
        }
      });
    }
  });
});
