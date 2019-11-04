import React, { FC, HTMLAttributes, forwardRef, RefObject, ReactNode } from 'react';
import classnames from 'classnames';
import styles from './Card.scss';

export type CardProps = HTMLAttributes<HTMLElement> & {
    as?: ReactNode;
    elevation?: 0 | 1 | 2 | 3 | 4;
};
export const Card: FC<CardProps> = forwardRef((props: CardProps, ref: RefObject<HTMLElement>) => {
    const { as = 'div' as any, elevation = 1, className = '', ...rest } = props;
    const Component = as;

    const classNames = classnames({
        [styles.card]: true,
        [styles[`elevation${elevation}`]]: true,
        [className]: className,
    });
    return <Component {...rest} className={classNames} ref={ref} />;
});
Card.displayName = 'Card';
