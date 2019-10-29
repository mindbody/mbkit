const { cleanup } = require('@testing-library/react');

global.afterEach(() => {
    expect.hasAssertions();
    cleanup();
});
