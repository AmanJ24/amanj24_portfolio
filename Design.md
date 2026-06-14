---
name: Honey
url: https://www.withhoney.com/
colors:
  primary: '#f44849'
  primary-hover: '#ff4c24'
  background: '#000000'
  background-offset: '#141414'
  text-primary: '#ffffff'
  text-secondary: '#f4f1ee'
  text-muted: '#757575'
  text-faded: '#3d3d3d'
  border: '#3d3d3d'
typography:
  display:
    family: 'Suisse Intl Regular'
    size: 96px
    weight: 400
    line-height: 1.2
  heading-1:
    family: 'Suisse Intl Regular'
    size: 88px
    weight: 400
    line-height: 1.2
  heading-2:
    family: 'Suisse Intl Regular'
    size: 64px
    weight: 400
    line-height: 1.2
  heading-3:
    family: 'Suisse Intl Regular'
    size: 48px
    weight: 400
    line-height: 1.2
  body:
    family: 'Inter'
    size: 16px
    weight: 500
    line-height: 1.2em
  caption:
    family: 'sans-serif'
    size: 12px
    weight: 400
    line-height: 1.5
  code:
    family: 'GT Flexa Mono Trial Rg'
    size: 12px
    weight: 400
    line-height: 1.5
spacing:
  base: 4px
  scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48]
radius:
  sm: 4px
  md: 8px
  lg: 16px
  full: 9999px
elevation:
  card: 'rgba(255, 255, 255, 0.14) 0px 0px 0px 1.548px, rgba(0, 0, 0, 0.16) 0px 1.548px 3.096px 0px, rgba(255, 76, 36, 0.1) 0px 4.27228px 85.4456px 21.3614px'
motion:
  duration-base: '0.4s'
  easing-standard: 'ease-out'
components:
  button-primary:
    bg: '{colors.primary}'
    text: '{colors.background}'
    radius: '{radius.full}'
    padding: '12px 24px'
  button-secondary:
    bg: '{colors.background}'
    text: '{colors.text-primary}'
    radius: '{radius.full}'
    padding: '12px 24px'
  button-ghost:
    bg: 'transparent'
    text: '{colors.text-primary}'
    radius: '{radius.sm}'
    padding: '8px 16px'
    border: '1px solid {colors.text-faded}'
  card:
    bg: '{colors.background-offset}'
    radius: '{radius.md}'
    shadow: '{elevation.card}'
  input:
    bg: 'transparent'
    text: '{colors.text-secondary}'
    radius: '{radius.md}'
    padding: '12px 12px 12px 12px'
    border: '1px solid {colors.text-faded}'
---

# Design System Inspired by Honey

## 1. Visual Theme & Atmosphere
Honey's design system exudes a bold, high-contrast aesthetic, primarily leveraging a deep `#000000` background paired with crisp `#ffffff` text. The brand's identity is punctuated by a vibrant `#f44849` red accent, prominently used for calls to action and visual highlights, creating a dynamic tension against the dark canvas. Large, expressive display typography set in `Suisse Intl Regular` at sizes up to `96px` dominates headlines, conveying a sense of confidence and directness. The visual narrative is further enriched by subtle 3D rendered elements, such as the honey-like liquid effects and abstract cellular structures, which introduce texture and depth without distracting from the core content. The presence of autoplay videos adds a layer of immersive, dynamic content.

The overall atmosphere is one of sophisticated edge, blending a stark, minimalist presentation with engaging visual details and a clear, hierarchical content structure. Interactive elements, like the "VIEW OUR WORK" button, utilize the brand's primary red, ensuring high visibility and a distinct brand presence. The site employs a generous `48px` spacing scale for sections, providing ample negative space that enhances readability and emphasizes key messages. This deliberate use of dark backgrounds, bright text, and selective red accents creates a powerful and memorable user experience, reinforcing the brand's assertive and innovative positioning.

**Key Characteristics**
-   **Dark Dominance**: Predominantly `#000000` background with `#ffffff` text.
-   **Red Accent**: `#f44849` for CTAs and key highlights.
-   **Large Typography**: `Suisse Intl Regular` up to `96px` for impactful headings.
-   **3D Visuals**: Subtle rendered honey/liquid textures add depth.
-   **Ample Whitespace**: `48px` section padding provides clear content separation.
-   **Dynamic Content**: Autoplay videos enhance engagement.
-   **Rounded Forms**: `9999px` border-radius for buttons and some containers.

