import tkinter as tk
from tkinter import ttk, colorchooser, filedialog
import json
import os

class CSSWizard:
    def __init__(self, root):
        self.root = root
        self.root.title("CSS Theme Configuration Wizard For Homepage")
        root.state('zoomed')
        
        # Predefined options for dropdowns
        self.font_options = [
            "Arial", "Helvetica", "Times New Roman", "Georgia", 
            "Verdana", "Courier New", "Impact", "Comic Sans MS", "Trebuchet MS"
        ]
        
        self.border_width_options = [
            "1px", "2px", "3px", "4px", "5px", "6px", "8px", "10px"
        ]
        
        self.border_radius_options = [
            "0", ".25rem", ".375rem", ".5rem", ".75rem", "1rem", "1.5rem"
        ]
        
        self.backdrop_filter_options = [
            "none",
            "blur(4px)", "blur(8px)", "blur(12px)", "blur(16px)",
            "brightness(50%)", "brightness(75%)", "brightness(125%)",
            "contrast(50%)", "contrast(75%)", "contrast(125%)"
        ]

        self.font_weight_options = [
            "normal", "bold", "lighter", "bolder",
            "100", "200", "300", "400", "500", "600", "700", "800", "900"
        ]
        
        # Create variables to store theme settings
        self.theme_vars = {
            'backdrop_filter': tk.StringVar(value="blur(8px)"),
            'border_color': tk.StringVar(value="#1B5E20"),
            'focus_border_color': tk.StringVar(value="#4169E1"),
            'hover_border_color': tk.StringVar(value="#DC143C"),
            'tab_border_color': tk.StringVar(value="#2E7D32"),
            'tab_focus_border_color': tk.StringVar(value="#1E88E5"),
            'tab_hover_border_color': tk.StringVar(value="#D32F2F"),
            'border_width': tk.StringVar(value="5px"),
            'border_radius': tk.StringVar(value=".375rem"),
            'tab_border_width': tk.StringVar(value="3px"),
            'tab_border_radius': tk.StringVar(value=".25rem"),
            'tab_backdrop_filter': tk.StringVar(value="blur(4px)"),
            'font_family': tk.StringVar(value="Arial"),
            'font_weight': tk.StringVar(value="normal"),
            'text_color': tk.StringVar(value="#FFD700")
        }

        # Create variables for feature toggles
        self.feature_toggles = {
            'enable_borders': tk.BooleanVar(value=True),
            'enable_border_radius': tk.BooleanVar(value=True),
            'enable_backdrop_filter': tk.BooleanVar(value=True),
            'enable_hover_effects': tk.BooleanVar(value=True),
            'enable_focus_effects': tk.BooleanVar(value=True),
            'enable_tab_styling': tk.BooleanVar(value=True),
            'enable_font_styling': tk.BooleanVar(value=True),
            'enable_text_color': tk.BooleanVar(value=True)
        }
        
        self.create_gui()
    
    def create_gui(self):
        # Create notebook for tabbed interface
        notebook = ttk.Notebook(self.root)
        notebook.pack(fill='both', expand=True, padx=10, pady=5)
        
        # Basic Settings Tab
        basic_frame = ttk.Frame(notebook)
        notebook.add(basic_frame, text='Basic Settings')

        # Feature Toggle Frame
        toggle_frame = ttk.LabelFrame(basic_frame, text="Feature Toggles")
        toggle_frame.pack(fill='x', padx=5, pady=5)

        # Create toggles in two columns
        left_toggles = ttk.Frame(toggle_frame)
        left_toggles.pack(side='left', fill='x', expand=True, padx=5, pady=5)
        right_toggles = ttk.Frame(toggle_frame)
        right_toggles.pack(side='left', fill='x', expand=True, padx=5, pady=5)

        # Left column toggles
        ttk.Checkbutton(left_toggles, text="Enable Borders", 
                       variable=self.feature_toggles['enable_borders']).pack(anchor='w')
        ttk.Checkbutton(left_toggles, text="Enable Border Radius", 
                       variable=self.feature_toggles['enable_border_radius']).pack(anchor='w')
        ttk.Checkbutton(left_toggles, text="Enable Backdrop Filter", 
                       variable=self.feature_toggles['enable_backdrop_filter']).pack(anchor='w')
        ttk.Checkbutton(left_toggles, text="Enable Hover Effects", 
                       variable=self.feature_toggles['enable_hover_effects']).pack(anchor='w')

        # Right column toggles
        ttk.Checkbutton(right_toggles, text="Enable Focus Effects", 
                       variable=self.feature_toggles['enable_focus_effects']).pack(anchor='w')
        ttk.Checkbutton(right_toggles, text="Enable Tab Styling", 
                       variable=self.feature_toggles['enable_tab_styling']).pack(anchor='w')
        ttk.Checkbutton(right_toggles, text="Enable Font Styling", 
                       variable=self.feature_toggles['enable_font_styling']).pack(anchor='w')
        ttk.Checkbutton(right_toggles, text="Enable Text Color", 
                       variable=self.feature_toggles['enable_text_color']).pack(anchor='w')
        
        # Create main columns container
        columns_frame = ttk.Frame(basic_frame)
        columns_frame.pack(fill='both', expand=True, padx=5, pady=5)
        
        # Left Column - Colors
        left_column = ttk.Frame(columns_frame)
        left_column.pack(side='left', fill='both', expand=True, padx=5)
        
        # Colors Frame
        colors_frame = ttk.LabelFrame(left_column, text="Color Settings")
        colors_frame.pack(fill='x', padx=5, pady=5)
        
        # Normal Border Colors
        ttk.Label(colors_frame, text="Normal Border Colors", font=('Helvetica', 10, 'bold')).pack(anchor='w', padx=5, pady=2)
        self.create_color_picker(colors_frame, "Border Color", 'border_color')
        self.create_color_picker(colors_frame, "Focus Border Color", 'focus_border_color')
        self.create_color_picker(colors_frame, "Hover Border Color", 'hover_border_color')
        
        # Tab Border Colors
        ttk.Label(colors_frame, text="Tab Border Colors", font=('Helvetica', 10, 'bold')).pack(anchor='w', padx=5, pady=2)
        self.create_color_picker(colors_frame, "Tab Border Color", 'tab_border_color')
        self.create_color_picker(colors_frame, "Tab Focus Border Color", 'tab_focus_border_color')
        self.create_color_picker(colors_frame, "Tab Hover Border Color", 'tab_hover_border_color')
        
        # Text Color
        ttk.Label(colors_frame, text="Text Color", font=('Helvetica', 10, 'bold')).pack(anchor='w', padx=5, pady=2)
        self.create_color_picker(colors_frame, "Text Color", 'text_color')
        
        # Middle Column - Border Settings
        middle_column = ttk.Frame(columns_frame)
        middle_column.pack(side='left', fill='both', expand=True, padx=5)
        
        # Normal Border Settings Frame
        border_frame = ttk.LabelFrame(middle_column, text="Normal Border Settings")
        border_frame.pack(fill='x', padx=5, pady=5)
        
        # Normal Border Settings with Dropdowns
        self.create_dropdown_field(border_frame, "Border Width", 'border_width', self.border_width_options)
        self.create_dropdown_field(border_frame, "Border Radius", 'border_radius', self.border_radius_options)
        self.create_dropdown_field(border_frame, "Backdrop Filter", 'backdrop_filter', self.backdrop_filter_options)
        
        # Tab Border Settings Frame
        tab_border_frame = ttk.LabelFrame(middle_column, text="Tab Border Settings")
        tab_border_frame.pack(fill='x', padx=5, pady=5)
        
        # Tab Border Settings
        self.create_dropdown_field(tab_border_frame, "Tab Border Width", 'tab_border_width', self.border_width_options)
        self.create_dropdown_field(tab_border_frame, "Tab Border Radius", 'tab_border_radius', self.border_radius_options)
        self.create_dropdown_field(tab_border_frame, "Tab Backdrop Filter", 'tab_backdrop_filter', self.backdrop_filter_options)
        
        # Right Column - Font Settings
        right_column = ttk.Frame(columns_frame)
        right_column.pack(side='left', fill='both', expand=True, padx=5)
        
        # Font Settings with Dropdown
        font_frame = ttk.LabelFrame(right_column, text="Font Settings")
        font_frame.pack(fill='x', padx=5, pady=5)
        
        self.create_dropdown_field(font_frame, "Font Family", 'font_family', self.font_options)
        self.create_dropdown_field(font_frame, "Font Weight", 'font_weight', self.font_weight_options)
        
        # Bottom Buttons Frame
        buttons_frame = ttk.Frame(self.root)
        buttons_frame.pack(fill='x', padx=10, pady=5)
        
        ttk.Button(buttons_frame, text="Generate CSS", command=self.generate_css).pack(side='left', padx=5)
        ttk.Button(buttons_frame, text="Save Settings", command=self.save_settings).pack(side='left', padx=5)
        ttk.Button(buttons_frame, text="Load Settings", command=self.load_settings).pack(side='left', padx=5)
    
    def create_color_picker(self, parent, label, var_name):
        frame = ttk.Frame(parent)
        frame.pack(fill='x', padx=5, pady=2)
        
        ttk.Label(frame, text=f"{label}:").pack(side='left', padx=5)
        entry = ttk.Entry(frame, textvariable=self.theme_vars[var_name])
        entry.pack(side='left', fill='x', expand=True, padx=5)
        ttk.Button(frame, text="Pick Color", 
                  command=lambda: self.pick_color(var_name)).pack(side='left', padx=5)
    
    def create_dropdown_field(self, parent, label, var_name, options):
        frame = ttk.Frame(parent)
        frame.pack(fill='x', padx=5, pady=2)
        
        ttk.Label(frame, text=f"{label}:").pack(side='left', padx=5)
        dropdown = ttk.Combobox(frame, textvariable=self.theme_vars[var_name], values=options)
        dropdown.pack(side='left', fill='x', expand=True, padx=5)
        dropdown.set(self.theme_vars[var_name].get())  # Set current value
        
        # Make it editable for custom values
        dropdown.config(state='normal')
    
    def pick_color(self, var_name):
        color = colorchooser.askcolor(title="Choose Color")[1]
        if color:
            self.theme_vars[var_name].set(color)
    
    def generate_css(self):
        css_parts = []
        
        # Root variables section
        root_vars = []
        if self.feature_toggles['enable_backdrop_filter'].get():
            root_vars.append("  --my-backdrop-filter: %(backdrop_filter)s;")
        if self.feature_toggles['enable_borders'].get():
            root_vars.append("  --my-border-color: %(border_color)s;")
        if self.feature_toggles['enable_focus_effects'].get():
            root_vars.append("  --my-focus-border-color: %(focus_border_color)s;")
        if self.feature_toggles['enable_hover_effects'].get():
            root_vars.append("  --my-hover-border-color: %(hover_border_color)s;")
        if self.feature_toggles['enable_borders'].get():
            root_vars.append("  --my-border-width: %(border_width)s;")
        if self.feature_toggles['enable_border_radius'].get():
            root_vars.append("  --my-border-radius: %(border_radius)s;")
        
        if self.feature_toggles['enable_tab_styling'].get():
            root_vars.extend([
                "  /* Tab-specific variables */",
                "  --tab-border-color: %(tab_border_color)s;",
                "  --tab-focus-border-color: %(tab_focus_border_color)s;",
                "  --tab-hover-border-color: %(tab_hover_border_color)s;",
                "  --tab-border-width: %(tab_border_width)s;",
                "  --tab-border-radius: %(tab_border_radius)s;",
                "  --tab-backdrop-filter: %(tab_backdrop_filter)s;"
            ])
        
        if self.feature_toggles['enable_font_styling'].get():
            root_vars.extend([
                '  --my-font: "%(font_family)s";',
                "  --my-font-weight: %(font_weight)s;"
            ])
        
        if root_vars:
            css_parts.append("/* Define the vars you need */\n:root {\n" + "\n".join(root_vars) + "\n}")

        # Font styles
        if self.feature_toggles['enable_font_styling'].get() or self.feature_toggles['enable_text_color'].get():
            font_styles = []
            if self.feature_toggles['enable_font_styling'].get():
                font_styles.extend([
                    "  font-family: var(--my-font) !important;",
                    "  font-weight: var(--my-font-weight) !important;"
                ])
            if self.feature_toggles['enable_text_color'].get():
                font_styles.append("  color: %(text_color)s !important;")
            css_parts.append("\n/* Font Styles */\n* {\n" + "\n".join(font_styles) + "\n}")

