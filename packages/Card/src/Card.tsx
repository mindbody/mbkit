import React, { FC, forwardRef, RefObject, ReactNode, AllHTMLAttributes } from 'react';
import classnames from 'classnames';
import styles from './Card.scss';

export type CardProps = AllHTMLAttributes<HTMLElement> & {
    as?: ReactNode;
};
export const Card: FC<CardProps> = forwardRef((props: CardProps, ref: RefObject<HTMLElement>) => {
    const { as = 'div' as any, className = '', ...rest } = props;
    const Component = as;

    const classNames = classnames({
        [styles.card]: true,
        [className]: className,
    });
    return <Component {...rest} className={classNames} ref={ref} />;
});
Card.displayName = 'Card';