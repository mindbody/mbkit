import React, { AllHTMLAttributes, FC, RefObject, ChangeEvent, RefAttributes } from 'react';
import classnames from 'classnames';
import styles from './Select.scss';

export type SelectProps = AllHTMLAttributes<HTMLSelectElement> &
    RefAttributes<HTMLSelectElement> & {
        /** This will make the selected value from the children */
        value: string;
        /** Fires when user makes a change to the select list */
        onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
        /** Sets red border on select input */
        invalid?: boolean;
    };
export const Select: FC<SelectProps> = React.forwardRef((props: SelectProps, ref: RefObject<HTMLSelectElement>) => {
    const { className = '', invalid, ...rest } = props;
    const classNames = classnames({
        [styles.select]: true,
        [styles.invalid]: invalid,
        [className]: className,
    });
    return <select {...rest} className={classNames} ref={ref} />;
});
Select.displayName = 'Select';
