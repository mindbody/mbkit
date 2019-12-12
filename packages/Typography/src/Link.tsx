import React, { HTMLAttributes, RefObject, RefAttributes } from 'react';
import classnames from 'classnames';
import styles from './Typography.scss';

export type LinkProps = HTMLAttributes<HTMLElement> &
    RefAttributes<HTMLElement> & {
        /** This will be the actual rendered element */
        as?: React.ReactNode;
    };

export const Link: React.FC<LinkProps> = React.forwardRef((props: LinkProps, ref: RefObject<any>) => {
    const { as = 'a', className = '', ...rest } = props;
    const Component = as as any;

    const classNames = classnames({
        [styles.link]: true,
        [className]: className,
    });

    return <Component {...rest} className={classNames} ref={ref} />;
});
