// FIXME we need to decide on what the initial request body
// should look like
const initiateExchange = {

};

const continuePresentation = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://www.w3.org/2018/credentials/examples/v1',
    'https://w3id.org/security/suites/ed25519-2020/v1'
  ],
  type: ['VerifiablePresentation'],
  holder: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
  verifiableCredential: [{
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      'https://www.w3.org/2018/credentials/examples/v1',
      'https://w3id.org/security/suites/ed25519-2020/v1'
    ],
    id: 'http://example.edu/credentials/3732',
    type: [
      'VerifiableCredential',
      'UniversityDegreeCredential'
    ],
    issuer: 'https://example.edu/issuers/14',
    issuanceDate: '2010-01-01T19:23:24Z',
    expirationDate: '2022-01-01T19:23:24Z',
    credentialSubject: {
      id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
      degree: {
        type: 'BachelorDegree',
        name: 'Bachelor of Science and Arts'
      }
    },
    refreshService: {
      type: 'AutoRefresh2021',
      url: 'https://example.edu/exchanges/refresh-degree',
      validAfter: '2021-09-01T19:23:24Z'
    },
    proof: {
      type: 'Ed25519Signature2020',
      created: '2021-12-05T17:59:45Z',
      verificationMethod: 'https://example.edu/issuers/14#key-1',
      proofPurpose: 'assertionMethod',
      proofValue: 'z2aArNcQKX9aqYK7GRZmV7c9xfGuwB5YAXhkYY9DTvLdTCQEsXaNpz1G' +
                     'ZL9XDXdFQGT27WB68e2Y3wo9k75rka8oo'
    }
  }],
  proof: {
    type: 'Ed25519Signature2020',
    created: '2022-06-15T16:37:12Z',
    verificationMethod: 'did:example:76e12ec712ebc6f1c221ebfeb1f#key-1',
    proofPurpose: 'authentication',
    challenge: '3182bdea-63d9-11ea-b6de-3b7c1404d57f',
    domain: 'example.edu',
    proofValue: 'z4aU6NSpnCvnjJqzAPw3cqJ1LKoWimEWxKz7StJYzwaZE2a3QAuK8vcq' +
                   'umwr6uabr7RshvjH1yTv1fTuhPUii1fN'
  }
};

export const requestBodies = {
  valid: new Map([
    ['initiate', {...initiateExchange}],
    ['continue', {...continuePresentation}]
  ]),
  invalid: new Map([
    ['a string', 'stringBody'],
    ['null', null],
    ['an array', []],
    ['a number', 5]
  ])
};
