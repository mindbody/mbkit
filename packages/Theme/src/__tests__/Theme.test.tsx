import React from 'react';
import { render } from '@testing-library/react';
import { baseTheme } from '../ThemeContext';
import { styleTagTestId, recursiveCssVariableCreator } from '../ThemeStyles';
import { ThemeConsumer, ThemeContext, ThemeProvider } from '../index';

describe('Theme', () => {
    describe('ThemeContext', () => {
        it('should allow user to consume as a hook and get theme', () => {
            const spy = jest.fn();
            const Test = () => {
                const { theme } = React.useContext(ThemeContext);
                spy(theme);
                return <div />;
            };
            render(<Test />);
            expect(spy).toHaveBeenCalledWith(baseTheme);
        });
    });
    describe('ThemeProvider', () => {
        it('should render and provide the default theme', () => {
            const spy = jest.fn();
            render(<ThemeProvider>{spy}</ThemeProvider>);

            expect(spy).toHaveBeenCalledWith({ theme: baseTheme });
        });
        it('should allow react child to render without render props', () => {
            const Child = () => <div data-testid="testchild">Test</div>;
            const { getByTestId } = render(
                <ThemeProvider>
                    <Child />
                </ThemeProvider>,
            );
            expect(getByTestId('testchild').textContent).toBe('Test');
        });
        it('should render with a style tag', () => {
            const holdError = console.error;
            // disabling error warning for this test because it's rendering the component in the head
            // so it can assert that the style tag exists
            console.error = () => {};
            const { getByTestId } = render(<ThemeProvider>Hello</ThemeProvider>, { container: document.head });
            expect(getByTestId(styleTagTestId)).toBeTruthy();

            console.error = holdError;
        });
        describe('custom themes', () => {
            it('should allow user to pass custom theme and it is what is consumed', () => {
                const customTheme = {
                    ...baseTheme,
                    name: 'Custom Theme Name',
                    foreground: 'red',
                };
                const spy = jest.fn();

                render(<ThemeProvider theme={customTheme}>{spy}</ThemeProvider>);

                expect(spy).toHaveBeenCalledWith({ theme: customTheme });
            });
            it('should allow user to pass custom theme and it is what is consumed with context', () => {
                const customTheme = {
                    ...baseTheme,
                    name: 'Custom Theme Name',
                    foreground: 'red',
                };
                const spy = jest.fn();
                const Test = () => {
                    const { theme } = React.useContext(ThemeContext);
                    spy(theme);
                    return <div />;
                };

                render(
                    <ThemeProvider theme={customTheme}>
                        <Test />
                    </ThemeProvider>,
                );
                expect(spy).toHaveBeenCalledWith(customTheme);
            });
        });
    });
    describe('ThemeConsumer', () => {
        it('should render as render function with theme', () => {
            const spy = jest.fn();
            render(<ThemeConsumer>{spy}</ThemeConsumer>);

            expect(spy).toHaveBeenCalledWith({ theme: baseTheme });
        });
    });

    describe('CSS Variables Generator', () => {
        it('should create a string of CSS variable definitions and return it based on a theme object', () => {
            const theme = {
                name: 'test',
                primary: {
                    500: '#fff',
                    nested: {
                        test: 'red',
                    },
                },
            };
            const expectedOutput = `--name: test;--primary-500: #fff;--primary-nested-test: red;`;
            const cssVariableString = recursiveCssVariableCreator({ theme });
            expect(cssVariableString).toBe(expectedOutput);
        });
        it(`should create a string of CSS variable with seed when it's provided`, () => {
            const theme = {
                name: 'test',
                primary: {
                    500: '#fff',
                    nested: {
                        test: 'red',
                    },
                },
            };
            const seed = '--test-';
            const expectedOutput = `--test-name: test;--test-primary-500: #fff;--test-primary-nested-test: red;`;
            const cssVariableString = recursiveCssVariableCreator({ theme, seed });
            expect(cssVariableString).toBe(expectedOutput);
        });
    });
});