## 2. Color Palette & Roles

-   **Primary**: `#f44849` — The brand's signature red, used for primary calls to action, active states, and prominent accent elements.
-   **Primary Hover**: `#ff4c24` — A slightly warmer orange-red, used for interactive hover states on primary elements and some accent text.
-   **Background**: `#000000` — The dominant dark background color for the entire site, providing a stark contrast for text and interactive elements.
-   **Background Offset**: `#141414` — A slightly lighter dark gray, used for cards, sections, or subtle background variations to create visual separation.
-   **Text Primary**: `#ffffff` — The main text color, ensuring high readability against the dark backgrounds.
-   **Text Secondary**: `#f4f1ee` — A subtle off-white, used for secondary information or less prominent text to introduce slight variation.
-   **Text Muted**: `#757575` — A medium gray for less critical information, captions, or supporting text.
-   **Text Faded**: `#3d3d3d` — A very dark gray, used for subtle borders, input placeholders, or highly de-emphasized text where minimal visibility is desired.
-   **Border**: `#3d3d3d` — Used for outlines on ghost buttons, input fields, and other structural elements that require a subtle boundary.

## 3. Typography Rules

-   **Font Family**:
    -   Primary Headings: `'Suisse Intl Regular', sans-serif`
    -   Body Text: `'Inter', sans-serif`
    -   Monospace/Code: `'GT Flexa Mono Trial Rg', monospace`
-   **Hierarchy**:
    -   **Display**: `'Suisse Intl Regular'` `96px` `400` · line-height `1.2` · tracking `none` · Used for hero headlines and impactful statements.
    -   **Heading 1**: `'Suisse Intl Regular'` `88px` `400` · line-height `1.2` · tracking `none` · Primary section titles.
    -   **Heading 2**: `'Suisse Intl Regular'` `64px` `400` · line-height `1.2` · tracking `none` · Secondary section titles, prominent subheadings.
    -   **Heading 3**: `'Suisse Intl Regular'` `48px` `400` · line-height `1.2` · tracking `none` · Important subheadings and feature titles.
    -   **Body**: `'Inter'` `16px` `500` · line-height `1.2em` · tracking `none` · Standard paragraph text and descriptive content.
    -   **Caption**: `'sans-serif'` `12px` `400` · line-height `1.5` · tracking `none` · Small print, metadata, and supplementary text.
    -   **Code/Mono**: `'GT Flexa Mono Trial Rg'` `12px` `400` · line-height `1.5` · tracking `none` · Used for code snippets or stylized numerical lists.
-   **Principles**:
    -   **Impactful Contrast**: Prioritize `Suisse Intl Regular` at large sizes and light weights against the `#000000` background for immediate visual impact.
    -   **Legibility Focus**: Use `Inter` at `16px` with a `500` weight for body text to ensure clear readability on dark surfaces.
    -   **Monospace for Detail**: Reserve `'GT Flexa Mono Trial Rg'` for structured lists and specific data points, maintaining a consistent `12px` size.
    -   **Minimal Line-Height**: Employ tight line-heights (e.g., `1.2` or `1.2em`) for both headings and body text to create a compact, modern feel.
    -   **Hierarchy through Size**: Establish clear visual hierarchy primarily through significant font size differences, rather than relying heavily on varying weights.

## 4. Component Stylings

### Buttons

Honey utilizes distinct button styles: a bold primary red, a subtle dark secondary, and a ghost variant for less emphasis. All buttons feature generous padding and fully rounded corners, with subtle transitions for interactive states.

#### Primary Button
A prominent call-to-action button with a vibrant red background and contrasting black text, indicating a primary action. On hover, the background subtly shifts to a warmer orange-red.

```css
.button-primary {
  background-color: var(--color-primary, #f44849);
  color: var(--color-background, #000000);
  font-family: var(--typography-body-family, 'Inter');
  font-size: var(--typography-body-size, 16px);
  font-weight: var(--typography-body-weight, 500);
  padding: 12px 24px;
  border: none;
  border-radius: var(--radius-full, 9999px);
  cursor: pointer;
  transition: background-color var(--motion-duration-base, 0.4s) var(--motion-easing-standard, ease-out);
}

.button-primary:hover {
  background-color: var(--color-primary-hover, #ff4c24);
}

.button-primary:active {
  background-color: var(--color-primary, #f44849); /* inferred from screenshot */
  transform: translateY(1px); /* inferred from screenshot */
}

.button-primary:disabled {
  background-color: var(--color-text-faded, #3d3d3d); /* inferred from screenshot */
  color: var(--color-text-muted, #757575); /* inferred from screenshot */
  cursor: not-allowed;
}
```

