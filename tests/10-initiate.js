/*!
 * Copyright (c) 2022 Digital Bazaar, Inc. All rights reserved.
 */
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
  // this will tell the report
  // to make a matrix with this suite
  this.matrix = true;
  this.report = true;
  this.implemented = [...match.keys()];
  this.notImplemented = [...nonMatch.keys()];
  this.rowLabel = 'Test Name';
  this.columnLabel = 'Exchanger';
  for(const [name, {endpoints}] of match) {
    const [exchanger] = endpoints;
    if(!exchanger) {
      throw new Error(`Vendor ${name} has no exchanger with tag ${tag}`);
    }
    describe(name, function() {
      describe('Mediated', function() {

      });
      describe('Unmediated', function() {
        it('MUST proceed if POST to initiate is valid', async function() {
          const {error, result, data} = exechanger.post({json: requestBodes.valid.get('initiate')});
        });
        for(const [invalidDataType, invalidBody] of requestBodies.invalid) {
          it(`MUST NOT procced if POST to initiate is ${invalidDataType}`, async function() {
            const {error, result, data} = exechanger.post({json: invalidBody});
          });
        }
      });
    });
  }
});
