export const shouldBeHTTPError = error => {
  error.should.be.an.instanceOf(Error, 'Expected error to be an Error.');
  // expect the name to be HTTPError
  error.should.have.property('name', 'HTTPError');
  // expect that at least the request occurred
  error.should.have.property('request');
};
