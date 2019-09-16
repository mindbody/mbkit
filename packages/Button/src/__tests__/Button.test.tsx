import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
    it('should render and allow you to pass props', () => {
        const spy = jest.fn();
        const someClassName = `someClassName`;
        const testId = `test1234`;
        const { getByTestId } = render(
            <Button data-testid={testId} onClick={spy} makeBgRed={false} className={someClassName}>
                Test
            </Button>,
        );

        const getButton = () => getByTestId(testId);

        fireEvent.click(getButton());

        expect(spy).toHaveBeenCalledTimes(1);
        expect(getButton().className.includes(someClassName)).toBe(true);
    });
});
