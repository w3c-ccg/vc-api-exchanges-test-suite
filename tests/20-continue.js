/*!
 * Copyright (c) 2022 Digital Bazaar, Inc. All rights reserved.
 */
import chai from 'chai';
import {endpoints} from 'vc-api-test-suite-implementations';

const should = chai.should();
const tag = 'vc-api-exchangers';
const {
  match,
  nonMatch
} = endpoints.filterByTag({property: 'exchangers', tags: [tag]});

describe('Continue Exchange', function() {
  describe('Mediated', function() {

  });
  describe('Unmediated', function() {

  });
});
