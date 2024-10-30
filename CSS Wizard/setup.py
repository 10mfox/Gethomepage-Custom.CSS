#!/usr/bin/env python3

import os
import sys
import platform
import subprocess
import shutil

def is_windows():
    return platform.system().lower() == "windows"

def is_linux():
    return platform.system().lower() == "linux"

def check_python():
    return sys.version_info >= (3, 6)

def check_tkinter():
    try:
        import tkinter
        return True
    except ImportError:
        return False

def install_linux_dependencies():
    try:
        # Update package list
        subprocess.run(['sudo', 'apt-get', 'update'], check=True)
        
        # Install Python and tkinter if needed
        subprocess.run(['sudo', 'apt-get', 'install', '-y', 'python3', 'python3-tk'], check=True)
        
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error installing dependencies: {e}")
        return False
    except Exception as e:
        print(f"Unexpected error: {e}")
        return False

def main():
    print("CSS Wizard Setup Script")
    print("-----------------------")
    
    # Check Python version
    if not check_python():
        print("Error: Python 3.6 or higher is required.")
        if is_windows():
            print("Please install Python from https://www.python.org/downloads/")
            print("Make sure to check 'Add Python to PATH' during installation")
        elif is_linux():
            print("Please install Python 3 using your package manager")
        input("Press Enter to exit...")
        sys.exit(1)

    # Check tkinter
    if not check_tkinter():
        print("Tkinter is not installed.")
        if is_linux():
            print("Installing tkinter...")
            if not install_linux_dependencies():
                print("Failed to install tkinter. Please install python3-tk manually.")
                input("Press Enter to exit...")
                sys.exit(1)
        elif is_windows():
            print("Please reinstall Python with tkinter enabled")
            input("Press Enter to exit...")
            sys.exit(1)

    # Make sure css-wizard.py exists
    if not os.path.exists('css-wizard.py'):
        print("Error: css-wizard.py not found in the current directory!")
        input("Press Enter to exit...")
        sys.exit(1)

    # Make css-wizard.py executable on Linux
    if is_linux():
        try:
            os.chmod('css-wizard.py', 0o755)
        except Exception as e:
            print(f"Warning: Could not make css-wizard.py executable: {e}")

    print("\nAll requirements met. Starting CSS Wizard...")
    
    try:
        # Run the CSS wizard
        if is_windows():
            os.system('python css-wizard.py')
        else:
            os.system('python3 css-wizard.py')
    except Exception as e:
        print(f"Error running CSS Wizard: {e}")
        input("Press Enter to exit...")
        sys.exit(1)

if __name__ == "__main__":
    main()
