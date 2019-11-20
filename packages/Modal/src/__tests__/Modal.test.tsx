import React from 'react';
import { render } from '@testing-library/react';
import { Modal } from '../Modal';

describe('Modal', () => {
    const closeSpy = jest.fn();

    it('should render nothing when show prop is false', () => {
        const { baseElement } = render(
            <Modal data-testid="test" show={false} label="test modal" onClose={closeSpy} size={1}>
                <p>Child</p>
            </Modal>,
        );

        expect(baseElement.querySelectorAll('[data-testid="test"]').length).toBe(0);
    });
    it('should render nothing when show prop is true', () => {
        const { getByTestId, baseElement } = render(
            <Modal data-testid="test" show={true} label="test modal" onClose={closeSpy} size={1}>
                <p>Child</p>
            </Modal>,
        );

        expect(baseElement.querySelectorAll('[data-testid="test"]').length).toBe(1);
        expect(getByTestId('test').textContent).toBe('Child');
    });

    it('should show the header when the header prop is passed', () => {
        const { getByTestId } = render(
            <Modal
                data-testid="test"
                show={true}
                label="test modal"
                header="This is a test"
                onClose={closeSpy}
                size={1}
            >
                <p>Child</p>
            </Modal>,
        );
        const modalText = getByTestId('test').textContent as string;
        expect(modalText.includes('This is a test')).toBe(true);
    });
    it('should show the header when the title prop is passed', () => {
        const { getByText } = render(
            <Modal
                data-testid="test"
                show={true}
                label="test modal"
                footer={
                    <>
                        <button>TestButton</button>
                    </>
                }
                onClose={closeSpy}
                size={1}
            >
                <p>Child</p>
            </Modal>,
        );

        expect(getByText('TestButton')).toBeTruthy();
    });
    it('should use different sizes based on the size prop', () => {
        const { getByTestId } = render(
            <>
                <Modal data-testid="size1" show={true} label="test modal" onClose={closeSpy} size={1}>
                    <p>Child</p>
                </Modal>
                <Modal data-testid="size2" show={true} label="test modal" onClose={closeSpy} size={2}>
                    <p>Child</p>
                </Modal>
                <Modal data-testid="size3" show={true} label="test modal" onClose={closeSpy} size={3}>
                    <p>Child</p>
                </Modal>
            </>,
        );

        expect(getByTestId('size1').classList.contains('size1')).toBe(true);
        expect(getByTestId('size2').classList.contains('size2')).toBe(true);
        expect(getByTestId('size3').classList.contains('size3')).toBe(true);
    });
});
