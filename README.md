# Angular Insight

A simple Angular directive to select things

## Build Angular Insight

* Clone this repository
* Run `npm install`
* Run `bower install`
* Run `npm run bundle` to build using browserify

## Launch the example app

Run `npm run live-reload:<example-name>` to launch the example using beefy. For example:

```sh
$ npm run live-reload:basic
```

The app will be available at http://localhost:9966/examples

## Testing

### Unit

Unit tests run in the Karma test runner. To run tests:

```sh
$ npm test
```

### End to end

End to end tests are run using Protractor and a running web server. To run tests:

```sh
$ npm run live-reload:form
$ npm run test:e2e
```

## License

MIT
