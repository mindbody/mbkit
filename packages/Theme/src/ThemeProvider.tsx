import React, { ReactNode } from 'react';
import ThemeStyles from './ThemeStyles';
import ThemeContext, { Theme, baseTheme } from './ThemeContext';

export type ThemeProviderProps = {
    /** Theme object of colors */
    theme?: Theme;
    /** A render function or valid React child */
    children: ReactNode | ((props: { theme: Theme }) => ReactNode);
};

const ThemeProvider: React.FC<ThemeProviderProps> = (props: ThemeProviderProps) => {
    const { theme = baseTheme, children } = props;
    const child = typeof children === 'function' ? children({ theme }) : children;

    return (
        <ThemeContext.Provider value={{ theme }}>
            <ThemeStyles>{child}</ThemeStyles>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
