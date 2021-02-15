import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Modal } from './index';
import { ModalProps } from './Modal';

export default {
    title: 'Components/Modal',
    component: Modal,
} as Meta;

const manyChildren = (
    <>
        <h1>Example of a modal</h1>

        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime non sed tempora laboriosam ratione. Vero,
            reiciendis voluptate! Esse, quos provident quisquam quis iusto dolorum dicta, voluptatum nostrum nihil
            atque, fugiat quae nobis assumenda eaque quam ducimus. Magnam veniam recusandae pariatur saepe blanditiis
            officiis repellendus maiores, temporibus iure incidunt, voluptas, eaque alias consequatur. Neque, voluptas
            temporibus.
        </p>
        <p>
            Esse deleniti consequuntur soluta quia minus et ipsum, eos dolores dolor cumque placeat nulla eligendi unde
            totam cupiditate mollitia iusto voluptatibus. Odio ipsum veritatis obcaecati laudantium voluptatum dolores
            assumenda amet, sequi inventore at temporibus omnis adipisci quo enim hic maxime repellat nesciunt harum
            nulla cupiditate quisquam. Quod harum optio quaerat ducimus, id quibusdam voluptatem odio.
        </p>
        <p>
            A consequatur odit dignissimos similique ipsa voluptate laborum est, laboriosam eligendi ullam deserunt
            veniam deleniti quos. Obcaecati quas consequatur similique, et qui ratione optio reprehenderit in dolorem
            fugiat unde, quisquam magnam expedita quasi, rem tempore ipsam distinctio voluptates eius aperiam sapiente
            aliquid! Nesciunt aut, quo assumenda sint nostrum, exercitationem cumque deserunt ipsam sapiente odio
            perferendis.
        </p>
        <p>
            Dolor esse aliquid quae dolorum maiores vel! Laboriosam quos eveniet, tenetur a minus quibusdam quo aut
            voluptatibus voluptate eos distinctio labore obcaecati beatae incidunt facilis at autem id libero iusto,
            ipsum nihil blanditiis dolorum sapiente esse? Rem voluptas reiciendis officia at cupiditate omnis quia
            assumenda voluptatum officiis, sapiente excepturi quis, illum explicabo iste, sequi ipsa?
        </p>
        <p>
            Aperiam mollitia, molestiae voluptatum sunt qui labore a placeat excepturi illum minus corporis dolorem
            optio quae sequi, architecto dolor. Omnis laudantium rem quod harum aliquid dignissimos iste est inventore
            unde laboriosam hic veritatis, sequi laborum iure soluta corporis ipsum, ullam ipsam ratione eveniet
            consequatur commodi voluptatum magnam fugiat! Laboriosam modi quibusdam tenetur ab, porro eligendi!
        </p>
        <p>
            Error asperiores excepturi vitae quidem ratione minima hic repellat odio culpa necessitatibus ipsum sit
            porro tempore exercitationem reiciendis vero, recusandae, debitis vel eos voluptate repudiandae officiis
            impedit! Nihil aliquid libero aut asperiores minus molestias aspernatur ad ducimus omnis similique,
            exercitationem cupiditate quo explicabo officia cumque quam. Doloremque ipsum modi quae ducimus eos, quasi
            fugiat quod.
        </p>
        <p>
            Ullam ratione delectus, quod odio reprehenderit quos eos voluptatum aliquid iusto incidunt expedita soluta
            minima, similique dolor saepe ad laboriosam dolorum vitae possimus beatae? Sint optio quaerat explicabo
            veniam placeat ab adipisci at eligendi vel mollitia beatae neque dolores repellat, deserunt quis, odit
            obcaecati animi? Tempora tenetur esse optio aliquid unde nulla temporibus vero tempore.
        </p>
        <p>
            Recusandae voluptate totam cum et eos soluta architecto quasi non id, quas adipisci illum exercitationem
            fuga delectus ipsum, quod repudiandae provident facilis quae. Quam iure reiciendis quos ullam magnam
            voluptatum aspernatur eligendi animi accusantium reprehenderit maiores autem sint repellendus, vero
            provident pariatur quidem. Amet, voluptatem quos quis et deserunt doloremque totam harum quasi laudantium
            nisi.
        </p>
    </>
);

const fewChilren = (
    <>
        <h1>Example of a modal</h1>

        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime non sed tempora laboriosam ratione. Vero,
            reiciendis voluptate! Esse, quos provident quisquam quis iusto dolorum dicta, voluptatum nostrum nihil
            atque, fugiat quae nobis assumenda eaque quam ducimus. Magnam veniam recusandae pariatur saepe blanditiis
            officiis repellendus maiores, temporibus iure incidunt, voluptas, eaque alias consequatur. Neque, voluptas
            temporibus.
        </p>
    </>
);

const Template: Story<ModalProps> = args => <Modal {...args} />;

const defaultArgs: ModalProps = {
    show: true,
    size: 1,
    onClose: () => { console.log('On close prop called. Here you would use your state setter to change the prop of `show`') },
    label: 'Modal with many children',
    children: manyChildren,
    reachDialogOverlayProps: {
        dangerouslyBypassScrollLock: false,
        dangerouslyBypassFocusLock: false,
    }
};

export const ManyChildren = Template.bind({});
ManyChildren.args = {
    ...defaultArgs,
    children: manyChildren,
};

export const FewChildren = Template.bind({});
FewChildren.args = {
    ...defaultArgs,
    label: 'Modal with few children',
    children: fewChilren,
};

export const WithHeaderAndFooter = Template.bind({});
WithHeaderAndFooter.args = {
    ...defaultArgs,
    label: 'Modal with a header and footer',
    header: (
        <>
            I have a head
        </>
    ),
    footer: (
        <>
            I have a footer
        </>
    )
};

export const WithHeader = Template.bind({});
WithHeader.args = {
    ...defaultArgs,
    label: 'Modal with a header',
    header: (
        <>
            I have a head
        </>
    )
};
export const WithFooter = Template.bind({});
WithFooter.args = {
    ...defaultArgs,
    label: 'Modal with a footer',
    footer: (
        <>
            I have a footer
        </>
    )
};
