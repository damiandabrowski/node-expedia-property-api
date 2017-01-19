# node-expedia-property-api

## Features

- Onboard property
- Fetch property onboarding status

## Installing

Using npm:

```bash
$ npm install node-expedia-property-api
```

## Example

Fetch property onboarding status

```js
const ExpediaApi = require('node-expedia-property-api');


let eapi = new ExpediaApi({
    username: 'TEST',
    password: 'test',
    account: 'TEST_PARTNER',
    test: true
});

eapi.getPropertyStatus(123123).then(response=>{
    console.log(response.data);
})


```