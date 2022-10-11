/*!
 * Copyright (c) 2022 Digital Bazaar, Inc. All rights reserved.
 */
import chai from 'chai';

const should = chai.should();

export const shouldBeHTTPError = error => {
  error.should.be.an.instanceOf(Error, 'Expected error to be an Error.');
  // expect the name to be HTTPError
  error.should.have.property('name', 'HTTPError');
  // expect that at least the request occurred
  error.should.have.property('request');
};

export const shouldBeInitiateResponse = ({error, data, result}) => {
  should.not.exist(error, 'Expected exchanger to return a result.');
  should.exist(result, 'Expected a result from exchanger.');
  should.exist(data, 'Expected data from exchanger.');
  data.should.be.an('object', 'Expected data to be an object.');
};
