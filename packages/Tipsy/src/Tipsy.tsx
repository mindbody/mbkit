import React, { ReactElement, cloneElement, ReactNode } from 'react';
import { useTooltip, TooltipPopup } from '@reach/tooltip';
import { useTransition, animated } from 'react-spring';
import Portal from '@reach/portal';
import tipsyStyles from './Tipsy.scss';
import '@reach/tooltip/styles.css';

const AnimatedTooltipPopup = animated(TooltipPopup);

type PositionType =
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'left-top'
    | 'left-center'
    | 'left-bottom'
    | 'right-top'
    | 'right-center'
    | 'right-bottom';

export type TipsyProps = React.HTMLAttributes<ReactElement> & {
    children: ReactElement;
    label: ReactNode;
    ariaLabel?: string;
    /** This position will be the initial anchor point of where the tipsy starts. Collision detection will automatically reverse the side if it detects that it will overflow the window */
    position?: PositionType;
};

const additionalSpacing = 8;
const bumpOffTheWallSpace = 4;

export const Tipsy: React.FC<TipsyProps> = (props: TipsyProps) => {
    const { children, label, ariaLabel, position = 'top-left' } = props;
    const [trigger, tooltip] = useTooltip();
    const [activePosition, setActivePosition] = React.useState<PositionType>(position);
    const { isVisible, triggerRect } = tooltip;

    React.useEffect(() => {
        // After disappearing, reset back to original position
        if (!isVisible) {
            setActivePosition(position);
        }
    }, [isVisible]);

    const transitions = useTransition(isVisible ? tooltip : false, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { mass: 1, tension: 800, friction: 60 },
    });

    function getTooltipPosition(position: PositionType) {
        switch (position) {
            case 'top-left':
                return topLeft;
            case 'top-center':
                return topCenter;
            case 'top-right':
                return topRight;
            case 'bottom-left':
                return bottomLeft;
            case 'bottom-center':
                return bottomCenter;
            case 'bottom-right':
                return bottomRight;
            case 'left-top':
                return leftTop;
            case 'left-center':
                return leftCenter;
            case 'left-bottom':
                return leftBottom;
            case 'right-top':
                return rightTop;
            case 'right-center':
                return rightCenter;
            case 'right-bottom':
                return rightBottom;
        }
    }

    function leftTop(triggerRect: DOMRect, tooltipRect: DOMRect): DOMRect {
        const left = triggerRect.left - tooltipRect.width - additionalSpacing;
        const maxLeft = window.innerWidth - tooltipRect.width - bumpOffTheWallSpace;
        if (left < 0) {
            setActivePosition('right-top');
            return rightTop(triggerRect, tooltipRect);
        }
        return {
            top: triggerRect.top + window.scrollY,
            left: Math.min(Math.max(bumpOffTheWallSpace, left), maxLeft) + window.scrollX,
        } as DOMRect;
    }
    function leftCenter(triggerRect: DOMRect, tooltipRect: DOMRect): DOMRect {
        const left = triggerRect.left - tooltipRect.width - additionalSpacing;
        const maxLeft = window.innerWidth - tooltipRect.width - bumpOffTheWallSpace;
        if (left < 0) {
            setActivePosition('right-center');
            return rightCenter(triggerRect, tooltipRect);
        }
        return {
            top: triggerRect.top + window.scrollY + triggerRect.height / 2 - tooltipRect.height / 2,
            left: Math.min(Math.max(bumpOffTheWallSpace, left), maxLeft) + window.scrollX,
        } as DOMRect;
    }
    function leftBottom(triggerRect: DOMRect, tooltipRect: DOMRect): DOMRect {
        const left = triggerRect.left - tooltipRect.width - additionalSpacing;
        const maxLeft = window.innerWidth - tooltipRect.width - bumpOffTheWallSpace;
        if (left < 0) {
            setActivePosition('right-bottom');
            return rightBottom(triggerRect, tooltipRect);
        }
        return {
            top: triggerRect.bottom - tooltipRect.height + window.scrollY,
            left: Math.min(Math.max(bumpOffTheWallSpace, left), maxLeft) + window.scrollX,
        } as DOMRect;
    }

    function rightTop(triggerRect: DOMRect, tooltipRect: DOMRect): DOMRect {
        const left = triggerRect.right + additionalSpacing;
        const maxLeft = window.innerWidth - tooltipRect.width - bumpOffTheWallSpace;
        if (left > maxLeft) {
            setActivePosition('left-top');
            return leftTop(triggerRect, tooltipRect);
        }
        return {
            top: triggerRect.top + window.scrollY,
            left: Math.min(Math.max(bumpOffTheWallSpace, left), maxLeft) + window.scrollX,
        } as DOMRect;
    }
    function rightCenter(triggerRect: DOMRect, tooltipRect: DOMRect): DOMRect {
        const left = triggerRect.right + additionalSpacing;
        const maxLeft = window.innerWidth - tooltipRect.width - bumpOffTheWallSpace;
        if (left > maxLeft) {
            setActivePosition('left-center');
            return leftCenter(triggerRect, tooltipRect);
        }
        return {
            top: triggerRect.top + window.scrollY + triggerRect.height / 2 - tooltipRect.height / 2,
            left: Math.min(Math.max(bumpOffTheWallSpace, left), maxLeft) + window.scrollX,
        } as DOMRect;
    }
    function rightBottom(triggerRect: DOMRect, tooltipRect: DOMRect): DOMRect {
        const left = triggerRect.right + additionalSpacing;
        const maxLeft = window.innerWidth - tooltipRect.width - bumpOffTheWallSpace;
        if (left > maxLeft) {
            setActivePosition('left-bottom');
            return leftBottom(triggerRect, tooltipRect);
        }
        return {
            top: triggerRect.bottom - tooltipRect.height + window.scrollY,
            left: Math.min(Math.max(bumpOffTheWallSpace, left), maxLeft) + window.scrollX,
        } as DOMRect;
    }

    return (
        <>
            {cloneElement(children, trigger)}
            {transitions.map(
                ({ item: tooltip, props: styles, key }) =>
                    tooltip && (
                        <animated.div key={key} style={styles}>
                            <AnimatedTooltipPopup
                                {...tooltip}
                                className={tipsyStyles.tipsy}
                                label={label}
                                ariaLabel={ariaLabel}
                                position={getTooltipPosition(activePosition)}
                                style={styles}
                            />
                            {isVisible && (
                                <Portal>
                                    <animated.div
                                        style={{
                                            ...getCaretPosition(activePosition, triggerRect),
                                            position: 'absolute',
                                            ...styles,
                                        }}
                                        className={tipsyStyles.tipsyCaret}
                                    />
                                </Portal>
                            )}
                        </animated.div>
                    ),
            )}
        </>
    );
};

