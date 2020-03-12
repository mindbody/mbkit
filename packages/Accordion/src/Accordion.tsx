import React, { FC, forwardRef, ReactElement, ReactNode, createContext, Children, cloneElement } from 'react';
import { AccordionItemProps } from './AccordionItem';
import nanoid from 'nanoid';
import classnames from 'classnames';
import styles from './Accordion.scss';

export type AccordionProps = {
    /** Array of active panes to be displayed */
    activePanes: number[];
    onChange: (index: number) => void;
    as?: ReactNode;
    children: ReactElement<AccordionItemProps> | ReactElement<AccordionItemProps>[];
    className?: string;
};

export type AccordionContextValue = {
    activePanes: number[];
    onChange: (index: number) => void;
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
    const { as = 'div', activePanes, onChange, className = '', children, ...rest } = props;
    const accordionId = nanoid();
    const Component: any = as;

    const childrenAsArray = Array.isArray(children) ? children : [children];
    const clonedChildren = Children.map(childrenAsArray, (child, index) => {
        return cloneElement(child, { _index: index });
    });
    const classNames = classnames({
        [styles.accordion]: true,
        [className]: className,
    });
    return (
        <AccordionContext.Provider value={{ activePanes, onChange, accordionId }}>
            <Component {...rest} className={classNames} ref={ref}>
                {clonedChildren}
            </Component>
        </AccordionContext.Provider>
    );
});
Accordion.displayName = 'Accordion';
Accordion.defaultProps = {
    as: 'div',
};
