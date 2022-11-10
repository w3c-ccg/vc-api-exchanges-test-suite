/*!
 * Copyright (c) 2022 Digital Bazaar, Inc. All rights reserved.
 */
import chai from 'chai';

const should = chai.should();

export const shouldBeQuery = data => {
  should.exist(data, 'Expected query to exist.');
  data.should.be.an('object', 'Expected query to be an object');
  data.should.have.property('type');
  Object.keys(data).length.should.be.gte(
    2,
    'Expected query to have at least 2 properties.'
  );
};

export const shouldBeVerifiablePresentationRequest = data => {
  data.should.be.an('object', 'Expected data to be an object.');
  data.should.have.property('verifiablePresentationRequest');
  const {verifiablePresentationRequest} = data;
  verifiablePresentationRequest.should.be.an(
    'object',
    'Expected verifiablePresentationRequest to be an object.'
  );
  verifiablePresentationRequest.should.have.property('query');
  const {query} = verifiablePresentationRequest;
  const queryArray = Array.isArray(query) ? query : [query];
  queryArray.forEach(q => shouldBeQuery(q));
  verifiablePresentationRequest.should.have.property('interact');
  const {interact} = verifiablePresentationRequest;
  interact.should.be.an('object', 'Expected interact to be an object.');
};

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
