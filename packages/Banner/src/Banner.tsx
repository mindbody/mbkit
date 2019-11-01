import React, { AllHTMLAttributes, ReactElement, FC, forwardRef, RefObject, ReactNode } from 'react';
import classnames from 'classnames';
import styles from './Banner.scss';

export type BannerProps = AllHTMLAttributes<HTMLElement> & {
    variant: 'success' | 'warning' | 'error' | 'info';
    as?: ReactElement;
    title?: ReactNode;
    message?: ReactNode;
    icon?: ReactNode;
};
export const Banner: FC<BannerProps> = forwardRef((props: BannerProps, ref: RefObject<HTMLElement>) => {
    const { as = 'div' as any, children, title, message, variant, icon, ...rest } = props;
    const Component = as;
    const classNames = classnames({
        [styles.banner]: true,
        [styles[variant]]: true,
    });
    return (
        <Component {...rest} className={classNames} ref={ref}>
            {icon ? icon : <div className={styles.icon}>{getIcon(variant)}</div>}
            <div className={styles.content}>
                {title && <h2 className={styles.heading}>{title}</h2>}
                {message && <p className={styles.body}>{message}</p>}
                {children}
            </div>
        </Component>
    );
});
Banner.displayName = 'Banner';

// TODO: Once packages are published, consume icons here
function getIcon(variant: BannerProps['variant']) {
    switch (variant) {
        case 'success':
            return (
                <svg width="32" height="32" viewBox="0 0 32 32">
                    <g
                        id="Icons/UI/Check-Mark--TPn4jQ6T4uNOlK_OsCTP"
                        fill="none"
                        fillRule="evenodd"
                        stroke="none"
                        strokeWidth="1"
                    >
                        <path
                            id="Mask--TPn4jQ6T4uNOlK_OsCTP"
                            fill="#54575F"
                            d="M27.5 16c0-6.35129737-5.1493212-11.5-11.5-11.5C9.64729211 4.5 4.5 9.64760131 4.5 16c0 6.3523987 5.14729211 11.5 11.5 11.5 6.3506788 0 11.5-5.1487026 11.5-11.5zm1 0c0 6.903609-5.5970633 12.5-12.5 12.5-6.90500609 0-12.5-5.59533-12.5-12.5C3.5 9.09533001 9.09499391 3.5 16 3.5c6.9029367 0 12.5 5.59639099 12.5 12.5zm-17.887709 1.0027207c-.1743696-.2141258-.1421409-.5290635.0719848-.7034332.2141257-.1743696.5290635-.142141.7034332.0719848.6641119.8155287 1.2894506 1.5960867 1.876027 2.3416936.8362955 1.0630288 1.3141024 1.0501802 2.2452588-.0454453 1.305686-1.5363077 3.0093136-3.5337538 5.110935-5.9924.179426-.209907.4950427-.2346167.7049496-.0551908.209907.179426.2346167.4950427.0551908.7049496-2.1010562 2.457985-3.8041046 4.454752-5.1090931 5.9902391-1.3267689 1.5611145-2.5518258 1.5940572-3.7931791.0161527-.5830125-.7410768-1.2048519-1.5172668-1.865507-2.3285505z"
                        ></path>
                    </g>
                </svg>
            );
        case 'info':
            return (
                <svg width="32" height="32" viewBox="0 0 32 32">
                    <g
                        id="Icons/UI/Information-RP-K_dnFE4eBLlYcVFAPh"
                        fill="none"
                        fillRule="evenodd"
                        stroke="none"
                        strokeWidth="1"
                    >
                        <path
                            id="Combined-Shape-RP-K_dnFE4eBLlYcVFAPh"
                            fill="#54575F"
                            d="M16 28.5C9.09644063 28.5 3.5 22.9035594 3.5 16 3.5 9.09644063 9.09644063 3.5 16 3.5c6.9035594 0 12.5 5.59644063 12.5 12.5 0 6.9035594-5.5964406 12.5-12.5 12.5zm0-1c6.3512746 0 11.5-5.1487254 11.5-11.5 0-6.35127462-5.1487254-11.5-11.5-11.5C9.64872538 4.5 4.5 9.64872538 4.5 16c0 6.3512746 5.14872538 11.5 11.5 11.5zm2-7c.6666667 0 .6666667 1 0 1h-4c-.6296296 0-.6646091-.8919753-.1049383-.9910837L14 20.5h1.499l.001-5H14c-.2761424 0-.5-.2238576-.5-.5s.2238576-.5.5-.5h2c.2761424 0 .5.2238576.5.5l-.001 5.5H18zm-2-10c.2761424 0 .5.2238576.5.5v1c0 .2761424-.2238576.5-.5.5s-.5-.2238576-.5-.5v-1c0-.2761424.2238576-.5.5-.5z"
                        ></path>
                    </g>
                </svg>
            );
        case 'warning':
        case 'error':
            return (
                <svg width="32" height="32" viewBox="0 0 32 32">
                    <g
                        id="Icons/UI/Caution-6Ygg6gJKYxMWXq8w45g_e"
                        fill="none"
                        fillRule="evenodd"
                        stroke="none"
                        strokeWidth="1"
                    >
                        <path
                            id="Combined-Shape-6Ygg6gJKYxMWXq8w45g_e"
                            fill="#696C74"
                            d="M16.9515514 5.3684804l9.9517169 19.7338468c.2500158.495771-.0008385.8976728-.5510784.8976728H6.64552585c-.55436796 0-.80605853-.3920577-.55107841-.8976728L16.0461643 5.3684804c.2500158-.495771.650407-.50561511.9053871 0zm-.4526935 1.32316634L7.26601291 25H25.7317028L16.4988579 6.69164674zM16.5 21c.2761424 0 .5.2238576.5.5v1c0 .2761424-.2238576.5-.5.5s-.5-.2238576-.5-.5v-1c0-.2761424.2238576-.5.5-.5zm0-8c.2454599 0 .4496084.1768752.4919443.4101244L17 13.5v6c0 .2761424-.2238576.5-.5.5-.2454599 0-.4496084-.1768752-.4919443-.4101244L16 19.5v-6c0-.2761424.2238576-.5.5-.5z"
                        ></path>
                    </g>
                </svg>
            );
    }
}
