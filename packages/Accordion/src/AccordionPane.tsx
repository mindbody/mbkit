import React, {
    FC,
    forwardRef,
    AllHTMLAttributes,
    HTMLProps,
    ReactNode,
    useContext,
    useRef,
    useEffect,
    useState,
} from 'react';
import { AccordionItemContext } from './AccordionItem';
import classnames from 'classnames';
import styles from './Accordion.scss';

export type AccordionPaneProps = AllHTMLAttributes<HTMLDivElement> &
    HTMLProps<HTMLDivElement> & {
        as?: ReactNode;
    };

export const AccordionPane: FC<AccordionPaneProps> = forwardRef((props: AccordionPaneProps, ref) => {
    const { as = 'div', children, style, className = '', ...rest } = props;
    const { id, isExpanded } = useContext(AccordionItemContext);
    const Component: any = as;

    const innerRef = useRef<HTMLDivElement>(null);
    const [internalExpanded, setInternalExpanded] = useState(isExpanded);
    const [height, setHeight] = useState<string | number>('auto');

    // Only calculating height when internal expansion or children change
    useEffect(() => {
        const current = innerRef.current;
        if (current) {
            const containerHeight = current.getBoundingClientRect().height;
            if (containerHeight !== height) {
                setHeight(containerHeight);
            }
        } else {
            setHeight('auto');
        }
    }, [children, internalExpanded]);

    // Delaying closing internal expansion for animation
    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if (isExpanded) {
            setInternalExpanded(isExpanded);
        } else {
            timeout = setTimeout(() => {
                setInternalExpanded(isExpanded);
            }, Number(styles.transitionTime));
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [isExpanded]);

    const classNames = classnames({
        [styles.pane]: true,
        [className]: className,
    });

    return (
        <Component
            {...rest}
            className={classNames}
            role="region"
            aria-labelledby={`header-${id}`}
            id={`pane-${id}`}
            ref={ref}
            style={{
                height: isExpanded ? height : 0,
                ...style,
            }}
        >
            <div ref={innerRef} className={styles.paneContent}>
                {internalExpanded ? children : null}
            </div>
        </Component>
    );
});
AccordionPane.displayName = 'AccordionPane';