function getCaretPosition(position: PositionType, triggerRect: DOMRect) {
    const hiddenTriangle = '8px solid transparent';
    const triangleBorder = '8px solid var(--neutral-2, #5A5E66)';
    const style: any = {};

    if (!triggerRect) {
        return style;
    }

    switch (position) {
        case 'bottom-center':
        case 'bottom-left':
        case 'bottom-right':
            style.left = triggerRect.left - 8 + triggerRect.width / 2;
            style.top = triggerRect.bottom + window.scrollY + additionalSpacing / 2;
            style.borderLeft = hiddenTriangle;
            style.borderRight = hiddenTriangle;
            style.borderBottom = triangleBorder;
            break;
        case 'top-center':
        case 'top-left':
        case 'top-right':
            style.left = triggerRect.left - 8 + triggerRect.width / 2;
            style.top = triggerRect.top + window.scrollY - additionalSpacing - additionalSpacing / 2;
            style.borderLeft = hiddenTriangle;
            style.borderRight = hiddenTriangle;
            style.borderTop = triangleBorder;
            break;
        case 'left-bottom':
        case 'left-center':
        case 'left-top':
            style.left = triggerRect.left - 8 - 2;
            style.top = triggerRect.top + window.scrollY;
            style.borderTop = hiddenTriangle;
            style.borderBottom = hiddenTriangle;
            style.borderLeft = triangleBorder;
            break;
        case 'right-bottom':
        case 'right-center':
        case 'right-top':
            style.left = triggerRect.right + 2;
            style.top = triggerRect.top + window.scrollY;
            style.borderTop = hiddenTriangle;
            style.borderBottom = hiddenTriangle;
            style.borderRight = triangleBorder;
            break;
    }

    return style;
}

function topLeft(triggerRect: DOMRect, tooltipRect: DOMRect): DOMRect {
    const left = triggerRect.left;
    const maxLeft = window.innerWidth - tooltipRect.width - bumpOffTheWallSpace;
    return {
        top: triggerRect.top + window.scrollY - tooltipRect.height - additionalSpacing,
        left: Math.min(Math.max(bumpOffTheWallSpace, left), maxLeft),
    } as DOMRect;
}
function topCenter(triggerRect: DOMRect, tooltipRect: DOMRect): DOMRect {
    const triggerCenter = triggerRect.left + triggerRect.width / 2;
    const left = triggerCenter - tooltipRect.width / 2;
    const maxLeft = window.innerWidth - tooltipRect.width - bumpOffTheWallSpace;
    return {
        top: triggerRect.top + window.scrollY - tooltipRect.height - additionalSpacing,
        left: Math.min(Math.max(bumpOffTheWallSpace, left), maxLeft) + window.scrollX,
    } as DOMRect;
}
function topRight(triggerRect: DOMRect, tooltipRect: DOMRect): DOMRect {
    const left = triggerRect.right - tooltipRect.width;
    const maxLeft = window.innerWidth - tooltipRect.width - bumpOffTheWallSpace;
    return {
        top: triggerRect.top + window.scrollY - tooltipRect.height - additionalSpacing,
        left: Math.min(Math.max(bumpOffTheWallSpace, left), maxLeft) + window.scrollX,
    } as DOMRect;
}
function bottomLeft(triggerRect: DOMRect, tooltipRect: DOMRect): DOMRect {
    const left = triggerRect.left;
    const maxLeft = window.innerWidth - tooltipRect.width - bumpOffTheWallSpace;
    return {
        top: triggerRect.bottom + window.scrollY + additionalSpacing,
        left: Math.min(Math.max(bumpOffTheWallSpace, left), maxLeft) + window.scrollX,
    } as DOMRect;
}
function bottomCenter(triggerRect: DOMRect, tooltipRect: DOMRect): DOMRect {
    const triggerCenter = triggerRect.left + triggerRect.width / 2;
    const left = triggerCenter - tooltipRect.width / 2;
    const maxLeft = window.innerWidth - tooltipRect.width - bumpOffTheWallSpace;
    return {
        left: Math.min(Math.max(bumpOffTheWallSpace, left), maxLeft) + window.scrollX,
        top: triggerRect.bottom + window.scrollY + additionalSpacing,
    } as DOMRect;
}
function bottomRight(triggerRect: DOMRect, tooltipRect: DOMRect): DOMRect {
    const left = triggerRect.right - tooltipRect.width;
    const maxLeft = window.innerWidth - tooltipRect.width - bumpOffTheWallSpace;
    return {
        top: triggerRect.bottom + window.scrollY + additionalSpacing,
        left: Math.min(Math.max(bumpOffTheWallSpace, left), maxLeft) + window.scrollX,
    } as DOMRect;
}
