import React, {
    FC,
    forwardRef,
    RefObject,
    AllHTMLAttributes,
    useRef,
    KeyboardEvent,
    useState,
    SyntheticEvent,
    ReactNode,
} from 'react';
import classnames from 'classnames';
import styles from './FileUploader.scss';

export type FileUploaderProps = AllHTMLAttributes<HTMLInputElement> & {
    variant?: 'primary' | 'secondary' | 'primaryOutlined' | 'secondaryOutlined';
    placeholder?: ReactNode;
    buttonLabel?: ReactNode;
    loading?: boolean;
    invalid?: boolean;
    value: string | string[];
    onChange: (event: SyntheticEvent<HTMLInputElement>) => void;
};
export const FileUploader: FC<FileUploaderProps> = forwardRef(
    (props: FileUploaderProps, ref: RefObject<HTMLInputElement>) => {
        const {
            className = '',
            value,
            placeholder = 'Tap here or drop a file',
            buttonLabel = 'Choose File',
            invalid,
            onChange = () => {},
            variant = 'secondary',
            disabled,
            ...rest
        } = props;
        const inputRef = useRef<HTMLInputElement>((ref && ref.current) || null);

        function triggerFilUpload() {
            const input = inputRef.current;
            if (input) {
                input.click();
            }
        }
        function handleKeyPress(event: KeyboardEvent) {
            switch (event.key) {
                case ' ':
                case 'Enter':
                    triggerFilUpload();
                    break;
                default:
                    break;
            }
        }

        const [isDragging, setIsDragging] = useState(false);
        function handleDragOver() {
            // As you hover over this component with a file,
            // this function is called for every cursor change
            if (!isDragging) {
                setIsDragging(true);
            }
        }
        function handleDragLeave() {
            setIsDragging(false);
        }
        function handleFileChange(event: SyntheticEvent<HTMLInputElement>) {
            onChange(event);
            setIsDragging(false);
        }

        const classNames = classnames({
            [styles.fileUploader]: true,
            [styles.invalid]: invalid,
            [styles.isDragging]: isDragging,
            [styles.disabled]: disabled,
            [className]: className,
        });
        const displayTextClassNames = classnames({
            [styles.displayText]: true,
            [styles.placeholder]: !value,
            [styles.value]: value,
        });
        const buttonClassNames = classnames({
            [styles.button]: true,
            [styles[`variant${variant}`]]: true,
        });

        const fileValue = Array.isArray(value) ? formatListOfValues(value) : value;
        return (
            <div
                tabIndex={0}
                onKeyDown={handleKeyPress}
                className={classNames}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                role="button"
                aria-label="file input"
            >
                <div className={displayTextClassNames}>
                    {fileValue || placeholder}
                    {isDragging && <div className={styles.largeDrop} />}
                </div>
                <input
                    type="file"
                    ref={inputRef}
                    {...rest}
                    onChange={handleFileChange}
                    tabIndex={-1}
                    className={styles.input}
                    disabled={disabled}
                />
                <div className={buttonClassNames}>{buttonLabel}</div>
            </div>
        );
    },
);
FileUploader.displayName = 'FileUploader';

function formatListOfValues(list: string[]) {
    return list.map((item, index) => {
        const isLast = index === list.length - 1;
        return `${item}${isLast ? '' : ', '}`;
    });
}
