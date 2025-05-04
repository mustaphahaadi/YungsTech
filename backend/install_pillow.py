import subprocess
import sys

print("Attempting to install Pillow using pip...")
try:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow==9.5.0"])
    print("Pillow 9.5.0 installed successfully!")
except subprocess.CalledProcessError as e:
    print(f"Failed to install Pillow 9.5.0: {e}")
    try:
        print("Trying alternative version...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow==9.0.1"])
        print("Pillow 9.0.1 installed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"Failed to install Pillow 9.0.1: {e}")
        print("Please try installing Pillow manually or use a pre-built wheel.")