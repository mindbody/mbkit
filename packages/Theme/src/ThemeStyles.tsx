import React, { ReactChild } from 'react';
import ReactDOM from 'react-dom';
import { ThemeContext } from './ThemeContext';
import { recursiveCssVariableCreator } from './tools/recursive-css-variable-creator';

export const Head: React.FC = props => {
    if (typeof window === `undefined`) {
        return <>{props.children}</>;
    }
    return ReactDOM.createPortal(props.children, document.head);
};

export type ThemeStylesProps = {
    children: ReactChild;
};
export const styleTagTestId = 'theme-styles-tag';
export const ThemeStyles: React.FC<ThemeStylesProps> = (props: ThemeStylesProps) => {
    const { children } = props;
    const { theme } = React.useContext(ThemeContext);
    const cssVariables = recursiveCssVariableCreator({ theme });
    const themeClassScope = `ThemeProvider_${theme.name.replace(/ /g, '-')}`;
    const fontImport = theme.font.url ? `@import url(${theme.font.url})` : '';
    const styles = `.${themeClassScope} { ${cssVariables} } ${fontImport}`;

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
