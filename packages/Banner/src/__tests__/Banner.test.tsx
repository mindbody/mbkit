import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Banner } from '../Banner';

describe('Banner', () => {
    const title = "Congratulations, you're business is setup";
    const message = "You're ready to get started making the world a healthier place";

    it('should render each variant', () => {
        const { getByTestId } = render(
            <>
                <Banner variant="success" data-testid="success" />
                <Banner variant="warning" data-testid="warning" />
                <Banner variant="info" data-testid="info" />
                <Banner variant="error" data-testid="error" />
            </>,
        );
        const success = getByTestId('success');
        const warning = getByTestId('warning');
        const info = getByTestId('info');
        const error = getByTestId('error');

        expect(success).toBeTruthy();
        expect(success.classList.contains('success')).toBe(true);

        expect(warning).toBeTruthy();
        expect(warning.classList.contains('warning')).toBe(true);

        expect(info).toBeTruthy();
        expect(info.classList.contains('info')).toBe(true);

        expect(error).toBeTruthy();
        expect(error.classList.contains('error')).toBe(true);
    });
    it('should render with text provided', () => {
        const { getByText } = render(<Banner variant="warning" title={title} message={message} />);
        expect(getByText(title)).toBeTruthy();
        expect(getByText(message)).toBeTruthy();
    });
    it('should render the as prop as the component provided', () => {
        const { getByTestId } = render(
            <>
                <Banner variant="success" data-testid="section" as={'section'} />
                <Banner variant="error" data-testid="main" as={'main'} />
            </>,
        );
        const section = getByTestId('section');
        const main = getByTestId('main');
        expect(section.nodeName).toBe('SECTION');
        expect(main.nodeName).toBe('MAIN');
    });
    it('should render with props provided', () => {
        const spy = jest.fn();
        const { getByTestId } = render(
            <Banner
                onClick={spy}
                variant="success"
                data-testid="test"
                title={title}
                message={message}
                data-somerandomprop="i exist"
                className="testing"
                style={{ maxWidth: '768px', margin: '0 auto' }}
            />,
        );

        fireEvent.click(getByTestId('test'));

        const banner = getByTestId('test');

        expect(banner.classList.contains('testing')).toBe(true);
        expect(banner.getAttribute('data-somerandomprop')).toBe('i exist');
        expect(banner.style.maxWidth).toBe('768px');
        expect(banner.style.margin).toBe('0px auto');
        expect(spy).toHaveBeenCalledTimes(1);
    });
    it('should allow you to pass in children', () => {
        const CustomComponent = () => <div>Super awesome components assemble!</div>;
        const { getByText } = render(
            <Banner variant="info">
                <CustomComponent />
            </Banner>,
        );
        expect(getByText('Super awesome components assemble!')).toBeTruthy();
    });
    it('should allow you to pass a custom icon', () => {
        const { getByTestId } = render(<Banner variant="info" icon={<div data-testid="imposterIcon" />} />);

        expect(getByTestId('imposterIcon')).toBeTruthy();
    });
});
