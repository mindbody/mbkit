import React from 'react';
import { render, getByTestId } from '@testing-library/react';
import { Tipsy } from '../index';

describe('Tipsy', () => {
    it('should render the content passed in as children', () => {
        const { getByText } = render(
            <Tipsy label="Test Tipsy">
                <button>Test</button>
            </Tipsy>,
        );

        expect(getByText('Test')).not.toBe(null);
        expect(getByText('Test').nodeName).toBe('BUTTON');
    });
    it('should render Tipsy after focusing on element', () => {
        const { queryByTestId, getByText } = render(
            <Tipsy label="Test Tipsy" data-testid="tipsy">
                <button>Test</button>
            </Tipsy>,
        );

        expect(queryByTestId('tipsy')).not.toBeTruthy();

        getByText('Test').focus();

        expect(queryByTestId('tipsy')).toBeTruthy();
    });
    it('should render Tipsy with passed props', () => {
        const { getByText, queryByTestId } = render(
            <Tipsy
                label="Test Tipsy"
                data-testid="tipsy"
                className="testing"
                data-random-attribute="should exist"
                style={{ color: 'red' }}
            >
                <button>Test</button>
            </Tipsy>,
        );

        getByText('Test').focus();
        getByText('Test').focus();

        const tipsy = queryByTestId('tipsy');
        expect(tipsy && tipsy.classList.contains('testing')).toBe(true);
        expect(tipsy && tipsy.getAttribute('data-random-attribute')).toBe('should exist');
        expect(tipsy && tipsy.style.color).toBe('red');
    });
    describe('positions of the tipsy', () => {
        it('should render the tipsy in all different positions', () => {
            const { getByTestId } = render(
                <div data-testid="container">
                    <Tipsy label="Test Tipsy" position="top-left" data-testid="test-1">
                        <button>Test1</button>
                    </Tipsy>
                    <Tipsy label="Test Tipsy" position="top-center" data-testid="test-2">
                        <button>Test2</button>
                    </Tipsy>
                    <Tipsy label="Test Tipsy" position="top-right" data-testid="test-3">
                        <button>Test3</button>
                    </Tipsy>
                    <Tipsy label="Test Tipsy" position="bottom-left" data-testid="test-4">
                        <button>Test4</button>
                    </Tipsy>
                    <Tipsy label="Test Tipsy" position="bottom-right" data-testid="test-5">
                        <button>Test5</button>
                    </Tipsy>
                    <Tipsy label="Test Tipsy" position="bottom-center" data-testid="test-6">
                        <button>Test6</button>
                    </Tipsy>
                    <Tipsy label="Test Tipsy" position="left-top" data-testid="test-7">
                        <button>Test7</button>
                    </Tipsy>
                    <Tipsy label="Test Tipsy" position="left-center" data-testid="test-8">
                        <button>Test8</button>
                    </Tipsy>
                    <Tipsy label="Test Tipsy" position="left-bottom" data-testid="test-9">
                        <button>Test9</button>
                    </Tipsy>
                    <Tipsy label="Test Tipsy" position="right-top" data-testid="test-10">
                        <button>Test10</button>
                    </Tipsy>
                    <Tipsy label="Test Tipsy" position="right-center" data-testid="test-11">
                        <button>Test11</button>
                    </Tipsy>
                    <Tipsy label="Test Tipsy" position="right-bottom" data-testid="test-12">
                        <button>Test12</button>
                    </Tipsy>
                </div>,
            );

            const container = getByTestId('container');
            const buttons = Array.from(container.querySelectorAll('button'));

            buttons.forEach((btn, index) => {
                btn.focus();
                btn.focus();
                const tipsy = getByTestId(`test-${index + 1}`);
                expect(tipsy).toBeTruthy();
            });
        });
    });
});
