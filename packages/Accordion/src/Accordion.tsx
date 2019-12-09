import React, {
    FC,
    forwardRef,
    ReactElement,
    ReactNode,
    createContext,
    Children,
    cloneElement,
    useMemo,
    AllHTMLAttributes,
    HTMLProps,
} from 'react';
import { AccordionItemProps } from './AccordionItem';
import nanoid from 'nanoid';
import classnames from 'classnames';
import styles from './Accordion.scss';

type AccordionProps = AllHTMLAttributes<HTMLElement> &
    HTMLProps<HTMLElement> & {
        /** Array of active panes to be displayed */
        activePanes: number[];
        as?: ReactNode;
        children: ReactElement<AccordionItemProps> | ReactElement<AccordionItemProps>[];
        onChange: (index: number) => void;
        className?: string;
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
    const { as = 'div' as any, activePanes, onChange, className = '', children, ...rest } = props;
    const accordionId = useMemo(() => nanoid(), []);
    const Component = as;

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
