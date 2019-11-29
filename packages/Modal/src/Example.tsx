import React, { FC } from 'react';
import { Modal, ModalProps } from './Modal';

type ModalExampleProps = ModalProps & {
    buttonText: string;
    renderManyChildren?: boolean;
};
export const ModalExample: FC<ModalExampleProps> = (props: ModalExampleProps) => {
    const { buttonText, renderManyChildren, ...rest } = props;
    const [showModal, setShowModal] = React.useState(false);
    const btnRef = React.useRef(null);
    return (
        <>
            <button onClick={() => setShowModal(true)}>{buttonText}</button>
            <br />
            <Modal
                show={showModal}
                initialFocusRef={btnRef}
                onClose={() => setShowModal(false)}
                label="Example modal"
                {...rest}
            >
                {renderManyChildren ? manyChildren : oneChild}
                <button ref={btnRef} onClick={() => setShowModal(false)}>
                    Close
                </button>
            </Modal>
        </>
    );
};

const oneChild = (
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Quis vel eros donec ac odio tempor. Sed viverra tellus in hac. Mattis vulputate enim nulla aliquet
        porttitor lacus luctus accumsan. Elementum integer enim neque volutpat ac tincidunt vitae semper. Sed turpis
        tincidunt id aliquet risus feugiat in ante metus. Risus pretium quam vulputate dignissim suspendisse in. Felis
        imperdiet proin fermentum leo vel orci porta non pulvinar. Scelerisque fermentum dui faucibus in ornare. Luctus
        accumsan tortor posuere ac ut. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum.
        Congue mauris rhoncus aenean vel elit. Eu facilisis sed odio morbi quis commodo odio. Vitae tortor condimentum
        lacinia quis vel eros. Tellus orci ac auctor augue. Neque gravida in fermentum et sollicitudin ac orci.
        Elementum eu facilisis sed odio morbi quis. Duis at tellus at urna condimentum mattis pellentesque id nibh.
    </p>
);
const manyChildren = (
    <>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Quis vel eros donec ac odio tempor. Sed viverra tellus in hac. Mattis vulputate enim
            nulla aliquet porttitor lacus luctus accumsan. Elementum integer enim neque volutpat ac tincidunt vitae
            semper. Sed turpis tincidunt id aliquet risus feugiat in ante metus. Risus pretium quam vulputate dignissim
            suspendisse in. Felis imperdiet proin fermentum leo vel orci porta non pulvinar. Scelerisque fermentum dui
            faucibus in ornare. Luctus accumsan tortor posuere ac ut. Nulla facilisi etiam dignissim diam quis enim
            lobortis scelerisque fermentum. Congue mauris rhoncus aenean vel elit. Eu facilisis sed odio morbi quis
            commodo odio. Vitae tortor condimentum lacinia quis vel eros. Tellus orci ac auctor augue. Neque gravida in
            fermentum et sollicitudin ac orci. Elementum eu facilisis sed odio morbi quis. Duis at tellus at urna
            condimentum mattis pellentesque id nibh.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Quis vel eros donec ac odio tempor. Sed viverra tellus in hac. Mattis vulputate enim
            nulla aliquet porttitor lacus luctus accumsan. Elementum integer enim neque volutpat ac tincidunt vitae
            semper. Sed turpis tincidunt id aliquet risus feugiat in ante metus. Risus pretium quam vulputate dignissim
            suspendisse in. Felis imperdiet proin fermentum leo vel orci porta non pulvinar. Scelerisque fermentum dui
            faucibus in ornare. Luctus accumsan tortor posuere ac ut. Nulla facilisi etiam dignissim diam quis enim
            lobortis scelerisque fermentum. Congue mauris rhoncus aenean vel elit. Eu facilisis sed odio morbi quis
            commodo odio. Vitae tortor condimentum lacinia quis vel eros. Tellus orci ac auctor augue. Neque gravida in
            fermentum et sollicitudin ac orci. Elementum eu facilisis sed odio morbi quis. Duis at tellus at urna
            condimentum mattis pellentesque id nibh.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Quis vel eros donec ac odio tempor. Sed viverra tellus in hac. Mattis vulputate enim
            nulla aliquet porttitor lacus luctus accumsan. Elementum integer enim neque volutpat ac tincidunt vitae
            semper. Sed turpis tincidunt id aliquet risus feugiat in ante metus. Risus pretium quam vulputate dignissim
            suspendisse in. Felis imperdiet proin fermentum leo vel orci porta non pulvinar. Scelerisque fermentum dui
            faucibus in ornare. Luctus accumsan tortor posuere ac ut. Nulla facilisi etiam dignissim diam quis enim
            lobortis scelerisque fermentum. Congue mauris rhoncus aenean vel elit. Eu facilisis sed odio morbi quis
            commodo odio. Vitae tortor condimentum lacinia quis vel eros. Tellus orci ac auctor augue. Neque gravida in
            fermentum et sollicitudin ac orci. Elementum eu facilisis sed odio morbi quis. Duis at tellus at urna
            condimentum mattis pellentesque id nibh.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Quis vel eros donec ac odio tempor. Sed viverra tellus in hac. Mattis vulputate enim
            nulla aliquet porttitor lacus luctus accumsan. Elementum integer enim neque volutpat ac tincidunt vitae
            semper. Sed turpis tincidunt id aliquet risus feugiat in ante metus. Risus pretium quam vulputate dignissim
            suspendisse in. Felis imperdiet proin fermentum leo vel orci porta non pulvinar. Scelerisque fermentum dui
            faucibus in ornare. Luctus accumsan tortor posuere ac ut. Nulla facilisi etiam dignissim diam quis enim
            lobortis scelerisque fermentum. Congue mauris rhoncus aenean vel elit. Eu facilisis sed odio morbi quis
            commodo odio. Vitae tortor condimentum lacinia quis vel eros. Tellus orci ac auctor augue. Neque gravida in
            fermentum et sollicitudin ac orci. Elementum eu facilisis sed odio morbi quis. Duis at tellus at urna
            condimentum mattis pellentesque id nibh.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Quis vel eros donec ac odio tempor. Sed viverra tellus in hac. Mattis vulputate enim
            nulla aliquet porttitor lacus luctus accumsan. Elementum integer enim neque volutpat ac tincidunt vitae
            semper. Sed turpis tincidunt id aliquet risus feugiat in ante metus. Risus pretium quam vulputate dignissim
            suspendisse in. Felis imperdiet proin fermentum leo vel orci porta non pulvinar. Scelerisque fermentum dui
            faucibus in ornare. Luctus accumsan tortor posuere ac ut. Nulla facilisi etiam dignissim diam quis enim
            lobortis scelerisque fermentum. Congue mauris rhoncus aenean vel elit. Eu facilisis sed odio morbi quis
            commodo odio. Vitae tortor condimentum lacinia quis vel eros. Tellus orci ac auctor augue. Neque gravida in
            fermentum et sollicitudin ac orci. Elementum eu facilisis sed odio morbi quis. Duis at tellus at urna
            condimentum mattis pellentesque id nibh.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Quis vel eros donec ac odio tempor. Sed viverra tellus in hac. Mattis vulputate enim
            nulla aliquet porttitor lacus luctus accumsan. Elementum integer enim neque volutpat ac tincidunt vitae
            semper. Sed turpis tincidunt id aliquet risus feugiat in ante metus. Risus pretium quam vulputate dignissim
            suspendisse in. Felis imperdiet proin fermentum leo vel orci porta non pulvinar. Scelerisque fermentum dui
            faucibus in ornare. Luctus accumsan tortor posuere ac ut. Nulla facilisi etiam dignissim diam quis enim
            lobortis scelerisque fermentum. Congue mauris rhoncus aenean vel elit. Eu facilisis sed odio morbi quis
            commodo odio. Vitae tortor condimentum lacinia quis vel eros. Tellus orci ac auctor augue. Neque gravida in
            fermentum et sollicitudin ac orci. Elementum eu facilisis sed odio morbi quis. Duis at tellus at urna
            condimentum mattis pellentesque id nibh.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Quis vel eros donec ac odio tempor. Sed viverra tellus in hac. Mattis vulputate enim
            nulla aliquet porttitor lacus luctus accumsan. Elementum integer enim neque volutpat ac tincidunt vitae
            semper. Sed turpis tincidunt id aliquet risus feugiat in ante metus. Risus pretium quam vulputate dignissim
            suspendisse in. Felis imperdiet proin fermentum leo vel orci porta non pulvinar. Scelerisque fermentum dui
            faucibus in ornare. Luctus accumsan tortor posuere ac ut. Nulla facilisi etiam dignissim diam quis enim
            lobortis scelerisque fermentum. Congue mauris rhoncus aenean vel elit. Eu facilisis sed odio morbi quis
            commodo odio. Vitae tortor condimentum lacinia quis vel eros. Tellus orci ac auctor augue. Neque gravida in
            fermentum et sollicitudin ac orci. Elementum eu facilisis sed odio morbi quis. Duis at tellus at urna
            condimentum mattis pellentesque id nibh.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Quis vel eros donec ac odio tempor. Sed viverra tellus in hac. Mattis vulputate enim
            nulla aliquet porttitor lacus luctus accumsan. Elementum integer enim neque volutpat ac tincidunt vitae
            semper. Sed turpis tincidunt id aliquet risus feugiat in ante metus. Risus pretium quam vulputate dignissim
            suspendisse in. Felis imperdiet proin fermentum leo vel orci porta non pulvinar. Scelerisque fermentum dui
            faucibus in ornare. Luctus accumsan tortor posuere ac ut. Nulla facilisi etiam dignissim diam quis enim
            lobortis scelerisque fermentum. Congue mauris rhoncus aenean vel elit. Eu facilisis sed odio morbi quis
            commodo odio. Vitae tortor condimentum lacinia quis vel eros. Tellus orci ac auctor augue. Neque gravida in
            fermentum et sollicitudin ac orci. Elementum eu facilisis sed odio morbi quis. Duis at tellus at urna
            condimentum mattis pellentesque id nibh.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Quis vel eros donec ac odio tempor. Sed viverra tellus in hac. Mattis vulputate enim
            nulla aliquet porttitor lacus luctus accumsan. Elementum integer enim neque volutpat ac tincidunt vitae
            semper. Sed turpis tincidunt id aliquet risus feugiat in ante metus. Risus pretium quam vulputate dignissim
            suspendisse in. Felis imperdiet proin fermentum leo vel orci porta non pulvinar. Scelerisque fermentum dui
            faucibus in ornare. Luctus accumsan tortor posuere ac ut. Nulla facilisi etiam dignissim diam quis enim
            lobortis scelerisque fermentum. Congue mauris rhoncus aenean vel elit. Eu facilisis sed odio morbi quis
            commodo odio. Vitae tortor condimentum lacinia quis vel eros. Tellus orci ac auctor augue. Neque gravida in
            fermentum et sollicitudin ac orci. Elementum eu facilisis sed odio morbi quis. Duis at tellus at urna
            condimentum mattis pellentesque id nibh.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Quis vel eros donec ac odio tempor. Sed viverra tellus in hac. Mattis vulputate enim
            nulla aliquet porttitor lacus luctus accumsan. Elementum integer enim neque volutpat ac tincidunt vitae
            semper. Sed turpis tincidunt id aliquet risus feugiat in ante metus. Risus pretium quam vulputate dignissim
            suspendisse in. Felis imperdiet proin fermentum leo vel orci porta non pulvinar. Scelerisque fermentum dui
            faucibus in ornare. Luctus accumsan tortor posuere ac ut. Nulla facilisi etiam dignissim diam quis enim
            lobortis scelerisque fermentum. Congue mauris rhoncus aenean vel elit. Eu facilisis sed odio morbi quis
            commodo odio. Vitae tortor condimentum lacinia quis vel eros. Tellus orci ac auctor augue. Neque gravida in
            fermentum et sollicitudin ac orci. Elementum eu facilisis sed odio morbi quis. Duis at tellus at urna
            condimentum mattis pellentesque id nibh.
        </p>
    </>
);
