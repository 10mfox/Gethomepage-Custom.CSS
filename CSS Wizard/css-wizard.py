import os
import json
import tkinter as tk
from tkinter import ttk, colorchooser, filedialog, messagebox
from pathlib import Path
import webbrowser

class GetHomepageWizard:
    def __init__(self, root):
        self.root = root
        self.root.title("Gethomepage CSS Wizard")
        root.state('zoomed')
        
        # Style configuration
        self.style = ttk.Style()
        self.style.configure('TNotebook.Tab', padding=[10, 5])
        
        # Add toggle variables
        self.toggles = {
            'enable_font': tk.BooleanVar(value=True),
            'enable_text_color': tk.BooleanVar(value=True),
            'enable_background': tk.BooleanVar(value=True),
            'enable_borders': tk.BooleanVar(value=True),
            'enable_backdrop_filter': tk.BooleanVar(value=True),
            'enable_hover_effects': tk.BooleanVar(value=True),
            'enable_focus_effects': tk.BooleanVar(value=True),
        }
        
        # Common web-safe fonts
        self.font_options = [
            "Arial", "Verdana", "Helvetica", "Tahoma", "Trebuchet MS",
            "Times New Roman", "Georgia", "Garamond", "Courier New",
            "Brush Script MT", "Impact", "Comic Sans MS", "system-ui",
            "Roboto", "Open Sans", "Segoe UI"
        ]

        # Border width options
        self.border_width_options = [
            "1px", "2px", "3px", "4px", "5px",
            "6px", "8px", "10px", "12px", "16px"
        ]

        # Border radius options
        self.border_radius_options = [
            ".125rem", ".25rem", ".375rem",
            ".5rem", ".75rem", "1rem"
        ]

        # Backdrop filter options
        self.backdrop_filter_options = [
            "blur(8px)", "blur(4px)",
            "blur(12px)", "blur(16px)"
        ]
        
        # Initialize variables
        self.css_vars = {
            'backdrop_filter': tk.StringVar(value='blur(8px)'),
            'border_color': tk.StringVar(value='#1B5E20'),
            'focus_border_color': tk.StringVar(value='#4169E1'),
            'hover_border_color': tk.StringVar(value='#DC143C'),
            'border_width': tk.StringVar(value='5px'),
            'border_radius': tk.StringVar(value='.375rem'),
            'font_family': tk.StringVar(value='Arial'),
            'text_color': tk.StringVar(value='#FFD700'),
            'background_color': tk.StringVar(value='#000000'),
        }
        
        # Create main container
        main_container = ttk.Frame(root)
        main_container.pack(fill='both', expand=True, padx=10, pady=5)
        
        # Create settings and preview panels
        settings_frame = ttk.Frame(main_container)
        preview_frame = ttk.Frame(main_container)
        
        settings_frame.pack(side='left', fill='both', expand=True, padx=5)
        preview_frame.pack(side='right', fill='both', expand=True, padx=5)
        
        # Create settings sections
        self.create_settings_panel(settings_frame)
        self.create_preview_panel(preview_frame)
        
        # Create bottom buttons
        self.create_bottom_buttons()

    def create_settings_panel(self, parent):
        # Create three columns using frames
        toggle_frame = ttk.LabelFrame(parent, text="Feature Toggles")
        general_frame = ttk.LabelFrame(parent, text="General Settings")
        color_frame = ttk.LabelFrame(parent, text="Colors & Borders")
        
        toggle_frame.pack(fill='both', expand=True, pady=5)
        general_frame.pack(fill='both', expand=True, pady=5)
        color_frame.pack(fill='both', expand=True, pady=5)
        
        # Populate toggle column
        toggle_descriptions = {
            'enable_font': 'Custom Font Family',
            'enable_text_color': 'Custom Text Color',
            'enable_background': 'Background Color',
            'enable_borders': 'Border Styling',
            'enable_backdrop_filter': 'Backdrop Filter Effects',
            'enable_hover_effects': 'Hover Effects',
            'enable_focus_effects': 'Focus Effects',
        }
        
        for idx, (toggle_var, description) in enumerate(toggle_descriptions.items()):
            ttk.Checkbutton(toggle_frame, 
                          text=description,
                          variable=self.toggles[toggle_var],
                          command=self.update_preview).grid(row=idx, column=0, padx=5, pady=5, sticky='w')
        
        # Populate general settings column
        ttk.Label(general_frame, text="Font Family:").grid(row=0, column=0, padx=5, pady=5, sticky='w')
        ttk.Combobox(general_frame, 
                    textvariable=self.css_vars['font_family'],
                    values=self.font_options,
                    state='readonly').grid(row=0, column=1, padx=5, pady=5, sticky='ew')
        
        ttk.Label(general_frame, text="Border Width:").grid(row=1, column=0, padx=5, pady=5, sticky='w')
        ttk.Combobox(general_frame,
                    textvariable=self.css_vars['border_width'],
                    values=self.border_width_options,
                    state='readonly').grid(row=1, column=1, padx=5, pady=5, sticky='ew')
        
        ttk.Label(general_frame, text="Border Radius:").grid(row=2, column=0, padx=5, pady=5, sticky='w')
        ttk.Combobox(general_frame,
                    textvariable=self.css_vars['border_radius'],
                    values=self.border_radius_options,
                    state='readonly').grid(row=2, column=1, padx=5, pady=5, sticky='ew')
        
        ttk.Label(general_frame, text="Backdrop Filter:").grid(row=3, column=0, padx=5, pady=5, sticky='w')
        ttk.Combobox(general_frame,
                    textvariable=self.css_vars['backdrop_filter'],
                    values=self.backdrop_filter_options,
                    state='readonly').grid(row=3, column=1, padx=5, pady=5, sticky='ew')
        
        general_frame.columnconfigure(1, weight=1)
        
        # Populate colors column
        color_vars = [
            ('Background Color', 'background_color'),
            ('Text Color', 'text_color'),
            ('Border Color', 'border_color'),
            ('Focus Border Color', 'focus_border_color'),
            ('Hover Border Color', 'hover_border_color'),
        ]
        
        for idx, (label, var) in enumerate(color_vars):
            ttk.Label(color_frame, text=label).grid(row=idx, column=0, padx=5, pady=5, sticky='w')
            color_entry = ttk.Entry(color_frame, textvariable=self.css_vars[var])
            color_entry.grid(row=idx, column=1, padx=5, pady=5, sticky='ew')
            
            preview_frame = ttk.Frame(color_frame, width=20, height=20)
            preview_frame.grid(row=idx, column=2, padx=2, pady=5)
            preview_frame.configure(style='Color.TFrame')
            
            ttk.Button(color_frame, text="Pick",
                      command=lambda v=var: self.pick_color(v)).grid(row=idx, column=3, padx=5, pady=5)
        
        color_frame.columnconfigure(1, weight=1)

    def create_preview_panel(self, parent):
        preview_label = ttk.Label(parent, text="CSS Preview")
        preview_label.pack(pady=5)
        
        self.preview_text = tk.Text(parent, wrap=tk.WORD)
        self.preview_text.pack(fill='both', expand=True, pady=5)
        
        refresh_button = ttk.Button(parent, text="Refresh Preview", 
                                  command=self.update_preview)
        refresh_button.pack(pady=5)

    def create_bottom_buttons(self):
        button_frame = ttk.Frame(self.root)
        button_frame.pack(fill='x', padx=10, pady=5)
        
        ttk.Button(button_frame, text="Save", 
                  command=self.save_css).pack(side='left', padx=5)
        ttk.Button(button_frame, text="Load", 
                  command=self.load_css).pack(side='left', padx=5)

    def pick_color(self, var_name):
        color = colorchooser.askcolor(color=self.css_vars[var_name].get())[1]
        if color:
            self.css_vars[var_name].set(color)
            self.update_preview()

    def generate_css(self):
        css_parts = ["/* Generated by Gethomepage CSS Wizard */"]
        css_parts.append(":root {")
        
        # Only add variables for enabled features
        if self.toggles['enable_backdrop_filter'].get():
            css_parts.append(f"  --my-backdrop-filter: {self.css_vars['backdrop_filter'].get()};")
        if self.toggles['enable_borders'].get():
            css_parts.append(f"""  --my-border-color: {self.css_vars['border_color'].get()};
  --my-border-width: {self.css_vars['border_width'].get()};
  --my-border-radius: {self.css_vars['border_radius'].get()};""")
        if self.toggles['enable_hover_effects'].get():
            css_parts.append(f"  --my-hover-border-color: {self.css_vars['hover_border_color'].get()};")
        if self.toggles['enable_focus_effects'].get():
            css_parts.append(f"  --my-focus-border-color: {self.css_vars['focus_border_color'].get()};")
        if self.toggles['enable_font'].get():
            css_parts.append(f'  --my-font: "{self.css_vars["font_family"].get()}";')
            
        css_parts.append("}")

        # Font and text color
        if self.toggles['enable_font'].get() or self.toggles['enable_text_color'].get():
            css_parts.append("\n* {")
            if self.toggles['enable_font'].get():
                css_parts.append("  font-family: var(--my-font) !important;")
            if self.toggles['enable_text_color'].get():
                css_parts.append(f"  color: {self.css_vars['text_color'].get()} !important;")
            css_parts.append("}")

        # Background color
        if self.toggles['enable_background'].get():
            css_parts.append(f"\n#page_container {{\n  background-color: {self.css_vars['background_color'].get()};\n}}")

        # Service Widgets Border Styles
        if self.toggles['enable_borders'].get() or self.toggles['enable_backdrop_filter'].get():
            css_parts.append("""
/* Service Widgets Border Styles */
#information-widgets,
.bookmark-text,
.service-card {""")
            if self.toggles['enable_borders'].get():
                css_parts.append("""  border-width: var(--my-border-width);
  border-radius: var(--my-border-radius);
  border-color: var(--my-border-color);""")
            if self.toggles['enable_backdrop_filter'].get():
                css_parts.append("  backdrop-filter: var(--my-backdrop-filter);")
            css_parts.append("}")

        # Tab Border Styles
        if self.toggles['enable_borders'].get():
            css_parts.append("""
/* Tab Border Styles */
button[id$='-tab'] {
  border-width: var(--my-border-width);
  border-radius: var(--my-border-radius);
  border-color: var(--my-border-color);""")
            if self.toggles['enable_backdrop_filter'].get():
                css_parts.append("  backdrop-filter: var(--my-backdrop-filter);")
            css_parts.append("}")

        # Hover and Focus States
        if self.toggles['enable_hover_effects'].get() or self.toggles['enable_focus_effects'].get():
            css_parts.append("\n/* Hover and Focus States */")
            if self.toggles['enable_hover_effects'].get():
                css_parts.append("""button[id$='-tab']:hover,
.service-card:hover,
.bookmark-text:hover {
  border-color: var(--my-hover-border-color);
}""")
            if self.toggles['enable_focus_effects'].get():
                css_parts.append("""
button[id$='-tab']:focus {
  border-color: var(--my-focus-border-color);
}""")

        # Add Mobile Styles
        css_parts.append("""
/* Mobile Styles */
@media screen and (max-width: 768px) {
  #myTab {
    padding: 5px;
    background: none;
    backdrop-filter: none;
    display: flex;
    justify-content: flex-start;  
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
  button[id$='-tab']::focus::hover {
    border-width: var(--my-border-width);
    padding: 10px;
    margin: 0;
    width: calc(50% - 5px);
    justify-content: center;
  }
}

/* Landscape-specific Mobile Styles */
@media screen and (max-width: 850px) and (orientation: landscape) {
  #widgets-wrap,
  .service-card  {
    gap: 1em;
  }
  .information-widget-resource {
    margin-left: 20px;
    margin-right: 20px;
    flex-wrap: wrap;
    justify-content: center;		
  }
  #myTab {
    flex-wrap: nowrap;
    overflow-x: auto;
    justify-content: flex-start;
    padding-bottom: 10px;
    gap: 5px;
  }
  button[id$='-tab']::focus::hover {
    border-width: var(--my-border-width);
    margin: auto;
    width: 100%;
  }
}

/* Portrait-specific Mobile Styles */
@media screen and (max-width: 480px) and (orientation: portrait) {
  #widgets-wrap,
  .service-card  {
    gap: 1em;
  }
  .information-widget-resource {
    margin-left: 20px;
    margin-right: 20px;
    flex-wrap: wrap;
    justify-content: center;		
  }
  button[id$='-tab']::focus::hover {
    border-width: var(--my-border-width);
    margin: auto;
    width: 100%;
  }
}""")

        return '\n'.join(css_parts)

    def update_preview(self):
        self.preview_text.delete(1.0, tk.END)
        self.preview_text.insert(1.0, self.generate_css())

    def save_css(self):
        css_content = self.generate_css()
        
        filename = filedialog.asksaveasfilename(
            defaultextension=".css",
            filetypes=[("CSS files", "*.css")],
            initialfile="custom.css"
        )
        if filename:
            with open(filename, 'w') as f:
                f.write(css_content)
            
            # Save configuration
            config_path = filename + '.json'
            config = {
                'css_vars': {k: v.get() for k, v in self.css_vars.items()},
                'toggles': {k: v.get() for k, v in self.toggles.items()}
            }
            with open(config_path, 'w') as f:
                json.dump(config, f, indent=2)
            
            messagebox.showinfo("Success", "CSS and configuration saved successfully!")

    def load_css(self):
        config_file = filedialog.askopenfilename(
            filetypes=[("Configuration files", "*.css.json")]
        )
        if config_file:
            try:
                with open(config_file, 'r') as f:
                    config = json.load(f)
                    
                # Load variables
                for config_dict, var_dict in [
                    ('css_vars', self.css_vars),
                    ('toggles', self.toggles)
                ]:
                    if config_dict in config:
                        for k, v in config[config_dict].items():
                            if k in var_dict:
                                var_dict[k].set(v)
                
                self.update_preview()
                messagebox.showinfo("Success", "Configuration loaded successfully!")
            except Exception as e:
                messagebox.showerror("Error", f"Failed to load configuration: {str(e)}")

    def center_dialog(self, dialog):
        dialog.update_idletasks()
        width = dialog.winfo_width()
        height = dialog.winfo_height()
        x = (dialog.winfo_screenwidth() // 2) - (width // 2)
        y = (dialog.winfo_screenheight() // 2) - (height // 2)
        dialog.geometry(f'{width}x{height}+{x}+{y}')

def main():
    root = tk.Tk()
    app = GetHomepageWizard(root)
    # Bind preview update to variable changes
    for var in app.css_vars.values():
        var.trace_add("write", lambda *args: app.update_preview())
    app.update_preview()  # Initial preview
    root.mainloop()

if __name__ == "__main__":
    main()