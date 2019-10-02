import React from 'react';
import classnames from 'classnames';
import styles from './Typography.scss';

export type TextProps = {
    /** This will be the actual rendered element */
    as?: React.ReactNode;
    /** Change the size of the output. See the Theme provider for what these sizes will look like */
    size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    /** adds bold styling */
    bold?: boolean;
    /** adds italic styling */
    italic?: boolean;
    /** Sets the text color. By default we use our brand foreground */
    color?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'meta';
};

const Text: React.FC<TextProps & React.HTMLAttributes<HTMLElement>> = (
    props: TextProps & React.HTMLAttributes<HTMLElement>,
) => {
    const { as = 'p' as any, color = 'default', size = 8, bold, italic, className = '', ...rest } = props;
    const Component = as;

    const classNames = classnames({
        [styles.h1]: size === 1,
        [styles.h2]: size === 2,
        [styles.h3]: size === 3,
        [styles.h4]: size === 4,
        [styles.h5]: size === 5,
        [styles.h6]: size === 6,
        [styles.subheading]: size === 7,
        [styles.paragraph]: size === 8,
        [styles.meta]: size === 9,
        [styles.tooltip]: size === 10,
        [styles.bold]: bold,
        [styles.italic]: italic,
        [styles[`${color}Color`]]: true,
        [className]: className,
    });
    return <Component {...rest} className={classNames} />;
};

export default Text;
