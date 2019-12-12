import React, { FC, RefObject, forwardRef, AllHTMLAttributes, RefAttributes } from 'react';
import classnames from 'classnames';
import styles from './Radio.scss';

export type RadioProps = AllHTMLAttributes<HTMLInputElement> &
    RefAttributes<HTMLInputElement> & {
        /** Controls whether the radio is checked */
        checked: boolean;
        /** Fires each time the user interacts with the input */
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        /** Shows red border */
        invalid?: boolean;
    };
export const Radio: FC<RadioProps> = forwardRef((props: RadioProps, ref: RefObject<HTMLInputElement>) => {
    const { className = '', invalid, ...rest } = props;
    const classNames = classnames({
        [styles.radio]: true,
        [styles.invalid]: invalid,
        [className]: className,
    });
    return <input type="radio" className={classNames} aria-invalid={invalid} ref={ref} {...rest} />;
});
Radio.displayName = 'Radio';
