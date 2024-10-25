@echo off
setlocal enabledelayedexpansion

echo Checking for Python installation...

:: Check if Python is installed by trying to run it
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Python is installed, checking dependencies...
    
    :: Check for required packages
    python -c "import tkinter" >nul 2>&1
    if !errorlevel! neq 0 (
        echo Installing tkinter...
        python -m pip install tk
    )
    
    :: Try to run the CSS Wizard
    if exist "css-wizard.py" (
        echo Starting CSS Wizard...
        python css-wizard.py
    ) else (
        echo Error: css-wizard.py not found in the current directory.
        echo Please ensure the CSS Wizard script is in the same folder as this batch file.
        pause
        exit /b 1
    )
) else (
    echo Python is not installed.
    echo Would you like to download and install Python? [Y/N]
    set /p choice=
    
    if /i "!choice!"=="Y" (
        echo Downloading Python installer...
        :: Download Python installer using PowerShell
        powershell -Command "& {Invoke-WebRequest -Uri 'https://www.python.org/ftp/python/3.11.0/python-3.11.0-amd64.exe' -OutFile 'python_installer.exe'}"
        
        if exist "python_installer.exe" (
            echo Installing Python...
            :: Run the installer with recommended settings
            start /wait python_installer.exe /quiet InstallAllUsers=1 PrependPath=1
            
            :: Clean up installer
            del python_installer.exe
            
            :: Refresh environment variables
            echo Refreshing environment...
            call refreshenv.cmd >nul 2>&1
            
            :: Try running the script again
            echo Installation complete. Starting CSS Wizard...
            python css-wizard.py
        ) else (
            echo Failed to download Python installer.
            echo Please visit https://www.python.org/downloads/ to download and install Python manually.
            pause
            exit /b 1
        )
    ) else (
        echo Python installation cancelled.
        echo Please install Python from https://www.python.org/downloads/ to run this application.
        pause
        exit /b 1
    )
)

endlocal
