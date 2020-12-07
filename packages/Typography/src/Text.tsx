import React, { forwardRef, FC, RefObject, HTMLAttributes, RefAttributes } from 'react';
import classnames from 'classnames';
import styles from './Typography.scss';

export type TextProps = HTMLAttributes<HTMLElement> &
    RefAttributes<HTMLElement> & {
        /** This will be the actual rendered element */
        as?: React.ReactNode;
        /** Change the size of the output. See the Theme provider for what these sizes will look like */
        size?: 1 | 2 | 3 | 4 | 5 | 6 | 'body' | 'subhead' | 'body-small' | 'pre-heading' | 'table-heading';
        /** adds bold styling */
        bold?: boolean;
        /** adds italic styling */
        italic?: boolean;
        /** Sets the text color. By default we use our brand foreground */
        color?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'meta';
    };

export const Text: FC<TextProps> = forwardRef((props: TextProps, ref: RefObject<HTMLElement>) => {
    const { as = 'p' as any, color = 'default', size = 8, bold, italic, className = '', ...rest } = props;
    const Component = as;

    const classNames = classnames({
        [styles.h1]: size === 1,
        [styles.h2]: size === 2,
        [styles.h3]: size === 3,
        [styles.h4]: size === 4,
        [styles.h5]: size === 5,
        [styles.h6]: size === 6,
        [styles.subheading]: size === 'subhead',
        [styles.paragraph]: size === 'body',
        [styles.smallBodyContent]: size === 'body-small',
        [styles.preHeading]: size === 'pre-heading',
        [styles.bold]: bold,
        [styles.italic]: italic,
        [styles[`${color}Color`]]: true,
        [className]: className,
    });
    return <Component {...rest} className={classNames} ref={ref} />;
});
Text.displayName = 'Text';
