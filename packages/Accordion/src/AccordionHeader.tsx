import React, { FC, forwardRef, HTMLProps, useContext, AllHTMLAttributes, KeyboardEvent, MouseEvent } from 'react';
import classnames from 'classnames';
import { AccordionItemContext } from './AccordionItem';
import { AccordionContext, noop } from './Accordion';
import styles from './Accordion.scss';

const IconChevronForward = (props: any) => (
    <svg width="18" height="18" viewBox="0 0 32 32" {...props}>
        <g
            id="Icons/UI/Chevron-forward-KR-umQ91SWjw4A2_TX36T"
            fill="none"
            fillRule="evenodd"
            stroke="none"
            strokeWidth="1"
        >
            <path
                id="Path-KR-umQ91SWjw4A2_TX36T"
                fill="#54575F"
                d="M13.6053239 7.30697031c-.169535-.2179736-.1302678-.5321114.0877058-.70164642.2179736-.16953502.5321114-.13026779.7016464.0877058l7 9.00000001c.1404319.1805552.1404319.4333854 0 .6139406l-7 9c-.169535.2179736-.4836728.2572408-.7016464.0877058s-.2572408-.4836728-.0877058-.7016464L20.3665692 16l-6.7612453-8.69302969z"
            ></path>
        </g>
    </svg>
);

export type AccordionHeaderProps = AllHTMLAttributes<HTMLDivElement> & HTMLProps<HTMLDivElement>;

export const AccordionHeader: FC<AccordionHeaderProps> = forwardRef((props: AccordionHeaderProps, ref) => {
    const { children, onKeyDown, onClick = noop, ...rest } = props;
    const { onChange, accordionId } = useContext(AccordionContext);
    const { id, isExpanded, index } = useContext(AccordionItemContext);

    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
        event.persist();
        if (onKeyDown) {
            onKeyDown(event);
        }

        const headers: HTMLElement[] = Array.from(
            document.querySelectorAll(`[data-accordion-header="${accordionId}"]`),
        );
        switch (event.key) {
            case ' ':
            case 'Enter':
                // Need check so change doesn't fire if you pass in element
                // that needs it's own click event
                const activeElement: Element | null = document.activeElement;
                if (activeElement && activeElement.id === `header-${id}`) {
                    event.preventDefault();
                    onChange(index);
                }
                return;
            case 'ArrowUp':
                event.preventDefault();
                if (index === 0) {
                    headers[headers.length - 1].focus();
                    return;
                }
                headers[index - 1].focus();
                return;
            case 'ArrowDown':
                event.preventDefault();
                if (index === headers.length - 1) {
                    headers[0].focus();
                    return;
                }
                headers[index + 1].focus();
                return;
            case 'Home':
                event.preventDefault();
                headers[0].focus();
                return;
            case 'End':
                event.preventDefault();
                headers[headers.length - 1].focus();
            default:
                return;
        }
    }
    function handleClick(event: MouseEvent<HTMLDivElement>) {
        if (!event.isPropagationStopped()) {
            onClick(event);
            onChange(index);
        }
    }
    const headerClassNames = classnames({
        [styles.header]: true,
        [styles.headerIsOpen]: isExpanded,
    });
    const chevronClassNames = classnames({
        [styles.chevron]: true,
        [styles.chevronIsOpen]: isExpanded,
    });
    return (
        <div
            {...rest}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            aria-expanded={isExpanded}
            ref={ref}
            aria-controls={`pane-${id}`}
            id={`header-${id}`}
            data-accordion-header={accordionId}
            className={headerClassNames}
        >
            <IconChevronForward width="18" height="18" className={chevronClassNames} aria-hidden="true" /> {children}
        </div>
    );
});
AccordionHeader.displayName = 'AccordionHeader';
