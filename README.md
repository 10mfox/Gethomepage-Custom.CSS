# CSS Wizard for Gethomepage

A powerful CSS customization tool for Gethomepage, featuring live preview and an intuitive interface for creating beautiful, responsive designs.

![CSS-Wizard-11-14-2024_09_09_AM](https://github.com/user-attachments/assets/bd8487cc-5695-4ffc-b40f-8feccf613e26)

## ✨ Features

- **Live Preview**: Real-time visualization of changes
- **Custom Presets**: Create, save, and manage custom themes
- **Comprehensive Styling**:
  - Font customization
  - Border controls (width, radius, colors)
  - Backdrop filters and effects
  - Hover and focus states
- **Dark/Light Mode**: Seamless theme switching
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
      - "5556:5556"  # Can be changed to any available port
    environment:
      - PORT=5556    # Must match the port mapping above
    restart: always
    network_mode: bridge
```

### Important Configuration Notes

- The port number in the `ports` mapping must match the `PORT` environment variable
- Example: To use port 5556:
  ```yaml
  ports:
    - "5556:5556"
  environment:
    - PORT=5556
  ```

### Starting the Service

1. Navigate to your docker-compose directory
2. Run: `docker-compose up -d`
3. Access the CSS Wizard at `http://localhost:[YOUR_PORT]`

## 🎨 Using the CSS Wizard

### Basic Workflow

1. **Configure Features**:
   - Use Feature Toggles to enable/disable styling options
   - Toggle options like fonts, colors, borders, and effects

2. **Customize Styles**:
   - Adjust fonts from the extensive font library
   - Set border properties (width, radius)
   - Configure backdrop filters
   - Choose colors using the color picker

3. **Save Custom Presets**:
   - Create and save custom themes
   - Import previously saved configurations

4. **Preview and Export**:
   - Use the live preview to verify changes
   - Export your configuration when satisfied

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
