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

        # Mobile option lists
        self.mobile_options = {
            'font_sizes': [
                "12px", "13px", "14px", "15px", "16px"
            ],
            'line_heights': [
                "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8"
            ],
            'border_widths': [
                "1px", "2px", "3px", "4px", "5px", "6px", "8px", "10px"
            ],
            'padding_values': [
                "4px", "6px", "8px", "10px", "12px", "14px", "16px", "20px"
            ],
            'margin_values': [
                "4px", "6px", "8px", "10px", "12px", "14px", "16px", "20px", "24px", "28px", "32px"
            ],
            'gap_values': [
                "2px", "4px", "5px", "8px", "10px", "12px", "14px", "16px", "20px"
            ]
        }

        # Add mobile specific variables
        self.mobile_vars = {
            'mobile_font_size': tk.StringVar(value='14px'),
            'mobile_line_height': tk.StringVar(value='1.5'),
            'mobile_service_card_border': tk.StringVar(value='3px'),
            'mobile_service_card_padding': tk.StringVar(value='8px'),
            'mobile_service_card_margin': tk.StringVar(value='8px'),
            'mobile_widget_margin': tk.StringVar(value='20px'),
            'mobile_tab_padding': tk.StringVar(value='10px'),
            'mobile_tab_gap': tk.StringVar(value='10px'),
            'landscape_font_size': tk.StringVar(value='13px'),
            'landscape_tab_padding': tk.StringVar(value='8px'),
            'portrait_font_size': tk.StringVar(value='12px'),
            'portrait_service_border': tk.StringVar(value='5px'),
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
        
        # Create main notebook
        self.notebook = ttk.Notebook(root)
        self.notebook.pack(fill='both', expand=True, padx=10, pady=5)
        
        # Create tabs
        self.create_main_tab()
        self.create_mobile_tab()
        self.create_preview_tab()
        
        # Create bottom buttons
        self.create_bottom_buttons()

    def create_main_tab(self):
        main_frame = ttk.Frame(self.notebook)
        self.notebook.add(main_frame, text='Settings')
        
        # Create three columns using frames
        toggle_frame = ttk.LabelFrame(main_frame, text="Feature Toggles")
        general_frame = ttk.LabelFrame(main_frame, text="General Settings")
        color_frame = ttk.LabelFrame(main_frame, text="Colors & Borders")
        
        toggle_frame.grid(row=0, column=0, padx=10, pady=5, sticky='nsew')
        general_frame.grid(row=0, column=1, padx=10, pady=5, sticky='nsew')
        color_frame.grid(row=0, column=2, padx=10, pady=5, sticky='nsew')
        
        # Configure grid weights
        main_frame.columnconfigure(0, weight=1)
        main_frame.columnconfigure(1, weight=1)
        main_frame.columnconfigure(2, weight=1)
        
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

    def create_mobile_tab(self):
        mobile_frame = ttk.Frame(self.notebook)
        self.notebook.add(mobile_frame, text='Mobile Settings')
        
        # Create three columns using frames
        general_mobile = ttk.LabelFrame(mobile_frame, text="General Mobile")
        landscape_frame = ttk.LabelFrame(mobile_frame, text="Landscape Mode")
        portrait_frame = ttk.LabelFrame(mobile_frame, text="Portrait Mode")
        
        general_mobile.grid(row=0, column=0, padx=10, pady=5, sticky='nsew')
        landscape_frame.grid(row=0, column=1, padx=10, pady=5, sticky='nsew')
        portrait_frame.grid(row=0, column=2, padx=10, pady=5, sticky='nsew')
        
        # Configure grid weights
        mobile_frame.columnconfigure(0, weight=1)
        mobile_frame.columnconfigure(1, weight=1)
        mobile_frame.columnconfigure(2, weight=1)
        
        # General Mobile Settings
        general_settings = [
            ('Font Size', 'mobile_font_size', 'font_sizes'),
            ('Line Height', 'mobile_line_height', 'line_heights'),
            ('Service Card Border', 'mobile_service_card_border', 'border_widths'),
            ('Service Card Padding', 'mobile_service_card_padding', 'padding_values'),
            ('Service Card Margin', 'mobile_service_card_margin', 'margin_values'),
            ('Widget Margin', 'mobile_widget_margin', 'margin_values'),
            ('Tab Padding', 'mobile_tab_padding', 'padding_values'),
            ('Tab Gap', 'mobile_tab_gap', 'gap_values'),
        ]
        
        for idx, (label, var, options) in enumerate(general_settings):
            ttk.Label(general_mobile, text=label).grid(row=idx, column=0, padx=5, pady=5, sticky='w')
            ttk.Combobox(general_mobile,
                        textvariable=self.mobile_vars[var],
                        values=self.mobile_options[options],
                        state='readonly').grid(row=idx, column=1, padx=5, pady=5, sticky='ew')
        
        # Landscape Settings
        landscape_settings = [
            ('Font Size', 'landscape_font_size', 'font_sizes'),
            ('Tab Padding', 'landscape_tab_padding', 'padding_values'),
        ]
        
        for idx, (label, var, options) in enumerate(landscape_settings):
            ttk.Label(landscape_frame, text=label).grid(row=idx, column=0, padx=5, pady=5, sticky='w')
            ttk.Combobox(landscape_frame,
                        textvariable=self.mobile_vars[var],
                        values=self.mobile_options[options],
                        state='readonly').grid(row=idx, column=1, padx=5, pady=5, sticky='ew')
        
        # Portrait Settings
        portrait_settings = [
            ('Font Size', 'portrait_font_size', 'font_sizes'),
            ('Service Border', 'portrait_service_border', 'border_widths'),
        ]
        
        for idx, (label, var, options) in enumerate(portrait_settings):
            ttk.Label(portrait_frame, text=label).grid(row=idx, column=0, padx=5, pady=5, sticky='w')
            ttk.Combobox(portrait_frame,
                        textvariable=self.mobile_vars[var],
                        values=self.mobile_options[options],
                        state='readonly').grid(row=idx, column=1, padx=5, pady=5, sticky='ew')
        
        # Configure column weights for all frames
        general_mobile.columnconfigure(1, weight=1)
        landscape_frame.columnconfigure(1, weight=1)
        portrait_frame.columnconfigure(1, weight=1)

    def create_preview_tab(self):
        preview_frame = ttk.Frame(self.notebook)
        self.notebook.add(preview_frame, text='Preview')
        
        self.preview_text = tk.Text(preview_frame, wrap=tk.WORD, height=20)
        self.preview_text.pack(fill='both', expand=True, padx=5, pady=5)
        
        refresh_button = ttk.Button(preview_frame, text="Refresh Preview", 
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

        # Add mobile styles
        css_parts.append("""
/* Mobile Styles */
@media screen and (max-width: 768px) {
  body {
    font-size: """ + self.mobile_vars['mobile_font_size'].get() + """;
    line-height: """ + self.mobile_vars['mobile_line_height'].get() + """;
    white-space: normal;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  .service-card {
    border-width: """ + self.mobile_vars['mobile_service_card_border'].get() + """;
    padding: """ + self.mobile_vars['mobile_service_card_padding'].get() + """;
    margin: """ + self.mobile_vars['mobile_service_card_margin'].get() + """ 0;
  }
  .information-widget-resource {
    margin-left: """ + self.mobile_vars['mobile_widget_margin'].get() + """;
    margin-right: """ + self.mobile_vars['mobile_widget_margin'].get() + """;
    flex-wrap: wrap;
    justify-content: center;	
  }
  /* Bookmark Layout */
  @media(min-width: 500px) {
      .bookmark-list.flex.flex-col {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 0rem;
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
  #myTab {
    padding: 5px;
    background: none;
    backdrop-filter: none;
    display: flex;
    justify-content: flex-start;  
    flex-wrap: wrap;
    justify-content: center;
    gap: """ + self.mobile_vars['mobile_tab_gap'].get() + """;
  }
  button[id$='-tab'] {
    border-width: var(--my-border-width);
    padding: """ + self.mobile_vars['mobile_tab_padding'].get() + """;
    margin: 0;
    width: calc(50% - 5px);
    justify-content: center;
  }
}

/* Landscape-specific Mobile Styles */
@media screen and (max-width: 850px) and (orientation: landscape) {
  body {
    font-size: """ + self.mobile_vars['landscape_font_size'].get() + """;
  }
  #widgets-wrap {
    column-gap: 0rem;
  }
  #myTab {
    flex-wrap: nowrap;
    overflow-x: auto;
    justify-content: flex-start;
    padding-bottom: 10px;
    gap: 5px;
  }
  .information-widget-resource {
    margin-left: 20px;
    margin-right: 20px;
    flex-wrap: wrap;
    justify-content: center;		
  }
  button[id$='-tab'] {
    border-width: var(--my-border-width);
    padding: """ + self.mobile_vars['landscape_tab_padding'].get() + """;
    min-height: 36px;
    width: 100%;
  }
}

/* Portrait-specific Mobile Styles */
@media screen and (max-width: 480px) and (orientation: portrait) {
  body {
    font-size: """ + self.mobile_vars['portrait_font_size'].get() + """;
  }
  .service-card {
    border-width: """ + self.mobile_vars['portrait_service_border'].get() + """;
    padding: 8px;
    margin: 8px 0;
  }
  #widgets-wrap {
    column-gap: 0rem;
  }
  .information-widget-resource {
    margin-left: 20px;
    margin-right: 20px;
    flex-wrap: wrap;
    justify-content: center;		
  }
  button[id$='-tab'] {
    border-width: var(--my-border-width);
    padding: 8px;
    min-height: 36px;
    width: 100%;
  }
  
  /* Bookmark Layout */
  @media(min-width: 500px) {
      .bookmark-list.flex.flex-col {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 2rem;
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
                'toggles': {k: v.get() for k, v in self.toggles.items()},
                'mobile_vars': {k: v.get() for k, v in self.mobile_vars.items()}
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
                    
                # Load all variable types
                for config_dict, var_dict in [
                    ('css_vars', self.css_vars),
                    ('toggles', self.toggles),
                    ('mobile_vars', self.mobile_vars)
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
    root.mainloop()

if __name__ == "__main__":
    main()
