import React, { FC, forwardRef, RefObject, AllHTMLAttributes } from 'react';
import ReactCalendar, { CalendarProps, CalendarTileProperties } from 'react-calendar';
import classnames from 'classnames';
import styles from './Calendar.scss';

export type ICalendarProps = CalendarProps & AllHTMLAttributes<HTMLElement> & {};

const ChevronRight = () => (
    <svg width="24" height="24" viewBox="0 0 32 32">
        <g
            id="Icons/UI/Chevron-forward-2ABmypmGGc9_f0-NAu2Xn"
            fill="none"
            fillRule="evenodd"
            stroke="none"
            strokeWidth="1"
        >
            <path
                id="Path-2ABmypmGGc9_f0-NAu2Xn"
                fill="#54575F"
                d="M13.6053239 7.30697031c-.169535-.2179736-.1302678-.5321114.0877058-.70164642.2179736-.16953502.5321114-.13026779.7016464.0877058l7 9.00000001c.1404319.1805552.1404319.4333854 0 .6139406l-7 9c-.169535.2179736-.4836728.2572408-.7016464.0877058s-.2572408-.4836728-.0877058-.7016464L20.3665692 16l-6.7612453-8.69302969z"
            ></path>
        </g>
    </svg>
);
const ChevronLeft = () => (
    <svg width="24" height="24" viewBox="0 0 32 32">
        <g
            id="Icons/UI/Chevron-back-UpM3cETJkpZgzsWuCLjGj"
            fill="none"
            fillRule="evenodd"
            stroke="none"
            strokeWidth="1"
        >
            <path
                id="Path-UpM3cETJkpZgzsWuCLjGj"
                fill="#54575F"
                d="M18.3665692 16l-6.7612453-8.69302969c-.169535-.2179736-.1302678-.5321114.0877058-.70164642.2179736-.16953502.5321114-.13026779.7016464.0877058l7 9.00000001c.1404319.1805552.1404319.4333854 0 .6139406l-7 9c-.169535.2179736-.4836728.2572408-.7016464.0877058s-.2572408-.4836728-.0877058-.7016464L18.3665692 16z"
                transform="matrix(-1 0 0 1 30.999978 0)"
            ></path>
        </g>
    </svg>
);

export const Calendar: FC<ICalendarProps> = forwardRef((props: ICalendarProps, ref: RefObject<HTMLDivElement>) => {
    const { className = '', ...rest } = props;
    const classNames = classnames({
        [styles.calendar]: true,
        [className]: className,
    });
    return (
        <ReactCalendar
            calendarType="US"
            view="month"
            prevLabel={<ChevronLeft />}
            nextLabel={<ChevronRight />}
            // These two skip forward/backward 1 year and show up outside of month prev/next
            prev2Label={null}
            next2Label={null}
            minDetail="month"
            maxDetail="month"
            formatShortWeekday={weekDayFormatter}
            className={classNames}
            tileClassName={getTileClassNames}
            {...rest}
        />
    );
});
Calendar.displayName = 'Calendar';

function weekDayFormatter(locale: string, date: Date): string {
    return date.toLocaleDateString(locale, { weekday: 'short' }).substring(0, 2);
}
function getTileClassNames(props: CalendarTileProperties): string {
    const { date } = props;

    return classnames({
        [styles.tile]: true,
        [styles.isToday]: date.toDateString() === new Date().toDateString(),
    });
}
