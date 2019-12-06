import React, { FC, forwardRef, ReactElement, createContext, Children, cloneElement, useMemo } from 'react';
import { AccordionItemProps } from './AccordionItem';
import nanoid from 'nanoid';

type AccordionProps = {
    /** Array of active panes to be displayed */
    activePanes: number[];
    as?: ReactElement;
    children: ReactElement<AccordionItemProps>[];
    onChange: (index: number) => void;
};

type AccordionContextValue = {
    activePanes: AccordionProps['activePanes'];
    onChange: AccordionProps['onChange'];
    accordionId: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const noop = (args: any) => {};

export const AccordionContext = createContext<AccordionContextValue>({
    activePanes: [],
    onChange: noop,
    accordionId: '',
});
export const Accordion: FC<AccordionProps> = forwardRef((props: AccordionProps, ref) => {
    const { as = 'div' as any, activePanes = [], onChange = noop, children, ...rest } = props;
    const accordionId = useMemo(() => nanoid(), []);
    const Component = as;

    const clonedChildren = Children.map(children, (child, index) => {
        return cloneElement(child, { _index: index });
    });
    return (
        <AccordionContext.Provider value={{ activePanes, onChange, accordionId }}>
            <Component {...rest} ref={ref}>
                {clonedChildren}
            </Component>
        </AccordionContext.Provider>
    );
});
Accordion.displayName = 'Accordion';
