import React, { FC, forwardRef, RefObject, AllHTMLAttributes } from 'react';
import classnames from 'classnames';
import styles from './Label.scss';

export type LabelProps = AllHTMLAttributes<HTMLLabelElement>;
export const Label: FC<LabelProps> = forwardRef((props: LabelProps, ref: RefObject<HTMLLabelElement>) => {
    const { className = '', ...rest } = props;
    const classNames = classnames({
        [styles.label]: true,
        [className]: className,
    });
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    return <label {...rest} className={classNames} ref={ref} />;
});
Label.displayName = 'Label';
