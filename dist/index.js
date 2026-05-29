'use strict';

var React = require('react');

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
const QRHoverLink = ({ href, src, alt = "QR code", width = 200, height = 200, overlayBackground = "rgba(0, 0, 0, 0.55)", overlayLabel = "Open link", labelFontSize = "0.75rem", labelColor = "#ffffff", linkFontSize = "0.7rem", linkColor = "#ffffff", linkUnderline = true, linkMaxLength = 40, borderRadius = "8px", boxShadow = "0 2px 12px rgba(0, 0, 0, 0.15)", containerStyle, imageStyle, overlayStyle, linkStyle, target = "_blank", rel = "noopener noreferrer", onLinkClick, }) => {
    const [hovered, setHovered] = React.useState(false);
    // Truncate long URLs for display
    const displayHref = href.length > linkMaxLength ? href.slice(0, linkMaxLength) + "…" : href;
    // ─── Styles (inline so the package has zero CSS dependencies) ────────────
    const wrapperStyle = Object.assign({ position: "relative", display: "inline-block", width,
        height,
        borderRadius,
        boxShadow, overflow: "hidden", cursor: "pointer" }, containerStyle);
    const imgStyle = Object.assign({ display: "block", width: "100%", height: "100%", objectFit: "contain", borderRadius }, imageStyle);
    const overlayBaseStyle = Object.assign({ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px", padding: "12px", background: overlayBackground, borderRadius, 
        // Smooth fade in/out
        opacity: hovered ? 1 : 0, transition: "opacity 0.2s ease", pointerEvents: hovered ? "auto" : "none" }, overlayStyle);
    const labelStyle = {
        margin: 0,
        fontSize: labelFontSize,
        fontWeight: 600,
        color: labelColor,
        letterSpacing: "0.04em",
        textAlign: "center",
        userSelect: "none",
    };
    const anchorStyle = Object.assign({ fontSize: linkFontSize, color: linkColor, textDecoration: linkUnderline ? "underline" : "none", wordBreak: "break-all", textAlign: "center", maxWidth: "100%" }, linkStyle);
    const handleClick = (e) => {
        e.stopPropagation();
        if (onLinkClick)
            onLinkClick(href);
    };
    return (React.createElement("div", { style: wrapperStyle, onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false), 
        // Keyboard / touch accessibility: toggle on focus
        onFocus: () => setHovered(true), onBlur: () => setHovered(false), tabIndex: 0, role: "img", "aria-label": `${alt} — ${href}` },
        React.createElement("img", { src: src, alt: alt, style: imgStyle, draggable: false }),
        React.createElement("div", { style: overlayBaseStyle, "aria-hidden": !hovered },
            React.createElement("p", { style: labelStyle }, overlayLabel),
            React.createElement("a", { href: href, target: target, rel: rel, style: anchorStyle, onClick: handleClick, tabIndex: hovered ? 0 : -1, title: href }, displayHref))));
};

exports.QRHoverLink = QRHoverLink;
//# sourceMappingURL=index.js.map
