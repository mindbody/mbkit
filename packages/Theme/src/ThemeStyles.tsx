import React, { ReactChild } from 'react';
import ReactDOM from 'react-dom';
import ThemeContext, { Theme } from './ThemeContext';

export const Head: React.FC = props => {
    if (typeof window === `undefined`) {
        return <>{props.children}</>;
    }
    return ReactDOM.createPortal(props.children, document.head);
};

export type RecursiveCssVariableCreator = {
    theme: {};
    seed?: string;
};

export function recursiveCssVariableCreator(props: RecursiveCssVariableCreator): string {
    const { theme, seed = '--' } = props;
    return Object.keys(theme)
        .map(key => {
            // Ignoring error due to "no implicit any". TypeScript doesn't
            // know if the `nextValue` is an object or string
            // @ts-ignore
            const nextValue = theme[key];
            if (typeof nextValue === 'object') {
                return recursiveCssVariableCreator({ theme: nextValue, seed: `${seed}${key}-` });
            }

            return `${seed}${key}: ${nextValue};`;
        })
        .join('');
}

export type ThemeStyles = {
    theme: Theme;
    children: ReactChild;
};
export const styleTagTestId = 'theme-styles-tag';
const ThemeStyles: React.FC<ThemeStyles> = (props: ThemeStyles) => {
    const { children } = props;
    const { theme } = React.useContext(ThemeContext);
    const cssVariables = recursiveCssVariableCreator({ theme });
    const themeClassScope = `ThemeProvider_${theme.name.replace(/ /g, '-')}`;
    const styles = `.${themeClassScope} { ${cssVariables} }`;

    return (
        <>
            <Head>
                <style type="text/css" data-testid={styleTagTestId}>
                    {styles}
                </style>
            </Head>

            <span className={themeClassScope}>{children}</span>
        </>
    );
};

export default ThemeStyles;