#### Secondary Button
A dark button with white text, used for secondary actions or when the primary red might be too assertive. It maintains the fully rounded pill shape.

```css
.button-secondary {
  background-color: var(--color-background, #000000);
  color: var(--color-text-primary, #ffffff);
  font-family: var(--typography-body-family, 'Inter');
  font-size: var(--typography-body-size, 16px);
  font-weight: var(--typography-body-weight, 500);
  padding: 12px 24px;
  border: 1px solid var(--color-text-faded, #3d3d3d); /* inferred from screenshot */
  border-radius: var(--radius-full, 9999px);
  cursor: pointer;
  transition: background-color var(--motion-duration-base, 0.4s) var(--motion-easing-standard, ease-out), border-color var(--motion-duration-base, 0.4s) var(--motion-easing-standard, ease-out);
}

.button-secondary:hover {
  background-color: var(--color-background-offset, #141414); /* inferred from screenshot */
  border-color: var(--color-text-muted, #757575); /* inferred from screenshot */
}

.button-secondary:active {
  background-color: var(--color-background, #000000); /* inferred from screenshot */
  transform: translateY(1px); /* inferred from screenshot */
}

.button-secondary:disabled {
  background-color: var(--color-background-offset, #141414); /* inferred from screenshot */
  color: var(--color-text-muted, #757575); /* inferred from screenshot */
  border-color: var(--color-text-faded, #3d3d3d); /* inferred from screenshot */
  cursor: not-allowed;
}
```

#### Ghost Button
A transparent button with white text and a subtle dark gray border, used for tertiary actions or when minimal visual weight is desired. The border and text lighten slightly on hover.

```css
.button-ghost {
  background-color: transparent;
  color: var(--color-text-primary, #ffffff);
  font-family: var(--typography-body-family, 'Inter');
  font-size: var(--typography-body-size, 16px);
  font-weight: var(--typography-body-weight, 500);
  padding: 8px 16px;
  border: 1px solid var(--color-border, #3d3d3d);
  border-radius: var(--radius-sm, 4px);
  cursor: pointer;
  transition: color var(--motion-duration-base, 0.4s) var(--motion-easing-standard, ease-out), border-color var(--motion-duration-base, 0.4s) var(--motion-easing-standard, ease-out);
}

.button-ghost:hover {
  color: var(--color-text-secondary, #f4f1ee); /* inferred from screenshot */
  border-color: var(--color-text-muted, #757575); /* inferred from screenshot */
}

.button-ghost:active {
  color: var(--color-text-primary, #ffffff); /* inferred from screenshot */
  border-color: var(--color-border, #3d3d3d); /* inferred from screenshot */
  transform: translateY(1px); /* inferred from screenshot */
}

.button-ghost:disabled {
  color: var(--color-text-faded, #3d3d3d); /* inferred from screenshot */
  border-color: var(--color-text-faded, #3d3d3d); /* inferred from screenshot */
  cursor: not-allowed;
}
```

### Cards & Containers

#### Standard Card
A dark rectangular container used to group related content, featuring a subtle background offset from the main page background, with moderately rounded corners and a distinct shadow. The shadow effect includes a subtle red glow, indicating a brand touch.

```css
.card {
  background-color: var(--color-background-offset, #141414);
  color: var(--color-text-primary, #ffffff);
  border-radius: var(--radius-md, 8px);
  box-shadow: var(--elevation-card, rgba(255, 255, 255, 0.14) 0px 0px 0px 1.548px, rgba(0, 0, 0, 0.16) 0px 1.548px 3.096px 0px, rgba(255, 76, 36, 0.1) 0px 4.27228px 85.4456px 21.3614px);
  padding: 32px; /* inferred from screenshot */
  transition: box-shadow var(--motion-duration-base, 0.4s) var(--motion-easing-standard, ease-out);
}

.card:hover {
  box-shadow: rgba(255, 255, 255, 0.18) 0px 0px 0px 1.548px, rgba(0, 0, 0, 0.2) 0px 3px 6px 0px, rgba(255, 76, 36, 0.15) 0px 6px 100px 25px; /* inferred from screenshot, slightly amplified shadow */
}
```

