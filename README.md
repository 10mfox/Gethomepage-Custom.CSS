# CSS Wizard for Gethomepage

A powerful visual CSS customization tool for [Gethomepage](https://github.com/gethomepage/homepage), featuring real-time preview and an intuitive interface for creating beautiful, responsive designs. Customize your Gethomepage instance with ease using our interactive editor.

![CSS-Wizard-11-14-2024_09_09_AM](https://github.com/user-attachments/assets/bd8487cc-5695-4ffc-b40f-8feccf613e26)

## ✨ Features

- **Visual Editor**: Interactive interface for CSS customization
- **Live Preview**: See your changes in real-time
- **Theme Management**:
  - Built-in theme presets (Matrix, Ocean Deep, Dracula, Nord, etc.)
  - Create and save custom themes
  - Import/export configurations
- **Comprehensive Styling Options**:
  - Text customization (fonts, colors)
  - Border effects (static, animated gradients)
  - Element-specific styling (tabs, widgets, cards, bookmarks)
  - Interactive states (hover, focus)
  - Backdrop filters and blur effects
- **Feature Toggles**: Enable/disable specific styling components
- **Dark/Light Mode**: Built-in theme switching
- **Mobile-Optimized**: Responsive design for all screen sizes

## 🚀 Getting Started

### Prerequisites

- Docker
- Docker Compose (optional, but recommended)
- A running instance of Gethomepage
- logged in to github

#### How to login to github
I'll help you with logging into GitHub from Docker. Here's how to do it using personal access tokens (PATs), which is the recommended authentication method:

First, create a GitHub Personal Access Token:

Go to GitHub.com → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
Click "Generate new token"
Give it appropriate permissions (at minimum, read:packages and write:packages)
Copy the generated token immediately (you won't be able to see it again)


Log in to Docker using your GitHub credentials:

```docker login ghcr.io -u YOUR_GITHUB_USERNAME```
When prompted for password, enter your Personal Access Token (not your GitHub password)

### Installation Options

#### Option 1: Docker Run

```bash
docker run -d \
  --name homepage-css-editor \
  -p 5556:5556 \
  -e PORT=5556 \
  ghcr.io/10mfox/gethomepage-custom-css:latest
```

#### Option 2: Docker Compose (Recommended)

1. Create or update your `docker-compose.yml`:

```yaml
services:
  homepage-css-editor:
    container_name: Homepage-CSS-Editor
    image: ghcr.io/10mfox/gethomepage-custom-css:latest
    ports:
      - "5556:5556"
    environment:
      - PORT=5556
    restart: unless-stopped
```

2. Deploy with Docker Compose:

```bash
docker compose up -d
```

### Important Notes

- The port number in the container mapping (`ports`) must match the `PORT` environment variable
- Choose any available port on your system
- Example for port 5556:
  ```yaml
  ports:
    - "5556:5556"
  environment:
    - PORT=5556
  ```

## 🎨 Using the CSS Wizard

### Basic Workflow

1. **Access the Editor**
   - Open `http://localhost:5556` (or your configured port)
   - Switch between dark/light mode using the theme toggle

2. **Configure Features**
   - Use the "Feature Toggles" dropdown to enable desired options
   - Options are grouped by function (borders, effects, appearance, etc.)
   - Mutually exclusive options are automatically managed

3. **Customize Styles**
   - Adjust general settings (font, border width, radius, backdrop filter)
   - Use color pickers for various elements
   - Configure static or animated gradient borders
   - Set hover and focus effects

4. **Manage Themes**
   - Try built-in presets from the dropdown
   - Save your configurations as custom presets
   - Import/export your settings

5. **Preview and Export**
   - Use the live preview panel to verify changes
   - Export your configuration when satisfied

### Feature Toggle Groups

- **Static Border Elements**: Apply solid borders to widgets, tabs, cards, bookmarks
- **Animated Border Elements**: Enable gradient rotating borders
- **Hover Effects**: Configure static or animated hover states
- **Focus Effects**: Set keyboard focus highlighting
- **Appearance**: Control fonts, colors, backgrounds, backdrop filters
- **Layout**: Adjust card titles alignment and footer visibility

## 💾 Saving & Loading

### Exported Files

When saving your configuration, two files are generated:

1. `custom.css`: The generated CSS file to use with Gethomepage
2. `custom.css.json`: Configuration file for the CSS Wizard

### Using Your Custom CSS

1. Save your configuration using the "Save CSS" button
2. Copy the contents of `custom.css` to your Gethomepage custom CSS file
3. Restart Gethomepage to apply changes

### Loading Previous Configurations

1. Click the "Load" button in the top navigation
2. Select your previously saved `custom.css.json` file
3. Your settings will be restored

## 🛠 Technical Details

### Built With

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Container**: Alpine-based Docker image

### Browser Compatibility

Tested and supported in:
- Chrome/Edge 120+
- Firefox 120+
- Safari 17+

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`

## 🐛 Bug Reports

If you find a bug, please create an issue with:
- Detailed steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Browser and version information

---

Made with ❤️ for the Gethomepage community
