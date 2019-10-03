import React from 'react';
import classnames from 'classnames';
import styles from './Typography.scss';

export type LinkProps = {
    /** This will be the actual rendered element */
    as?: React.ReactNode;
};

const Link: React.FC<LinkProps & React.HTMLAttributes<HTMLElement>> = (
    props: LinkProps & React.HTMLAttributes<HTMLElement>,
) => {
    const { as = 'a' as any, className = '', ...rest } = props;
    const Component = as;

    const classNames = classnames({
        [styles.link]: true,
        [className]: className,
    });

    return <Component {...rest} className={classNames} />;
};

export default Link;
