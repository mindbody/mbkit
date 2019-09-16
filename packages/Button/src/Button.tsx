import React from 'react';
import styles from './Button.module.scss';
import classnames from 'classnames';

export type IProps = {
    /** Makes the background of the button red if true */
    makeBgRed: boolean;
    /** Makes the button bigger in size */
    big?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

const Button: React.FC<IProps> = (props: IProps) => {
    const { makeBgRed = false, big = false, className = '', ...rest } = props;
    const buttonClassNames = classnames({
        [styles.button]: true,
        [styles.redBg]: makeBgRed,
        [styles.big]: big,
        [className]: className !== '',
    });
    return <button {...rest} className={buttonClassNames} />;
};

export default Button;
