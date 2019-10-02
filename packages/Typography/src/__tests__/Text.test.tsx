import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Text from '../Text';

describe('Text', () => {
    it('should render and allow you to pass content and render it', () => {
        const { getByTestId } = render(<Text data-testid="test">Random text string</Text>);
        expect(getByTestId('test').textContent).toContain('Random text string');
    });
    it('should still allow the user to pass a custom class name and other custom props', () => {
        const spy = jest.fn();
        const customClassName = 'soCustom';
        const { getByTestId } = render(<Text onClick={spy} data-testid="test" className={customClassName}></Text>);
        const el = getByTestId('test');

        fireEvent.click(el);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(el.classList).toContain(customClassName);
    });
    it('should render with element of `as` prop', () => {
        const { getByTestId } = render(
            <>
                <Text as="label" data-testid="test1">
                    Text
                </Text>
                <Text as="span" data-testid="test2">
                    Text
                </Text>
                <Text as="strong" data-testid="test3">
                    Text
                </Text>
                <Text as="div" data-testid="test4">
                    Text
                </Text>
            </>,
        );
        const label = getByTestId('test1');
        const span = getByTestId('test2');
        const strong = getByTestId('test3');
        const div = getByTestId('test4');

        expect(label.nodeName.toLowerCase()).toBe('label');
        expect(span.nodeName.toLowerCase()).toBe('span');
        expect(strong.nodeName.toLowerCase()).toBe('strong');
        expect(div.nodeName.toLowerCase()).toBe('div');
    });
    it('should contain the corresponding color class name', () => {
        const { getByTestId } = render(
            <>
                <Text data-testid="test1">Text</Text>
                <Text data-testid="test2" color="primary">
                    Text
                </Text>
                <Text data-testid="test3" color="error">
                    Text
                </Text>
                <Text data-testid="test4" color="info">
                    Text
                </Text>
                <Text data-testid="test5" color="meta">
                    Text
                </Text>
                <Text data-testid="test6" color="success">
                    Text
                </Text>
                <Text data-testid="test7" color="warning">
                    Text
                </Text>
            </>,
        );

        const defaultColor = getByTestId('test1');
        expect(defaultColor.classList).toContain('defaultColor');

        const primary = getByTestId('test2');
        expect(primary.classList).toContain('primaryColor');

        const error = getByTestId('test3');
        expect(error.classList).toContain('errorColor');

        const info = getByTestId('test4');
        expect(info.classList).toContain('infoColor');

        const meta = getByTestId('test5');
        expect(meta.classList).toContain('metaColor');

        const success = getByTestId('test6');
        expect(success.classList).toContain('successColor');

        const warning = getByTestId('test7');
        expect(warning.classList).toContain('warningColor');
    });
    it('should apply the bold and italic styles as needed', () => {
        const { getByTestId } = render(
            <>
                <Text data-testid="test1" italic>
                    Text
                </Text>
                <Text data-testid="test2" bold>
                    Text
                </Text>
            </>,
        );
        const italic = getByTestId('test1');
        const bold = getByTestId('test2');

        expect(italic.classList).toContain('italic');
        expect(italic.classList).not.toContain('bold');

        expect(bold.classList).not.toContain('italic');
        expect(bold.classList).toContain('bold');
    });
});
