import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import * as Icons from '../Icon';

describe('Icon', () => {
    const { IconAdd } = Icons;

    it('should render with all props passed to it', () => {
        const spy = jest.fn();
        const { getByTestId } = render(
            <IconAdd data-testid="test" className="testing" width="24" height="24" onClick={spy} />,
        );

        const icon = getByTestId('test');
        fireEvent.click(icon);

        expect(icon.classList).toContain('testing');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(icon.getAttribute('width')).toBe('24');
        expect(icon.getAttribute('height')).toBe('24');
    });
    it('should render with the color passed to it', () => {
        const { getByTestId } = render(
            <>
                <IconAdd data-testid="test1" color="primary" />
                <IconAdd data-testid="test2" color="warning" />
                <IconAdd data-testid="test3" color="success" />
                <IconAdd data-testid="test4" color="error" />
                <IconAdd data-testid="test5" color="info" />
                <IconAdd data-testid="test6" color="meta" />
            </>,
        );
        const icon1 = getByTestId('test1');
        expect(icon1.classList).toContain('primaryColor');

        const icon2 = getByTestId('test2');
        expect(icon2.classList).toContain('warningColor');

        const icon3 = getByTestId('test3');
        expect(icon3.classList).toContain('successColor');

        const icon4 = getByTestId('test4');
        expect(icon4.classList).toContain('errorColor');

        const icon5 = getByTestId('test5');
        expect(icon5.classList).toContain('infoColor');

        const icon6 = getByTestId('test6');
        expect(icon6.classList).toContain('metaColor');
    });
    it(`should render all icons multiple times with no duplicate id's`, () => {
        type AllIcons = {
            [key: string]: React.ReactNode;
        };

        const renderAllIcons = () =>
            Object.keys(Icons).map(key => {
                const Comp: React.ReactNode = (Icons as AllIcons)[key];
                if (typeof Comp === 'function') {
                    return Comp({ key });
                }
                return null;
            });

        const { getByTestId } = render(
            <div data-testid="container">
                {renderAllIcons()}
                {renderAllIcons()}
                {renderAllIcons()}
            </div>,
        );

        const container = getByTestId('container');
        const ids = Array.from(container.querySelectorAll('[id]'));
        const svgs = Array.from(container.querySelectorAll('svg'));
        ids.forEach(element => expect(container.querySelectorAll(`[id="${element.id}"]`).length).toBe(1));
        expect(svgs.length).toBe(Object.keys(Icons).length * 3);
    });
});
