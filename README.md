# CSS Wizard for Homepage

A web-based CSS editor specifically designed for customizing Gethomepage. This tool provides an intuitive interface for creating and managing basic custom CSS styles for your Homepage instance.

![CSS-Wizard-11-06-2024_08_40_PM](https://github.com/user-attachments/assets/1b5ec82c-7e89-4a83-915d-aa9796392cd9)


## Features

- 🎨 Visual CSS editing interface
- 🌙 Dark/Light mode with persistent preferences
- 💾 Save/Load configurations that are made with this editor
- 🎯 Live CSS preview
- 📱 Responsive design with mobile support
- 🎚️ Customizable settings for:
  - Font families
  - Border styles
  - Colors
  - Backdrop filters
  - Text colors
  - Background colors
  - Hover/Focus effects

## Quick Start

### Prerequisites

- Gethomepage
- Docker
- Docker Compose

### Installation
```
  homepage-css-editor:
    container_name: Homepage-Css-Editor  
    image: ghcr.io/10mfox/gethomepage-custom.css:latest
    ports:
      - "${CSS_EDITOR_PORT}:5173"     
    env_file:
      - .env     
    restart: always    
    network_mode: bridge
```
4. Access the application at `http://localhost:3030` (or your configured port)

## Configuration

### Environment Variables

| Variable | Example |
|----------|-------------|
| CSS_EDITOR_PORT | 3030 |

### Configuration Files

When saving your configuration, two files are generated:
- `custom.css`: The generated CSS file to use with Homepage
- `custom.css.json`: Your configuration file that can be loaded back into the CSS Wizard

## Using with Homepage

1. Generate your custom CSS using the wizard
2. Download the generated `custom.css` file
3. Add the CSS file to your Homepage configuration
4. Restart Homepage to apply the changes

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments

- [Gethomepage](https://github.com/gethomepage/homepage) - The awesome dashboard this tool is designed for
- [React](https://reactjs.org/) - The web framework used
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [Vite](https://vitejs.dev/) - Build tool
