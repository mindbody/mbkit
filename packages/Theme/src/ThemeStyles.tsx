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
    // typescript complains if this is type `Theme` because of the mapping on when getting `nextValue` because it can't infer the type
    theme: any;
    seed?: string;
};

export function recursiveCssVariableCreator(props: RecursiveCssVariableCreator): string {
    const { theme, seed = '--' } = props;
    return Object.keys(theme)
        .map(key => {
            const nextValue = theme[key];
            if (typeof nextValue === 'object') {
                return recursiveCssVariableCreator({ theme: nextValue, seed: `${seed}${key}-` });
            }

            return `${seed}${key}: ${nextValue};`;
        })
        .join('');
}

export type ThemeStylesProps = {
    theme: Theme;
    children: ReactChild;
};
export const styleTagTestId = 'theme-styles-tag';
const ThemeStyles: React.FC<ThemeStylesProps> = (props: ThemeStylesProps) => {
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
