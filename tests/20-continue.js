/*!
 * Copyright (c) 2022 Digital Bazaar, Inc. All rights reserved.
 */
import {
  shouldBeHTTPError,
  shouldBeVerifiablePresentationRequest
} from './assertions.js';
import chai from 'chai';
import {endpoints} from 'vc-api-test-suite-implementations';
import {requestBodies} from './mock.data.js';

const should = chai.should();
const tag = 'vc-api-exchangers';
const {
  match,
  nonMatch
} = endpoints.filterByTag({property: 'exchangers', tags: [tag]});

describe('Continue Exchange', function() {
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
        let service;
        let setupData;
        before(async function() {
          const {
            error,
            data
          } = await exchanger.post({json: requestBodies.valid.get('initiate')});
          if(error) {
            console.error(columnId, error);
            throw error;
          }
          setupData = data;
          const services =
            setupData.verifiablePresentationRequest?.interact?.service || [];
          service = services.find(
            s => s.serviceEndpoint.includes(exchanger.settings.endpoint));
        });
        it('MUST return a Verifiable Presentation Request', function() {
          shouldBeVerifiablePresentationRequest(setupData);
        });
        it('SHOULD continue using /exchanges/:exchangeId/:transactionId',
          async function() {
            this.test.cell = {columnId, rowId: this.test.title};
            const {result, error, data} = await exchanger.post({
              url: service.serviceEndpoint,
              json: requestBodies.valid.get('continue')
            });
            should.not.exist(error, 'Expected transaction to not error');
            should.exist(result, 'Expected a result');
            should.exist(data, 'Expected data');
          });
        for(const [testName, json] of requestBodies.invalid) {
          it(`MUST NOT continue if post /:transactionId body is ${testName}`,
            async function() {
              this.test.cell = {columnId, rowId: this.test.title};
              const {result, error} = await exchanger.post({
                url: service.serviceEndpoint,
                json
              });
              should.not.exist(
                result,
                `Expected exchanger to error when body is ${testName}`
              );
              should.exist(
                error,
                `Expected exchanger to error when body is ${testName}`
              );
              shouldBeHTTPError(error);
              error.should.have.property('status', 400);
            });
        }
        for(const [testName, json] of requestBodies.continue.invalid) {
          it(`MUST NOT continue if post /:transactionId body has ${testName}`,
            async function() {
              this.test.cell = {columnId, rowId: this.test.title};
              const {result, error} = await exchanger.post({
                url: service.serviceEndpoint,
                json
              });
              should.not.exist(
                result,
                `Expected exchanger to error when body is ${testName}`
              );
              should.exist(
                error,
                `Expected exchanger to error when body is ${testName}`
              );
              shouldBeHTTPError(error);
              error.should.have.property('status', 400);
            });
        }
      });
    }
  });
});
