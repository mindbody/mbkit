import React, { AllHTMLAttributes, FC, RefObject, ChangeEvent, ReactElement } from 'react';
import classnames from 'classnames';
import styles from './Select.scss';

export type SelectProps = AllHTMLAttributes<HTMLSelectElement> & {
    /** This will make the selected value from the children */
    value: string;
    /** Fires when user makes a change to the select list */
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    /** Children must be of the option type */
    children: ReactElement<HTMLOptionElement>[];
};
export const Select: FC<SelectProps> = React.forwardRef((props: SelectProps, ref: RefObject<HTMLSelectElement>) => {
    const { className = '', ...rest } = props;
    const classNames = classnames({
        [styles.select]: true,
        [className]: className,
    });
    return <select {...rest} className={classNames} ref={ref} />;
});
Select.displayName = 'Select';
