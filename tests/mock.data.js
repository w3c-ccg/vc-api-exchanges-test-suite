export const credentialsQuery = {

};

export const requestBodies = {
  valid: new Map(['initiate', ...credentialsQuery]),
  invalid: new Map([
    ['a string', 'stringBody'],
    ['null', null],
    ['undefined', undefined]
      ['an array', []],
    ['a number', 5]
  ])
};
