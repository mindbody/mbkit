import React, { FC, forwardRef, RefObject, AllHTMLAttributes, RefAttributes, ReactElement } from 'react';
import classnames from 'classnames';
import styles from './Card.scss';

export type CardProps = RefAttributes<HTMLElement> &
    AllHTMLAttributes<HTMLElement> & {
        as?: ReactElement;
    };
export const Card: FC<CardProps> = forwardRef((props: CardProps, ref: RefObject<HTMLElement>) => {
    const { as = 'div', className = '', ...rest } = props;
    const Component: any = as;

    const classNames = classnames({
        [styles.card]: true,
        [className]: className,
    });
    return <Component {...rest} className={classNames} ref={ref} />;
});
Card.displayName = 'Card';
