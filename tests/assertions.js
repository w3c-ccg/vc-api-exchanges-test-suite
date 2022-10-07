export const shouldBeHTTPError = error => {
  error.should.be.an('object', 'Expected error to be an object.');
  // expect the name to be HTTPError
  error.should.have.property('name', 'HTTPError');
  // expect that at least the request occured
  error.have.property('request');
  error.request.should.be.an(
    'object',
    'Expected "error.request" to be an object.'
  );
};
