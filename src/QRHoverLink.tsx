import React, { useState, CSSProperties } from "react";

export interface QRHoverLinkProps {
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

  // ─── Overlay customisation ────────────────────────────────────────────────

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

  // ─── Container / image customisation ─────────────────────────────────────

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
export const QRHoverLink: React.FC<QRHoverLinkProps> = ({
  href,
  src,
  alt = "QR code",
  width = 200,
  height = 200,
  overlayBackground = "rgba(0, 0, 0, 0.55)",
  overlayLabel = "Open link",
  labelFontSize = "0.75rem",
  labelColor = "#ffffff",
  linkFontSize = "0.7rem",
  linkColor = "#ffffff",
  linkUnderline = true,
  linkMaxLength = 40,
  borderRadius = "8px",
  boxShadow = "0 2px 12px rgba(0, 0, 0, 0.15)",
  containerStyle,
  imageStyle,
  overlayStyle,
  linkStyle,
  target = "_blank",
  rel = "noopener noreferrer",
  onLinkClick,
}) => {
  const [hovered, setHovered] = useState(false);

  // Truncate long URLs for display
  const displayHref =
    href.length > linkMaxLength ? href.slice(0, linkMaxLength) + "…" : href;

  // ─── Styles (inline so the package has zero CSS dependencies) ────────────

  const wrapperStyle: CSSProperties = {
    position: "relative",
    display: "inline-block",
    width,
    height,
    borderRadius,
    boxShadow,
    overflow: "hidden",
    cursor: "pointer",
    ...containerStyle,
  };

  const imgStyle: CSSProperties = {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "contain",
    borderRadius,
    ...imageStyle,
  };

  const overlayBaseStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: "12px",
    background: overlayBackground,
    borderRadius,
    // Smooth fade in/out
    opacity: hovered ? 1 : 0,
    transition: "opacity 0.2s ease",
    pointerEvents: hovered ? "auto" : "none",
    ...overlayStyle,
  };

  const labelStyle: CSSProperties = {
    margin: 0,
    fontSize: labelFontSize,
    fontWeight: 600,
    color: labelColor,
    letterSpacing: "0.04em",
    textAlign: "center",
    userSelect: "none",
  };

  const anchorStyle: CSSProperties = {
    fontSize: linkFontSize,
    color: linkColor,
    textDecoration: linkUnderline ? "underline" : "none",
    wordBreak: "break-all",
    textAlign: "center",
    maxWidth: "100%",
    ...linkStyle,
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    if (onLinkClick) onLinkClick(href);
  };

  return (
    <div
      style={wrapperStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // Keyboard / touch accessibility: toggle on focus
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      role="img"
      aria-label={`${alt} — ${href}`}
    >
      {/* QR image */}
      <img src={src} alt={alt} style={imgStyle} draggable={false} />

      {/* Hover overlay */}
      <div style={overlayBaseStyle} aria-hidden={!hovered}>
        <p style={labelStyle}>{overlayLabel}</p>
        <a
          href={href}
          target={target}
          rel={rel}
          style={anchorStyle}
          onClick={handleClick}
          tabIndex={hovered ? 0 : -1}
          title={href}
        >
          {displayHref}
        </a>
      </div>
    </div>
  );
};

export default QRHoverLink;