### Inputs & Forms

#### Text Input
A standard text input field, designed for dark backgrounds with subtle borders and light text. It features a distinct focus ring to indicate interactivity.

```css
.input-text {
  background-color: transparent;
  color: var(--framer-input-font-color, #f4f1ee);
  font-family: var(--framer-input-font-family, "Suisse Int'l Regular");
  font-size: var(--framer-input-font-size, 1.5rem); /* 24px */
  font-weight: var(--typography-body-weight, 500);
  padding: 12px 12px 12px 12px;
  border: 1px solid var(--color-border, #3d3d3d);
  border-radius: var(--radius-md, 8px);
  width: 100%;
  box-sizing: border-box;
  transition: border-color var(--motion-duration-base, 0.4s) var(--motion-easing-standard, ease-out), box-shadow var(--motion-duration-base, 0.4s) var(--motion-easing-standard, ease-out);
}

.input-text::placeholder {
  color: var(--framer-input-placeholder-color, #3d3d3d);
}

.input-text:focus {
  border-color: var(--color-primary, #f44849); /* inferred from screenshot */
  outline: none;
  box-shadow: 0 0 0 2px rgba(244, 72, 73, 0.4); /* inferred from screenshot */
}

.input-text:disabled {
  background-color: var(--color-background-offset, #141414); /* inferred from screenshot */
  color: var(--color-text-muted, #757575); /* inferred from screenshot */
  border-color: var(--color-text-faded, #3d3d3d); /* inferred from screenshot */
  cursor: not-allowed;
}
```

#### Form Label
Labels for form fields, using a slightly muted white text to maintain hierarchy while remaining visible.

```css
.form-label {
  color: var(--color-text-secondary, #f4f1ee);
  font-family: var(--typography-body-family, 'Inter');
  font-size: var(--typography-body-size, 16px);
  font-weight: var(--typography-body-weight, 500);
  margin-bottom: var(--spacing-4, 4px); /* inferred from screenshot */
  display: block;
}
```

#### Checkbox/Radio
(none observed in source)

### Navigation

#### Top Navigation Bar
A minimalist top navigation bar, featuring the brand logo and a primary action button on the right. The background is the main dark color, ensuring it blends seamlessly.

```css
.nav-bar {
  background-color: var(--color-background, #000000);
  padding: 24px 48px; /* inferred from screenshot */
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}
```

#### Navigation Link
Standard text links within the navigation, using white text. On hover, they subtly change color to the primary hover orange-red.

```css
.nav-link {
  color: var(--color-text-primary, #ffffff);
  font-family: var(--typography-body-family, 'Inter');
  font-size: var(--typography-body-size, 16px);
  font-weight: var(--typography-body-weight, 500);
  text-decoration: none;
  padding: 8px 12px; /* inferred from screenshot */
  transition: color var(--motion-duration-base, 0.4s) var(--motion-easing-standard, ease-out);
}

.nav-link:hover {
  color: var(--color-primary-hover, #ff4c24);
}

.nav-link.active,
.nav-link[aria-current="page"] {
  color: var(--color-primary, #f44849); /* inferred from screenshot */
  text-decoration: underline; /* inferred from screenshot */
  text-decoration-color: var(--color-primary, #f44849); /* inferred from screenshot */
}
```

#### Dropdown Menu
(none observed in source)

### Links

#### Standard Link
A default inline text link, typically white on dark. On hover, it changes to the primary hover orange-red.

```css
.link-standard {
  color: var(--color-text-primary, #ffffff);
  text-decoration: underline; /* inferred from screenshot */
  text-decoration-color: var(--color-text-faded, #3d3d3d); /* inferred from screenshot */
  transition: color var(--motion-duration-base, 0.4s) var(--motion-easing-standard, ease-out), text-decoration-color var(--motion-duration-base, 0.4s) var(--motion-easing-standard, ease-out);
}

.link-standard:hover {
  color: var(--color-primary-hover, #ff4c24);
  text-decoration-color: var(--color-primary-hover, #ff4c24);
}

.link-standard:visited {
  color: var(--color-text-muted, #757575); /* inferred from screenshot */
  text-decoration-color: var(--color-text-faded, #3d3d3d); /* inferred from screenshot */
}
```

#### Secondary Link
A link style used for less emphasis, often a muted gray. On hover, it brightens to white.

