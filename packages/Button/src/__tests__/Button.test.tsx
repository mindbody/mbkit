import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps } from '../Button';

describe('Button', () => {
    it('should allow user to set text and onClick props and work as expected', () => {
        const spy = jest.fn();
        const { getByTestId } = render(
            <Button variant="primary" onClick={spy} className="testing" data-testid="test">
                Testing
            </Button>,
        );

        const btn = getByTestId('test');
        fireEvent.click(btn);

        expect(btn.textContent).toBe('Testing');
        expect(btn.classList.contains('testing')).toBe(true);
        expect(spy).toHaveBeenCalledTimes(1);
    });
    it('should not click call the onClick when loading or disabled are set', () => {
        const loadingSpy = jest.fn();
        const disabledSpy = jest.fn();
        const { getByTestId } = render(
            <>
                <Button variant="primary" data-testid="loading" loading onClick={loadingSpy} />
                <Button variant="primary" data-testid="disabled" disabled onClick={disabledSpy} />
            </>,
        );
        const loadingBtn = getByTestId('loading');
        const disabledBtn = getByTestId('disabled');
        fireEvent.click(loadingBtn);
        fireEvent.click(disabledBtn);

        expect(loadingSpy).toHaveBeenCalledTimes(0);
        expect(disabledSpy).toHaveBeenCalledTimes(0);
    });
    it('should load the respective class names for the variant prop', () => {
        const variants = [
            'primary',
            'secondary',
            'tertiary',
            'primaryOutlined',
            'secondaryOutlined',
            'tertiaryOutlined',
            'offCard',
            'incognito',
        ];

        const { getByTestId } = render(
            <>
                {variants.map(v => (
                    <Button variant={v as ButtonProps['variant']} key={v} data-testid={v} />
                ))}
            </>,
        );

        variants.forEach(v => {
            const currentVariant = getByTestId(v);
            expect(currentVariant.classList).toContain(v);
        });
    });
    it('should add a size class name for each size passed in', () => {
        const { getByTestId } = render(
            <>
                <Button variant="primary" size="1" data-testid="size1" />
                <Button variant="primary" size="2" data-testid="size2" />
                <Button variant="primary" size="3" data-testid="size3" />
                <Button variant="primary" size="4" data-testid="size4" />
            </>,
        );

        const btnSize1 = getByTestId('size1');
        const btnSize2 = getByTestId('size2');
        const btnSize3 = getByTestId('size3');
        const btnSize4 = getByTestId('size4');

        expect(btnSize1.classList).toContain('size1');
        expect(btnSize2.classList).toContain('size2');
        expect(btnSize3.classList).toContain('size3');
        expect(btnSize4.classList).toContain('size4');
    });

    describe('ripple', () => {
        it('should generate a ripple on click of the text', () => {
            const { getByText } = render(<Button variant="secondary">test</Button>);

            const btn = getByText('test');
            fireEvent.mouseDown(btn);
            expect(btn.innerHTML).toContain('<div class="ripple"');
        });
        it('should NOT generate a ripple when button is disabled', () => {
            const { getByText } = render(
                <Button variant="secondary" disabled>
                    test
                </Button>,
            );

            const btn = getByText('test');
            fireEvent.mouseDown(btn);
            expect(btn.innerHTML).not.toContain('<div class="ripple"');
        });
        it('should NOT generate a ripple when button is loading', () => {
            const { getByText } = render(
                <Button variant="secondary" loading>
                    test
                </Button>,
            );

            const btn = getByText('test');
            fireEvent.mouseDown(btn);
            expect(btn.innerHTML).not.toContain('<div class="ripple"');
        });
        it('should NOT generate a ripple when button is incognito', () => {
            const { getByText } = render(<Button variant="incognito">test</Button>);

            const btn = getByText('test');
            fireEvent.mouseDown(btn);
            expect(btn.innerHTML).not.toContain('<div class="ripple"');
        });
    });
});
