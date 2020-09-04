# Testing

- [Unit Testing](unit-testing.md)
- [Component Testing](component-testing.md)

Testing your application is a vital part of serious development. There are a few
things you should test. If you've never done this before start with [unit testing](unit-testing.md).
Move on to [component testing](component-testing.md) when you feel like you
understand that!

## Usage with this boilerplate

To test your application started with this boilerplate do the following:

1.  Sprinkle `.test.js` files directly next to the parts of your application you
    want to test. (Or in `test/` subdirectories, it doesn't really matter as long
    as they are directly next to those parts and end in `.test.js`)

1.  Write your unit and component tests in those files.

1.  Run `npm run test` in your terminal and see all the tests pass! (hopefully)
