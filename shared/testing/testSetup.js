const { cleanup } = require('@testing-library/react');

global.afterEach(() => {
    expect.hasAssertions();
    jest.resetAllMocks();
    cleanup();
});
