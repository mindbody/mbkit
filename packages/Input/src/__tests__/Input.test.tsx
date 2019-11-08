import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Input } from '../Input';

describe(`Input`, () => {
    const spy = jest.fn();

    it('should render', () => {
        const { getByTestId } = render(<Input value="" onChange={spy} data-testid="test" />);
        expect(getByTestId('test').nodeName).toBe('INPUT');
    });
    it('should render and be able to pass expected props', () => {
        const changeSpy = jest.fn();
        const focusSpy = jest.fn();
        const blurSpy = jest.fn();
        const expectedValue = 'Some value';
        const { getByTestId } = render(
            <Input
                data-testid="test"
                value={expectedValue}
                onChange={changeSpy}
                onFocus={focusSpy}
                onBlur={blurSpy}
                className="customClassName"
                data-randomprop="testing"
            />,
        );
        const input = getByTestId('test');

        expect(input.classList.contains('customClassName')).toBe(true);
        expect(input.getAttribute('value')).toBe(expectedValue);

        const newValue = 'new value';
        const event = { target: { value: newValue } };
        fireEvent.change(input, event);
        expect(changeSpy).toHaveBeenCalledTimes(1);

        expect(focusSpy).toHaveBeenCalledTimes(0);
        input.focus();
        expect(focusSpy).toHaveBeenCalledTimes(1);

        expect(blurSpy).toHaveBeenCalledTimes(0);
        input.blur();
        expect(blurSpy).toHaveBeenCalledTimes(1);

        expect(input.getAttribute('data-randomprop')).toBe('testing');
    });
    it('should show focus ring on container when input has focus', () => {
        const { getByTestId, container } = render(
            <Input value="" onChange={spy} data-testid="test" before="$" wrapperProps={{ id: 'testcontainer' }} />,
        );

        const testContainer = container.querySelector('#testcontainer') as HTMLElement;
        expect(testContainer.classList.contains('hasFocus')).toBe(false);

        getByTestId('test').focus();

        const testContainer2 = container.querySelector('#testcontainer') as HTMLElement;
        expect(testContainer2.classList.contains('hasFocus')).toBe(true);
    });
    it('should pass in a string to the before prop', () => {
        const { getByTestId } = render(<Input value="" onChange={spy} before="$" />);

        expect(getByTestId('beforeInput').textContent).toBe('$');
    });
    it('should pass in a string to the after prop', () => {
        const { getByTestId } = render(<Input value="" onChange={spy} after="%" />);

        expect(getByTestId('afterInput').textContent).toBe('%');
    });
    it('should pass in a string to both before and after props', () => {
        const { getByTestId } = render(<Input value="" onChange={spy} before="??" after="$$" />);
        expect(getByTestId('beforeInput').textContent).toBe('??');
        expect(getByTestId('afterInput').textContent).toBe('$$');
    });
    it('should allow you to pass in a react element', () => {
        const firstText = 'Before text';
        const secondText = 'After text';
        const before = <div data-testid="first">{firstText}</div>;
        const after = <div data-testid="second">{secondText}</div>;
        const { getByTestId } = render(<Input value="" onChange={spy} before={before} after={after} />);
        expect(getByTestId('first').textContent).toBe(firstText);
        expect(getByTestId('second').textContent).toBe(secondText);
    });
});
