import React, { AllHTMLAttributes, ChangeEvent, FC, forwardRef, RefObject } from 'react';
import classnames from 'classnames';
import styles from './Toggle.scss';

export type ToggleProps = AllHTMLAttributes<HTMLInputElement> & {
    checked: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    size?: 1 | 2;
};
export const Toggle: FC<ToggleProps> = forwardRef((props: ToggleProps, ref: RefObject<HTMLInputElement>) => {
    const { className = '', size = 1, ...rest } = props;
    const classNames = classnames({
        [styles.toggle]: true,
        [styles[`size${size}`]]: true,
        [className]: className,
    });
    return <input {...rest} className={classNames} ref={ref} type="checkbox" />;
});
Toggle.displayName = 'Toggle';
