import React, { ReactElement, cloneElement, ReactNode } from 'react';
import { useTooltip, TooltipPopup } from '@reach/tooltip';
import Portal from '@reach/portal';
import tipsyStyles from './Tipsy.scss';
import classnames from 'classnames';

export type TipsyProps = React.HTMLAttributes<HTMLDivElement> & {
    children: ReactElement;
    label: ReactNode;
    ariaLabel?: string;
    /** This position will be the initial anchor point of where the tipsy starts. Collision detection will automatically reverse the side if it detects that it will overflow the window */
    position?:
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
};

const additionalSpacing = 8;
const bumpOffTheWallSpace = 4;

export const Tipsy: React.FC<TipsyProps> = (props: TipsyProps) => {
    const { children, label, ariaLabel, position = 'top-left', className = '', ...rest } = props;
    const [trigger, tooltip] = useTooltip();
    const [activePosition, setActivePosition] = React.useState<TipsyProps['position']>(position);
    const [ttRect, setTooltipRect] = React.useState<DOMRect>({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        toJSON: () => {},
    });
    const { isVisible, triggerRect } = tooltip;

    React.useEffect(() => {
        // After disappearing, reset back to original position
        if (!isVisible) {
            setActivePosition(position);
        }
    }, [isVisible]);

    function getTooltipPosition(position: TipsyProps['position']) {
        return (triggerRect: DOMRect, tooltipRect: DOMRect) => {
            if (rectsAreDifferent(tooltipRect as any, ttRect as any)) {
                setTooltipRect(tooltipRect);
            }

            switch (position) {
                case 'top-center':
                    return topCenter(triggerRect, tooltipRect);
                case 'top-right':
                    return topRight(triggerRect, tooltipRect);
                case 'bottom-left':
                    return bottomLeft(triggerRect, tooltipRect);
                case 'bottom-center':
                    return bottomCenter(triggerRect, tooltipRect);
                case 'bottom-right':
                    return bottomRight(triggerRect, tooltipRect);
                case 'left-top':
                    return leftTop(triggerRect, tooltipRect);
                case 'left-center':
                    return leftCenter(triggerRect, tooltipRect);
                case 'left-bottom':
                    return leftBottom(triggerRect, tooltipRect);
                case 'right-top':
                    return rightTop(triggerRect, tooltipRect);
                case 'right-center':
                    return rightCenter(triggerRect, tooltipRect);
                case 'right-bottom':
                    return rightBottom(triggerRect, tooltipRect);
                case 'top-left':
                default:
                    return topLeft(triggerRect, tooltipRect);
            }
        };
    }

    // These positions are required to be within the Tipsy instance because
    // it has the ability to change the active position
    // The reason these do and the others below do not is because
    // if the window boundary pushes the tipsy away from the wall,
    // the tipsy could obstruct the view of the trigger element
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

    const classNames = classnames({
        [tipsyStyles.tipsy]: true,
        [className]: className,
    });

    return (
        <>
            {cloneElement(children, trigger)}

            {isVisible && (
                <>
                    <Portal>
                        <div
                            style={{
                                ...getCaretPosition(activePosition, triggerRect, ttRect),
                                position: 'absolute',
                            }}
                            className={tipsyStyles.tipsyCaret}
                        />
                    </Portal>

                    <TooltipPopup
                        {...tooltip}
                        className={classNames}
                        label={label}
                        ariaLabel={ariaLabel}
                        position={getTooltipPosition(activePosition)}
                        {...rest}
                    />
                </>
            )}
        </>
    );
};

type rect = {
    [key: string]: number;
};
function rectToObj(rect: rect): any {
    return {
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        x: rect.x,
        y: rect.y,
    };
}
function rectsAreDifferent(rect1: rect, rect2: rect) {
    let different = false;
    const rect1Obj = rectToObj(rect1);
    const rect2Obj = rectToObj(rect2);

    Object.keys(rect1Obj).forEach(key => {
        if (rect1Obj[key] !== rect2Obj[key]) {
            different = true;
        }
    });

    return different;
}

const caretSize = 5;
function getCaretPosition(position: TipsyProps['position'], triggerRect: DOMRect, tooltipRect: DOMRect) {
    const hiddenTriangle = `${caretSize}px solid transparent`;
    const triangleBorder = `${caretSize}px solid var(--neutral-2, #5A5E66)`;
    const style: any = {};

    if (!triggerRect) {
        return style;
    }

    function isBottom() {
        style.borderLeft = hiddenTriangle;
        style.borderRight = hiddenTriangle;
        style.borderBottom = triangleBorder;
        style.top = window.scrollY + tooltipRect.top - caretSize;
    }
    function isTop() {
        style.borderLeft = hiddenTriangle;
        style.borderRight = hiddenTriangle;
        style.borderTop = triangleBorder;
        style.top = window.scrollY + tooltipRect.top + tooltipRect.height;
    }
    function isLeft() {
        style.borderTop = hiddenTriangle;
        style.borderBottom = hiddenTriangle;
        style.borderLeft = triangleBorder;
        style.left = tooltipRect.left + tooltipRect.width;
    }
    function isRight() {
        style.borderTop = hiddenTriangle;
        style.borderBottom = hiddenTriangle;
        style.borderRight = triangleBorder;
        style.left = tooltipRect.left - caretSize;
    }

    switch (position) {
        case 'bottom-center':
            isBottom();
            style.left = triggerRect.left + triggerRect.width / 2 - caretSize;
            return style;
        case 'bottom-left':
            isBottom();
            style.left = triggerRect.left + caretSize + 4;
            return style;
        case 'bottom-right':
            isBottom();
            style.left = triggerRect.left + triggerRect.width - caretSize - 12;
            return style;
        case 'top-center':
            isTop();
            style.left = triggerRect.left + triggerRect.width / 2 - caretSize;
            return style;
        case 'top-left':
            isTop();
            style.left = triggerRect.left + caretSize + 4;
            return style;
        case 'top-right':
            isTop();
            style.left = triggerRect.left + triggerRect.width - caretSize - 12;
            return style;
        case 'left-center':
            isLeft();
            style.top = window.scrollY + tooltipRect.top + tooltipRect.height / 2 - caretSize;
            return style;
        case 'left-top':
            isLeft();
            style.top = window.scrollY + tooltipRect.top + 6;
            return style;
        case 'left-bottom':
            isLeft();
            style.top = window.scrollY + tooltipRect.top + tooltipRect.height - caretSize - 12;
            return style;
        case 'right-bottom':
            isRight();
            style.top = window.scrollY + tooltipRect.top + tooltipRect.height - caretSize - 12;
            return style;
        case 'right-center':
            isRight();
            style.top = window.scrollY + tooltipRect.top + tooltipRect.height / 2 - caretSize;
            return style;
        case 'right-top':
            isRight();
            style.top = window.scrollY + tooltipRect.top + 6;
            return style;
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
