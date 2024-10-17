# Gethomepage CSS Classes and IDs

I've put together this list of basic CSS classes and ids for homepage. This list should help you target specific elements for custom styling.
 
This includes sections for:
1. [Background](#Background)
2. [System Info Widgets](#System-Info-Widgets)
3. [Tabs](#Tabs)
4. [Services](#Services)
5. [Bookmarks](#Bookmarks)

It also includes a brief example of how to use these classes and IDs in a custom CSS file at the bottom.
 
## Background
- `#page_containerr`: for the background of entire homepage
 
## System Info Widgets
- `#information-widgets`: top widgets/stats
 
## Tabs
- `#myTab`: For border around entire tab bar
- `#Home-tab, #Docker-tab`: For individual tabs borders/font (be sure to change “Home” and “Docker” to the name of your tabs add any more you have)

## Services
- `.service-group-name`: Service Group Title
- `.service-card`: For border around all services individually
- `#layout-groups`: For border around all services
 
## Bookmarks
- `.bookmark`: For border around all bookmarks (Not Titles) individually
- `.bookmark-group`: For border around all bookmarks/titles individually
- `#bookmarks`: For border around all bookmarks

To apply custom styles, you can create a `custom.css` file in your Gethomepage configuration directory and reference these classes and IDs above.
 
Example: CSS
```
#page_container {
  content: "";
  position: fixed;  /* Changed from 'center' to 'fixed' */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: url('/images/fox-demon.jpg') no-repeat center center fixed;  
  background-size: cover;
}
 
/* Global Styles */
.service-card,
.bookmark,
.widget-container,
.information-widget-resource,
.service-group-name,
#bookmarks,
#Home-tab,
#Docker-tab {
  font-family: "Comic Sans MS", "Comic Sans";
  font-weight: 800;
  content-visibility: auto;
  contain-intrinsic-size: 1px 5000px;
}
 
.bookmark:hover,
.service-card:hover {
  border-color: #7cdfe8;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```
 
Credits to:
    🔥 Olaf 🔥  
    LionCityGaming
