import React, { FC, RefObject, forwardRef, AllHTMLAttributes } from 'react';
import classnames from 'classnames';
import styles from './Radio.scss';

export type RadioProps = AllHTMLAttributes<HTMLInputElement> & {
    checked: boolean;
};
export const Radio: FC<RadioProps> = forwardRef((props: RadioProps, ref: RefObject<HTMLInputElement>) => {
    const { className = '', ...rest } = props;
    const classNames = classnames({
        [styles.radio]: true,
        [className]: className,
    });
    return <input type="radio" className={classNames} ref={ref} {...rest} />;
});
Radio.displayName = 'Radio';
