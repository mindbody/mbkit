import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Icon, allIcons } from '../Icon';

describe('Icon', () => {
    it('should render with all props passed to it', () => {
        const spy = jest.fn();
        const { getByTestId } = render(
            <Icon name="add" data-testid="test" className="testing" width="24" height="24" onClick={spy} />,
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
                <Icon data-testid="test1" color="primary" name="add" />
                <Icon data-testid="test2" color="warning" name="add" />
                <Icon data-testid="test3" color="success" name="add" />
                <Icon data-testid="test4" color="error" name="add" />
                <Icon data-testid="test5" color="info" name="add" />
                <Icon data-testid="test6" color="meta" name="add" />
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
    it('should render all icons and there should be no duplicate ids', () => {
        const { getByTestId } = render(
            <div data-testid="container">
                {allIcons.map(name => (
                    <Icon name={name} key={name} data-testid={name} />
                ))}
            </div>,
        );

        // Icon renders with a <path element
        allIcons.forEach(name => {
            const icon = getByTestId(name);

            expect(icon.innerHTML).toContain(`<path`);
        });
    });
    it('should render multiple of the same icon with no duplicate ids', () => {
        const duplicateIcons = [...allIcons, ...allIcons, ...allIcons];

        const { getByTestId } = render(
            <div data-testid="container">
                {duplicateIcons.map((name, i) => (
                    <Icon name={name} key={`${name}-${i}`} data-testid={`${name}-${i}`} />
                ))}
            </div>,
        );

        // No id's should be duplicate
        const container = getByTestId('container');
        const ids = Array.from(container.querySelectorAll('[id]'));
        ids.forEach(el => {
            expect(container.querySelectorAll(`[id="${el.id}"]`).length).toBe(1);
        });
    });
});
