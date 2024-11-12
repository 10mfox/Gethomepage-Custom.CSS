# CSS Wizard for Gethomepage

A powerful CSS customization tool for Gethomepage, featuring live preview, color presets, and an intuitive interface for creating beautiful, responsive designs.

![CSS-Wizard-11-12-2024_05_03_PM](https://github.com/user-attachments/assets/21647cfa-5f3a-46a9-bf35-92674439fddd)

## ✨ Features

- **Live Preview**: Instantly visualize your changes with an interactive demo
- **Theme Management**:
  - Built-in color picker with advanced controls
  - Rich collection of pre-built themes
  - Create, save, and manage custom themes
  - Import/export theme configurations
- **Comprehensive Styling**:
  - Font customization with extensive font library
  - Border controls (width, radius, colors)
  - Backdrop filters and effects
  - Hover and focus states
- **Dark/Light Mode**: Seamless switching between themes
- **Responsive Design**: Mobile-optimized interface
- **Feature Toggles**: Enable/disable specific styling features

## 🚀 Quick Start

### Prerequisites

- Docker
- Docker Compose
- A running instance of Gethomepage

### Docker Compose Installation

Create or update your `docker-compose.yml`:

```yaml
services:
  homepage-css-editor:
    container_name: Homepage-CSS-Editor
    image: ghcr.io/10mfox/gethomepage-custom-css:latest
    ports:
      - "5555:5555"  # Can be changed to any available port
    environment:
      - PORT=5555    # Must match the port mapping above
    restart: always
    network_mode: bridge
```

### Important Configuration Notes

- The port number in the `ports` mapping must match the `PORT` environment variable
- Example: To use port 5555:
  ```yaml
  ports:
    - "5555:5555"
  environment:
    - PORT=5555
  ```

### Starting the Service

1. Navigate to your docker-compose directory
2. Run: `docker-compose up -d`
3. Access the CSS Wizard at `http://localhost:[YOUR_PORT]`

## 🎨 Using the CSS Wizard

### Basic Workflow

1. **Configure Features**:
   - Use the Feature Toggles dropdown to enable/disable specific styling options
   - Toggle options like fonts, colors, borders, and effects

2. **Customize Styles**:
   - Adjust fonts from the extensive font library
   - Set border properties (width, radius)
   - Configure backdrop filters
   - Choose colors using the color picker

3. **Apply Themes**:
   - Select from built-in presets
   - Create and save custom themes
   - Import previously saved configurations

4. **Preview and Export**:
   - Use the live preview to verify changes
   - Export your configuration when satisfied

### Built-in Themes

The CSS Wizard includes professionally designed themes:

- 🌙 Dark Matrix - Classic terminal look
- 🌊 Ocean Deep - Rich blue tones
- 🧛 Dracula - Popular dark theme
- ❄️ Nord - Arctic-inspired palette
- 🌆 Tokyo Night - Modern code editor theme
- 🌅 Synthwave - 80s retro aesthetics
- 🌲 Forest Night - Natural green tones
- 💜 Deep Purple - Rich purple accents
- 🌅 Sunset - Warm, inviting colors
- More themes regularly added!

## 💾 Saving & Loading

### Exported Files

When saving, two files are generated:
- `custom.css` - The CSS file to use with Gethomepage
- `custom.css.json` - Configuration file for the CSS Wizard

### How to Use

1. **Saving**:
   - Click "Save CSS" in the top navigation
   - Both files will be downloaded automatically

2. **Loading**:
   - Click "Load" in the top navigation
   - Select your `custom.css.json` file
   - Your configuration will be restored

## 🛠 Technical Details

### Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Containerization**: Docker

### Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Bug Reports

If you find a bug, please create an issue with:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable

---

Made with ❤️ for the Gethomepage community