# Service Widgets Border Styles
        widget_styles = []
        if self.feature_toggles['enable_borders'].get():
            widget_styles.append("  border-width: var(--my-border-width);")
        if self.feature_toggles['enable_border_radius'].get():
            widget_styles.append("  border-radius: var(--my-border-radius);")
        if self.feature_toggles['enable_borders'].get():
            widget_styles.append("  border-color: var(--my-border-color);")
        if self.feature_toggles['enable_backdrop_filter'].get():
            widget_styles.append("  backdrop-filter: var(--my-backdrop-filter);")
        
        if widget_styles:
            widget_styles.extend([
                "  padding: 1px;",
                "  margin: 5px;",
                "  border-spacing: 0;"
            ])
            css_parts.append("\n/* Service Widgets Border Styles */\n#information-widgets,\n.bookmark-text,\n.service-card {\n" + "\n".join(widget_styles) + "\n}")

        # Focus effects
        if self.feature_toggles['enable_focus_effects'].get():
            css_parts.append("""
#information-widgets:focus,
.bookmark-text:focus,
.service-card:focus {
  border-color: var(--my-focus-border-color);
}""")

        # Hover effects
        if self.feature_toggles['enable_hover_effects'].get():
            css_parts.append("""
#information-widgets:hover,
.bookmark-text:hover,
.service-card:hover {
  border-color: var(--my-hover-border-color);
}""")

        # Tab styles
        if self.feature_toggles['enable_tab_styling'].get():
            tab_styles = ["""
/* All Tab Styles */
#myTab {
  padding: 5px;
  background: none;
  backdrop-filter: none;
  display: flex;
  justify-content: flex-start;
  gap: 40px;
}

/* Tab Border Styles */
button[id$='-tab'] {
  border-width: var(--tab-border-width);
  border-radius: var(--tab-border-radius);
  border-color: var(--tab-border-color);
  backdrop-filter: var(--tab-backdrop-filter);
  padding: 1px;
  margin: 1px;
  border-spacing: 0;"""]
            
            if self.feature_toggles['enable_font_styling'].get():
                tab_styles.append("""
  font-family: var(--my-font);
  font-weight: var(--my-font-weight);""")
            
            tab_styles.append("}")
            css_parts.append("".join(tab_styles))

            if self.feature_toggles['enable_focus_effects'].get():
                css_parts.append("""
button[id$='-tab']:focus {
  border-color: var(--tab-focus-border-color);
}""")

            if self.feature_toggles['enable_hover_effects'].get():
                css_parts.append("""
button[id$='-tab']:hover {
  border-color: var(--tab-hover-border-color);
}""")

        # Join all CSS parts with newlines
        css_content = "\n".join(css_parts) % {name: var.get() for name, var in self.theme_vars.items()}
        
        filename = filedialog.asksaveasfilename(
            defaultextension=".css",
            filetypes=[("CSS files", "*.css")]
        )
        if filename:
            with open(filename, 'w') as f:
                f.write(css_content)
    
    def save_settings(self):
        settings = {
            'theme_vars': {name: var.get() for name, var in self.theme_vars.items()},
            'feature_toggles': {name: var.get() for name, var in self.feature_toggles.items()}
        }
        filename = filedialog.asksaveasfilename(
            defaultextension=".json",
            filetypes=[("JSON files", "*.json")]
        )
        if filename:
            with open(filename, 'w') as f:
                json.dump(settings, f, indent=2)
    
    def load_settings(self):
        filename = filedialog.askopenfilename(
            filetypes=[("JSON files", "*.json")]
        )
        if filename:
            with open(filename, 'r') as f:
                settings = json.load(f)
                for name, value in settings['theme_vars'].items():
                    if name in self.theme_vars:
                        self.theme_vars[name].set(value)
                for name, value in settings['feature_toggles'].items():
                    if name in self.feature_toggles:
                        self.feature_toggles[name].set(value)

def main():
    root = tk.Tk()
    app = CSSWizard(root)
    root.mainloop()

if __name__ == "__main__":
    main()