```css
.link-secondary {
  color: var(--color-text-muted, #757575);
  text-decoration: none;
  transition: color var(--motion-duration-base, 0.4s) var(--motion-easing-standard, ease-out);
}

.link-secondary:hover {
  color: var(--color-text-primary, #ffffff);
}

.link-secondary:visited {
  color: var(--color-text-faded, #3d3d3d); /* inferred from screenshot */
}
```

### Badges
(none observed in source)

## 5. Layout Principles

-   **Spacing System**: Honey employs a `4px` base unit for its spacing scale, providing a consistent rhythm across the design.
    -   Base `4px` → `0, 4, 8, 12, 16, 20, 24, 32, 40, 48`
    -   **0px**: For elements with no margin or padding.
    -   **4px**: Smallest spacing unit, for tight element separation or icon-text gaps.
    -   **8px**: Standard small spacing, for form field labels and input elements.
    -   **12px**: Padding for buttons and internal component spacing.
    -   **16px**: Standard paragraph line spacing, or small component margins.
    -   **20px**: Moderate spacing between related content blocks.
    -   **24px**: Vertical spacing between minor sections or card groups.
    -   **32px**: Padding within cards or larger component separation.
    -   **40px**: Significant vertical separation between major content blocks.
    -   **48px**: Large section padding, used extensively for generous negative space around hero content and main sections.
-   **Grid & Container**:
    -   Max width: `1280px` (inferred from screenshot)
    -   Columns: `12` (inferred from screenshot)
    -   Gutter: `24px` (inferred from screenshot)
    -   Section Padding: `0px 48px` (inferred from screenshot)
-   **Whitespace Philosophy**: Honey leverages expansive dark whitespace to create a sense of premium minimalism and focus. Generous vertical and horizontal padding, particularly `48px` around key content, allows elements to breathe and emphasizes the stark contrast of the typography and accent colors. This approach guides the user's eye and prevents visual clutter, making the large, bold headlines stand out.
-   **Border Radius Scale**:
    -   **sm**: `4px` — Subtle rounding for ghost buttons and small interactive elements.
    -   **md**: `8px` — Standard rounding for cards, inputs, and general containers.
    -   **lg**: `16px` — Larger rounding for more prominent containers or image frames.
    -   **full**: `9999px` — Extreme rounding for pill-shaped buttons and interactive elements.

## 6. Depth & Elevation

Honey uses a multi-layered z-index system to manage stacking context, particularly for dynamic elements and overlays, alongside a single distinct shadow for cards.

-   **Base (z-1)**: `rgba(255, 255, 255, 0.14) 0px 0px 0px 1.548px, rgba(0, 0, 0, 0.16) 0px 1.548px 3.096px 0px, rgba(255, 76, 36, 0.1) 0px 4.27228px 85.4456px 21.3614px` — Applied to standard cards and base interactive containers.
-   **Interactive (z-2)**: `(no shadow measured)` — Used for interactive elements that appear slightly above the base content.
-   **Dropdown/Tooltip (z-3)**: `(no shadow measured)` — For dropdown menus or tooltips that need to overlay interactive content.
-   **Overlay (z-4)**: `(no shadow measured)` — For larger overlays or modal content.
-   **Fixed UI (z-5)**: `(no shadow measured)` — For fixed UI elements like sidebars or persistent navigation.
-   **High Priority (z-6)**: `(no shadow measured)` — For critical UI elements requiring highest visibility.
-   **Modal (z-7)**: `(no shadow measured)` — For full-screen modals or alerts.
-   **Sticky Header (z-10)**: `(no shadow measured)` — For sticky headers or navigation bars that remain visible at the top.

**Shadow Philosophy**: Honey primarily uses a single, complex `box-shadow` for cards, which includes a subtle white inner glow, a dark outer shadow, and a faint red accent glow. This multi-faceted shadow adds depth and brand personality, making cards feel like they are subtly lifted from the dark background. The absence of other explicit shadow tokens suggests a preference for flat design with minimal elevation changes, relying more on z-index for stacking context rather than visual depth cues.

## 7. Do's and Don'ts

