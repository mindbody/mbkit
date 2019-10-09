import React from 'react';
import classnames from 'classnames';
import styles from './Typography.scss';

export type HeadingProps = {
    /** This will be the actual rendered element. Keep your headings and content semantic */
    as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    /** Use this when you need to render some heading element but it needs to look a different size */
    size?: 1 | 2 | 3 | 4 | 5 | 6;
    /** Sets the text color. By default we use our brand foreground */
    color?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'meta';
};
export const Heading: React.FC<HeadingProps & React.HtmlHTMLAttributes<HTMLHeadingElement>> = (
    props: HeadingProps & React.HtmlHTMLAttributes<HTMLHeadingElement>,
) => {
    const { as, className = '', color = 'default', size, ...rest } = props;
    const Component = as;
    const computedSize = size !== undefined ? `h${size}` : as;

    const classNames = classnames({
        [styles.h1]: computedSize === 'h1',
        [styles.h2]: computedSize === 'h2',
        [styles.h3]: computedSize === 'h3',
        [styles.h4]: computedSize === 'h4',
        [styles.h5]: computedSize === 'h5',
        [styles.h6]: computedSize === 'h6',
        [styles.bold]: true,
        [styles[`${color}Color`]]: true,
        [className]: className,
    });

    return <Component {...rest} className={classNames} />;
};
