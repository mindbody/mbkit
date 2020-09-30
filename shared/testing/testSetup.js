require('@testing-library/jest-dom');
const { cleanup } = require('@testing-library/react');

global.afterEach(() => {
    expect.hasAssertions();
    jest.resetAllMocks();
    cleanup();
});
