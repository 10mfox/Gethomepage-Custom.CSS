I've put together this list of basic CSS classes and ids for gethomepage. This list should help you target specific elements for custom styling and get started on your custom.css for [gethomepage](https://gethomepage.dev/).
 
### This includes sections for:
1. [Background](#Background)
2. [System Info Widgets](#System-Info-Widgets)
3. [Tabs](#Tabs)
4. [Services](#Services)
5. [Bookmarks](#Bookmarks)
6. [My Custom.CSS](https://github.com/10mfox/Gethomepage-Custom.CSS/blob/main/current%20custom.css)

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
 
## Example

```
/* Background */
#page_container {
  content: "";
  position: fixed;
  background: url('/images/fox-demon.jpg') no-repeat center center fixed;  
  background-size: cover;
}

/* Bookmark Layout */
@media(min-width: 500px) {
    .bookmark-list.flex.flex-col {
        display: grid !important;
        grid-template-columns: repeat(4, 10fr);
        gap: 0.5rem;
    }
    
    .bookmark-list.flex.flex-col .service {
        grid-column: span 2;
    }
    
    .bookmark-list.flex.flex-col .service > .mb-2 {
        margin-bottom: 0 !important;
    }
    
    .bookmark-list.flex.flex-col #home-away.bookmark-list {
        grid-column: span 1;
    }
}

/* Border Styles */
#information-widgets,
#layout-groups,
.service-card,
#Home-tab,
#Links-tab,
#Docker-tab {
  border-width: 5px;
  border-radius: .375rem;
  border-color: #A54702;
  backdrop-filter: blur(64px);
  padding: 1px;
  margin: 1px;
  border-spacing: 0;
}

/* Font Styles */
.service-card,
.bookmark,
.widget-container,
.information-widget-resource,
.service-group-name,
.service-name,
#bookmarks,
#Home-tab,
#Links-tab,
#Docker-tab {
  font-family: "Comic Sans MS", "Comic Sans" !important;
  font-weight: 800;
  content-visibility: auto;
  contain-intrinsic-size: 1px 5000px;
}

/* Layout and Spacing */
.information-widget-resource {
  gap: 60px;
}

#information-widgets,
#bookmark-group,
#layout-groups {
  margin: 15px;
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
  body {
    font-size: 14px;
    line-height: 1.5;
    white-space: normal;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  .service-card {
    border-width: 3px;
    padding: 8px;
    margin: 8px 0;
  }

  #myTab {
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  #Home-tab,
  #Links-tab,
  #Docker-tab {
    border-width: 3px;
    padding: 10px;
    margin: 0;
    width: calc(50% - 5px);
    justify-content: center;
  }
}

/* Landscape-specific Mobile Styles */
@media screen and (max-width: 850px) and (orientation: landscape) {
  body {
    font-size: 13px;
  }

  #myTab {
    flex-wrap: nowrap;
    overflow-x: auto;
    justify-content: flex-start;
    padding-bottom: 10px;
    gap: 5px;
  }

  #Home-tab,
  #Links-tab,
  #Docker-tab {
    flex: 0 0 auto;
    width: auto;
    white-space: nowrap;
    padding: 8px;
    border-width: 2px;
    min-height: 36px;
  }
}

/* Portrait-specific Mobile Styles */
@media screen and (max-width: 480px) and (orientation: portrait) {
  body {
    font-size: 12px;
  }

  .service-card {
    border-width: 2px;
    padding: 5px;
    margin: 5px 0;
  }

  #Home-tab,
  #Links-tab,
  #Docker-tab {
    border-width: 2px;
    padding: 8px;
    min-height: 36px;
    width: 100%;
  }
}

/* Recently Added Section */
#list > div > div.relative.flex.flex-row.w-full.service-container > div > div {
  display: block;
  text-align: right;
}

#list > div > div.relative.flex.flex-row.w-full.service-container > div > div > div.flex.flex-row.text-right > div:nth-child(1) {
  text-align: left;
  margin-left: .5rem;
}

#list > div > div.relative.flex.flex-row.w-full.service-container > div > div > div.flex.flex-row.text-right > div:nth-child(2) {
  text-align: right;
  margin-left: auto;
}

#list > div > div.relative.flex.flex-row.w-full.service-container > div > div > div.flex.flex-row.text-right > div {
  color: white;
  font-weight: 300;
  content-visibility: auto;
  contain-intrinsic-size: 1px 5000px;
}

/* Service Card Styles */
.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

/* Tab Styles */
#myTab {
  font: 16px/2 'Manrope', sans-serif;
  padding: 5px;
  background: none;
  backdrop-filter: none;
  display: flex;
  justify-content: flex-start;
  gap: 40px;
}

#Home-tab:focus,
#Links-tab:focus,
#Docker-tab:focus {
  border-color: #f56905;
  padding: 5px 15px;
  margin: 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  backdrop-filter: brightness(30%) blur(15px) saturate(75%);
  white-space: nowrap;
  transition: all 0.3s ease;
}
```
 
Credits to:
    🔥 Olaf 🔥  
    LionCityGaming
