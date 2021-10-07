import React, { AllHTMLAttributes, FC, forwardRef, RefAttributes, RefObject, useState } from 'react';
import { Input, InputProps } from '@mbkit/input';
import { Calendar } from '@mbkit/calendar';
import { CalendarProps } from 'react-calendar';

import styles from './DatePicker.scss';
import classnames from 'classnames';

export type DatePickerProps = AllHTMLAttributes<HTMLDivElement> &
    RefAttributes<HTMLDivElement> & {
        /** When the datepicker is set to be displayed, the screen reader will read this to the assistive technology */
        label: string;
        // this is props for input component
        inputProps?: InputProps;
    };

export const DatePicker: FC<DatePickerProps> = forwardRef((props: DatePickerProps, ref: RefObject<HTMLDivElement>) => {
    const { className = '', inputProps, ...rest } = props;
    const [show, setShow] = useState(false);
    const [date, setDate] = useState('');
    const showPlaceholder = date === '';

    const classNames = classnames({
        [styles.placeHolder]: showPlaceholder,
        [className]: className,
    });
    console.log(inputProps?.placeholder);
    function toggleCalendar(date: any) {
        setDate(date);
        setShow(false);
    }
    return (
        <div
            {...rest}
            className={styles.datePicker}
            onKeyDown={event => {
                if (event.key === 'Escape') {
                    event.stopPropagation();
                    setShow(false);
                }
            }}
        >
            <Input
                {...inputProps}
                value={date ? new Date(date).toDateString() : ''}
                placeholder={inputProps?.placeholder}
                onClick={() => setShow(!show)}
                onChange={() => {}}
                className={classNames}
            />
            {show && <Calendar onChange={date => toggleCalendar(date)} />}
        </div>
    );
});
DatePicker.displayName = 'DatePicker';
