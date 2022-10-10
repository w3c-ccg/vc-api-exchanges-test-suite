/*!
 * Copyright (c) 2022 Digital Bazaar, Inc. All rights reserved.
 */
import chai from 'chai';
import {endpoints} from 'vc-api-test-suite-implementations';
import {requestBodies} from './mock.data.js';
import {shouldBeHTTPError} from './assertions.js';

const should = chai.should();
const tag = 'vc-api-exchangers';
const {
  match,
  nonMatch
} = endpoints.filterByTag({property: 'exchangers', tags: [tag]});

describe('Initiate Exchange', function() {
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
        it('MUST proceed if POST to initiate is valid', async function() {
          this.test.cell = {columnId, rowId: this.test.title};
          const {
            error,
            result,
            data
          } = await exchanger.post({json: requestBodies.valid.get('initiate')});
          should.not.exist(error, 'Expected exchanger to return a result.');
          should.exist(result, 'Expected a result from exchanger.');
          should.exist(data, 'Expected data from exchanger.');
          data.should.be.an('object', 'Expected data to be an object.');
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
