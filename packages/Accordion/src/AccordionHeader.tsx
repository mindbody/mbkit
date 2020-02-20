import React, { FC, forwardRef, HTMLProps, useContext, AllHTMLAttributes, KeyboardEvent, MouseEvent } from 'react';
import classnames from 'classnames';
import { AccordionItemContext } from './AccordionItem';
import { AccordionContext, noop } from './Accordion';
import { IconChevronForward } from '@mbkit/icon';
import styles from './Accordion.scss';

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
                const activeElement = document.activeElement as HTMLElement;
                if (activeElement.id === `header-${id}`) {
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
