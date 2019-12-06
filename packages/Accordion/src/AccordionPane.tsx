import React, { FC, forwardRef, AllHTMLAttributes, HTMLProps, ReactElement, useContext } from 'react';
import { AccordionItemContext } from './AccordionItem';

export type AccordionPaneProps = AllHTMLAttributes<HTMLDivElement> &
    HTMLProps<HTMLDivElement> & {
        as?: ReactElement;
    };

export const AccordionPane: FC<AccordionPaneProps> = forwardRef((props: AccordionPaneProps, ref) => {
    const { as = 'div' as any, ...rest } = props;
    const { id, isExpanded } = useContext(AccordionItemContext);
    const Component = as;

    if (!isExpanded) {
        return null;
    }
    return <Component {...rest} role="region" aria-labelledby={`header-${id}`} id={`pane-${id}`} ref={ref} />;
});
AccordionPane.displayName = 'AccordionPane';
