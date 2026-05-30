# qr-hover-link

> A React component that overlays a clickable link on a QR code image when hovered — no phone needed.

**[→ Live demo](https://opentechcommunity.github.io/qr-hover-demo/)** · [npm](https://www.npmjs.com/package/qr-hover-link) · [GitHub](https://github.com/opentechcommunity/qr-hover-link)

QR codes are great for mobile users, but desktop visitors have to pull out their phone just to follow a link. `qr-hover-link` solves that: wrap your QR image with this component and a clean overlay appears on hover, showing the encoded URL as a real, clickable link.

Defaults are intentionally minimal — **black, white, and transparency only** — so it fits any site theme out of the box. Every visual detail is customisable via props.

---

## Installation

```bash
npm install qr-hover-link
# or
yarn add qr-hover-link
```

> **Peer dependencies:** React ≥ 17 and ReactDOM ≥ 17 must already be installed in your project.

---

## Quick start

```tsx
import { QRHoverLink } from "qr-hover-link";

export default function PaymentPage() {
  return (
    <QRHoverLink
      src="/qr-payment.png"
      href="https://pay.example.com/invoice/42"
    />
  );
}
```

That's it. Hover over the image and a semi-transparent overlay fades in with the link.

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `href` | `string` | **required** | The URL the QR code encodes. Shown as a clickable link on hover. |
| `src` | `string` | **required** | Source path / URL of the QR code image. |
| `alt` | `string` | `"QR code"` | Alt text for the image (accessibility). |
| `width` | `number \| string` | `200` | Width of the component. |
| `height` | `number \| string` | `200` | Height of the component. |
| **Overlay** | | | |
| `overlayBackground` | `string` | `"rgba(0,0,0,0.55)"` | CSS background of the hover overlay. |
| `overlayLabel` | `string` | `"Open link"` | Heading text shown above the URL. |
| `labelFontSize` | `string` | `"0.75rem"` | Font size of the label. |
| `labelColor` | `string` | `"#ffffff"` | Color of the label text. |
| `linkFontSize` | `string` | `"0.7rem"` | Font size of the URL link. |
| `linkColor` | `string` | `"#ffffff"` | Color of the URL link. |
| `linkUnderline` | `boolean` | `true` | Whether to underline the link. |
| `linkMaxLength` | `number` | `40` | Max characters to display before truncating the URL. |
| **Container / image** | | | |
| `borderRadius` | `string` | `"8px"` | Border radius for the image and overlay. |
| `boxShadow` | `string` | `"0 2px 12px rgba(0,0,0,0.15)"` | Box shadow on the wrapper. |
| `containerStyle` | `CSSProperties` | — | Extra inline styles for the outer `<div>`. |
| `imageStyle` | `CSSProperties` | — | Extra inline styles for the `<img>`. |
| `overlayStyle` | `CSSProperties` | — | Extra inline styles for the overlay `<div>`. |
| `linkStyle` | `CSSProperties` | — | Extra inline styles for the `<a>` element. |
| **Behaviour** | | | |
| `target` | `string` | `"_blank"` | Where to open the link (`_blank`, `_self`, …). |
| `rel` | `string` | `"noopener noreferrer"` | `rel` attribute on the anchor. |
| `onLinkClick` | `(href: string) => void` | — | Callback fired when the user clicks the link. |

---

## Examples

### Match a dark-themed site

```tsx
<QRHoverLink
  src="/qr-dark.png"
  href="https://example.com/dark"
  overlayBackground="rgba(255, 255, 255, 0.15)"
  labelColor="#111111"
  linkColor="#0066cc"
  borderRadius="12px"
/>
```

### Branded overlay

```tsx
<QRHoverLink
  src="/qr-brand.png"
  href="https://brand.example.com"
  overlayBackground="rgba(99, 0, 210, 0.75)"
  overlayLabel="Visit our store"
  labelFontSize="1rem"
  linkColor="#ffd700"
  width={240}
  height={240}
/>
```

### No shadow, square corners

```tsx
<QRHoverLink
  src="/qr-plain.png"
  href="https://example.com"
  borderRadius="0"
  boxShadow="none"
/>
```

### Track clicks

```tsx
<QRHoverLink
  src="/qr-track.png"
  href="https://example.com/campaign"
  onLinkClick={(url) => analytics.track("qr_link_clicked", { url })}
/>
```

### Open in same tab

```tsx
<QRHoverLink
  src="/qr-internal.png"
  href="/dashboard"
  target="_self"
/>
```

---

## Accessibility

- The wrapper has `role="img"` and an `aria-label` combining the alt text and the full URL.
- The overlay is `aria-hidden` when not visible.
- The component is keyboard-accessible: focus the wrapper with Tab and the overlay appears; the link inside is then reachable.

---

## License

MIT
