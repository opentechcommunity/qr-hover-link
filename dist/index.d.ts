import React, { CSSProperties } from 'react';

interface QRHoverLinkProps {
    /** The URL that the QR code encodes — shown as a clickable link on hover */
    href: string;
    /** Source URL / path of the QR code image */
    src: string;
    /** Alt text for the QR image (accessibility) */
    alt?: string;
    /** Width of the component (default: 200) */
    width?: number | string;
    /** Height of the component (default: 200) */
    height?: number | string;
    /** Background color of the hover overlay (default: "rgba(0,0,0,0.55)") */
    overlayBackground?: string;
    /** Text shown above the link (default: "Open link") */
    overlayLabel?: string;
    /** Font size of the label text (default: "0.75rem") */
    labelFontSize?: string;
    /** Color of the label text (default: "#ffffff") */
    labelColor?: string;
    /** Font size of the link text (default: "0.7rem") */
    linkFontSize?: string;
    /** Color of the link text (default: "#ffffff") */
    linkColor?: string;
    /** Underline the link? (default: true) */
    linkUnderline?: boolean;
    /** Max characters to show in the link before truncating (default: 40) */
    linkMaxLength?: number;
    /** Border radius applied to both the image and the overlay (default: "8px") */
    borderRadius?: string;
    /** Box shadow on the container (default: "0 2px 12px rgba(0,0,0,0.15)") */
    boxShadow?: string;
    /** Extra styles applied to the outer wrapper <div> */
    containerStyle?: CSSProperties;
    /** Extra styles applied to the <img> element */
    imageStyle?: CSSProperties;
    /** Extra styles applied to the overlay <div> */
    overlayStyle?: CSSProperties;
    /** Extra styles applied to the link <a> element */
    linkStyle?: CSSProperties;
    /** Where to open the link (default: "_blank") */
    target?: React.HTMLAttributeAnchorTarget;
    /** rel attribute for the anchor (default: "noopener noreferrer") */
    rel?: string;
    /** Called when the user clicks the link */
    onLinkClick?: (href: string) => void;
}
/**
 * QRHoverLink
 *
 * Wraps a QR code image and shows a clickable overlay link on hover,
 * so desktop users never need to reach for their phone.
 *
 * @example
 * <QRHoverLink
 *   src="/qr-payment.png"
 *   href="https://pay.example.com/invoice/42"
 *   overlayLabel="Pay now"
 * />
 */
declare const QRHoverLink: React.FC<QRHoverLinkProps>;

export { QRHoverLink, QRHoverLinkProps };