### Do's
-   **Do** use `#f44849` for the Primary Button background to ensure calls to action are highly visible.
-   **Do** pair `Suisse Intl Regular` at `96px` with a `400` weight for hero headlines to maximize impact.
-   **Do** maintain a minimum `48px` vertical spacing between major content sections to enhance readability.
-   **Do** use `#ffffff` for body text on `#000000` backgrounds; the measured ratio of `21:1` passes AAA.
-   **Do** apply `8px` border-radius to all cards and inputs for a consistent, modern softness.
-   **Do** use `Inter` `16px` `500` for all standard body text to ensure legibility.
-   **Do** use `#ff4c24` for link hover states to provide a clear interactive feedback.
-   **Do** ensure the Top Navigation Bar maintains `24px` vertical padding for a spacious feel.
-   **Do** use `12px` padding on the sides of buttons to give text sufficient breathing room.

### Don'ts
-   **Don't** use `#3d3d3d` text on `#000000` backgrounds; the measured ratio of `1.93:1` fails AA.
-   **Don't** introduce custom spacing values; adhere strictly to the `0, 4, 8, 12, 16, 20, 24, 32, 40, 48` scale.
-   **Don't** apply `Suisse Intl Regular` to body text; reserve it for headings to preserve hierarchy.
-   **Don't** use `#757575` for critical text on `#000000`; while `4.56:1` passes AA, it's too muted for primary info.
-   **Don't** use any border-radius values other than `4px`, `8px`, `16px`, or `9999px`.
-   **Don't** use `text-decoration: none` on standard links; keep the underline for discoverability.
-   **Don't** use `#ff4c24` on `#ffffff` backgrounds; the measured ratio of `3.33:1` only passes AA Large.
-   **Don't** use the Primary Button for secondary actions; use the Secondary Button instead.
-   **Don't** apply shadows to elements other than cards, unless explicitly defined.

## 8. Responsive Behavior
_Note: breakpoints below are measured from the source. Adjust to the brand's actual media queries when implementing._

-   **Breakpoints**:
    -   **Mobile** (~810px): Layouts reflow to single column; navigation collapses into a hamburger menu.
    -   **Tablet** (~1026px): Content areas adjust to `810px` width; some elements may stack vertically.
    -   **Desktop** (~1440px): Full desktop layout with multi-column grids and expanded navigation.
-   **Touch Targets**:
    -   Minimum touch target size: `44px` x `44px` (inferred from screenshot).
    -   Minimum spacing between interactive elements: `8px` (inferred from screenshot).
-   **Collapsing Strategy**:
    -   **Navigation**: Top navigation links collapse into a hamburger menu at `810px` width.
    -   **Cards**: Multi-column card layouts transition to a single-column stack on mobile.
    -   **Typography**: Display and heading font sizes scale down for smaller viewports to maintain readability.
    -   **Padding**: Horizontal section padding reduces from `48px` to `24px` on mobile.
    -   **Forms**: Input fields maintain `100%` width but padding may adjust.
    -   **Spacing**: Larger spacing values like `48px` might scale down to `24px` or `32px` on mobile.

## 9. Agent Prompt Guide

-   **Quick Color Reference**
    -   `primary`: `#f44849`
    -   `primary-hover`: `#ff4c24`
    -   `background`: `#000000`
    -   `background-offset`: `#141414`
    -   `text-primary`: `#ffffff`
    -   `text-secondary`: `#f4f1ee`
    -   `text-muted`: `#757575`
    -   `text-faded`: `#3d3d3d`
    -   `border`: `#3d3d3d`
-   **Iteration Guide**
    1.  Always use `#f44849` for primary calls to action.
    2.  Ensure all text on `#000000` background uses `#ffffff` or `#f4f1ee` for readability.
    3.  Set hero headlines in `Suisse Intl Regular` `96px` `400` with `1.2` line-height.
    4.  Apply `8px` border-radius to all cards and input fields.
    5.  Use `12px` horizontal padding and `12px` vertical padding for primary buttons.
    6.  Implement `0.4s ease-out` transitions for all interactive element state changes.
    7.  Ensure input fields have a `2px` `rgba(244, 72, 73, 0.4)` focus ring.
    8.  Collapse navigation links into a hamburger menu at `810px` screen width.
    9.  Maintain at least `24px` vertical spacing between cards.
    10. Use the full `rgba(255, 255, 255, 0.14) 0px 0px 0px 1.548px, rgba(0, 0, 0, 0.16) 0px 1.548px 3.096px 0px, rgba(255, 76, 36, 0.1) 0px 4.27228px 85.4456px 21.3614px` shadow for cards.
    11. Employ `Inter` `16px` `500` for all body text.
    12. Ensure all interactive elements have a minimum touch target of `44px` x `44px`.