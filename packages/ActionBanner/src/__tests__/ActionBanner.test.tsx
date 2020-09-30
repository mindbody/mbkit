import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ActionBanner } from '../ActionBanner';

describe('ActionBanner', () => {
    const onCloseSpy = jest.fn();
    it('should render', () => {
        const { container } = render(
            <ActionBanner show={true} variant={'error'} onClose={onCloseSpy}>
                Testing Action Banner
            </ActionBanner>,
        );
        expect(container.textContent).toBe('Testing Action Banner');
    });
    it('should not render if show is hidden', () => {
        const { container, getByText } = render(
            <ActionBanner show={false} variant={'error'} onClose={onCloseSpy}>
                Testing Action Banner
            </ActionBanner>,
        );
        expect(getByText('Testing Action Banner')).not.toBeVisible();
    });
    it('should call the onClose callback when user clicks the close icon', () => {
        const { getByTestId } = render(
            <ActionBanner show={true} variant={'error'} onClose={onCloseSpy}>
                Testing Action Banner
            </ActionBanner>,
        );
        const closeIcon = getByTestId('actionBannerCloseIcon');
        fireEvent.click(closeIcon);
        expect(onCloseSpy).toHaveBeenCalledTimes(1);
    });
    it('should pass props through', () => {
        const { getByTestId } = render(
            <ActionBanner
                show={true}
                variant={'error'}
                onClose={onCloseSpy}
                data-testid="test"
                className="testing"
                data-randomtestattribute="something"
                style={{ background: 'red' }}
            >
                Testing Action Banner
            </ActionBanner>,
        );
        const actionBanner = getByTestId('test');

        expect(actionBanner.classList.contains('testing')).toBe(true);
        expect(actionBanner.getAttribute('data-randomtestattribute')).toBe('something');
        expect(actionBanner.style.background).toBe('red');
    });
});
