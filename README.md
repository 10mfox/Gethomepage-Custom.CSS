# Gethomepage Custom CSS Guide

I've put together this comprehensive list of CSS classes, IDs, and resources for [gethomepage](https://gethomepage.dev/). This guide will help you target specific elements for custom styling and get started on your custom.css file.

## Table of Contents
1. [Background](#background)
2. [Font](#font)
3. [System Info Widgets](#system-info-widgets)
4. [Tabs](#tabs)
5. [Services](#services)
6. [Bookmarks](#bookmarks)
7. [Custom Variables](#custom-variables)
8. [Mobile-Specific Styling](#mobile-specific-styling)
9. [Dark & Light Mode](https://github.com/10mfox/gethomepage-Custom.CSS/blob/main/README.md#dark--light-mode)
10. [Advanced CSS Techniques](#advanced-css-techniques)
11. [Troubleshooting](#troubleshooting)
12. [Best Practices](#best-practices)
13. [Contributing](#contributing)
14. [Version Compatibility](#version-compatibility)
15. [Examples](#examples)
16. [Resources](#resources)

## Background
- `#page_container`: for the background of entire homepage

## Font
- `*`: This will set font and font color for all of homepage

## System Info Widgets
- `#information-widgets`: top widgets/stats
- `.widget-cpu`: CPU usage widget
- `.widget-memory`: Memory usage widget
- `.widget-disk`: Disk usage widget
- `.widget-network`: Network usage widget

## Tabs
- `#myTab`: For border around entire tab bar
- `button[id$='-tab']`: For individual tab borders/font

## Services
- `.service-group-name`: Service Group Title
- `.service-card`: For border around all services individually
- `#layout-groups`: For border around all services
- `.service-icon`: this is for all service icon backgrounds
- `.status-indicator`: Service status indicator

## Bookmarks
- `.bookmark`: For border around all bookmarks (Not Titles) individually
- `.bookmark-group`: For border around all bookmarks/titles individually
- `#bookmarks`: For border around all bookmarks
- `.bookmark-icon`: this is for all bookmark icon backgrounds
- `.bookmark-group-title`: For bookmark group titles

## Custom Variables
`:root` can be used to set custom variables for easy reference throughout your CSS. For example:

```css
:root {
  --my-backdrop-filter: blur(8px);
  --primary-color: #007bff;
  --secondary-color: #6c757d;
}
```

You can then use these variables like this:

```css
.service-card {
  backdrop-filter: var(--my-backdrop-filter);
  background-color: var(--primary-color);
}
```

## Mobile-Specific Styling
Use media queries to apply styles specifically for mobile devices:

```css
@media (max-width: 768px) {
  /* Your mobile-specific styles here */
}
```

## Dark & Light Mode
Gethomepage supports both dark and light modes. You can target these modes using the following classes:

```css
body.light-mode {
  /* Light mode styles */
}

body.dark-mode {
  /* Dark mode styles */
}
```

## Advanced CSS Techniques
### Flexbox Layout
```css
.service-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
```

### Grid Layout
```css
#layout-groups {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
```

## Troubleshooting
Common issues and solutions:

1. Styles not applying:
   - Check if your custom.css file is in the correct location
   - Verify that the selectors are correct and specific enough

2. Inconsistent appearance across browsers:
   - Use vendor prefixes for better compatibility
   - Test on multiple browsers and devices

## Best Practices
1. Use specific selectors to avoid unintended styling
2. Group related styles together
3. Comment your CSS for better maintainability
4. Use a consistent naming convention
5. Minimize the use of !important

## Contributing
We welcome contributions to this guide! Here's how you can help:

1. Submit new CSS selectors or examples
2. Share your custom themes
3. Improve documentation or fix typos
4. Add tutorials or tips

Please submit your contributions [here](https://github.com/10mfox/gethomepage-Custom.CSS/discussions/categories/contributions).

## Version Compatibility
This guide is compatible with Gethomepage version 0.9.11 and above. Please note that future versions may introduce changes that affect these selectors. We strive to keep this guide up-to-date, but always refer to the official Gethomepage documentation for the most current information.

## Examples
Here's a brief example of how to use these classes and IDs in a custom CSS file:

```css
#page_container {
  background-image: url('path/to/your/image.jpg');
  background-size: cover;
}

.service-card {
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.bookmark-icon {
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}

.bookmark-icon:hover {
  filter: grayscale(0%);
}
```

## Resources
- [Official Gethomepage Documentation](https://gethomepage.dev/)
- [CSS Tricks](https://css-tricks.com/)
- [MDN Web Docs: CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Contributors:
- 🔥 Olaf 🔥
- LionCityGaming
