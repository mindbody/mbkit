import React, { FC, forwardRef, HTMLProps, useContext, AllHTMLAttributes, KeyboardEvent, MouseEvent } from 'react';
import { AccordionItemContext } from './AccordionItem';
import { AccordionContext, noop } from './Accordion';

export type AccordionHeaderProps = AllHTMLAttributes<HTMLDivElement> & HTMLProps<HTMLDivElement>;

export const AccordionHeader: FC<AccordionHeaderProps> = forwardRef((props: AccordionHeaderProps, ref) => {
    const { children, onKeyDown, onClick = noop, ...rest } = props;
    const { onChange, accordionId } = useContext(AccordionContext);
    const { id, isExpanded, index } = useContext(AccordionItemContext);
    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
        const headers = getAccordionHeaders();
        event.persist();
        if (onKeyDown) {
            onKeyDown(event);
        }
        switch (event.key) {
            case ' ':
            case 'Enter':
                onChange(index);
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
    function getAccordionHeaders(): HTMLElement[] {
        return Array.from(document.querySelectorAll(`[data-accordion-header="${accordionId}"]`));
    }
    function handleClick(event: MouseEvent<HTMLDivElement>) {
        onClick(event);
        onChange(index);
    }
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
        >
            {children} {isExpanded && 'Expanded'}
        </div>
    );
});
AccordionHeader.displayName = 'AccordionHeader';
