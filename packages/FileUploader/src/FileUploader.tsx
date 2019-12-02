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
    /** Shows button in different variant */
    variant?: 'primary' | 'secondary' | 'primaryOutlined' | 'secondaryOutlined';
    /** Text that shows up in the input field when there is no value. (Do not rely on this for important information) */
    placeholder?: ReactNode;
    /** Text that shows up in the button */
    buttonLabel?: ReactNode;
    /** Shows loading indicator */
    loading?: boolean;
    /** Shows red outline around file uploader */
    invalid?: boolean;
    /** A11y attribute that reads to the user when the user has focus of the FileUploader */
    label?: string;
    /** Value that is displayed in the input field. If using an array of values it will automatically add the comma separators */
    value: string | string[];
    /** Function that is called when a file is uploaded */
    onChange: (event: SyntheticEvent<HTMLInputElement>) => void;
};
export const FileUploader: FC<FileUploaderProps> = forwardRef(
    (props: FileUploaderProps, ref: RefObject<HTMLInputElement>) => {
        const {
            className = '',
            value,
            placeholder = 'To upload files tap here or drop a file',
            buttonLabel = 'Choose File',
            label = 'File Uploader',
            invalid,
            onChange = () => {},
            variant = 'secondary',
            loading,
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
            [styles.isLoading]: loading,
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
            [styles.isLoading]: loading,
            [styles[`variant${variant}`]]: true,
        });

        const fileValue = Array.isArray(value) ? formatListOfValues(value) : value;
        return (
            <div
                tabIndex={disabled ? -1 : 0}
                onKeyDown={handleKeyPress}
                className={classNames}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                role="button"
                aria-label={label}
                aria-busy={loading}
            >
                <div className={displayTextClassNames}>
                    {fileValue || placeholder}
                    {isDragging && <div className={styles.largeDrop} />}
                </div>
                <div className={buttonClassNames}>
                    {loading && <div className={styles.loader} />}
                    {buttonLabel}
                </div>
                <input
                    type="file"
                    ref={inputRef}
                    {...rest}
                    onChange={handleFileChange}
                    tabIndex={-1}
                    className={styles.input}
                    disabled={disabled || loading}
                />
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
