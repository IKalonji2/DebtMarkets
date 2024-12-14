import os
import subprocess
import sys
from pathlib import Path

# Define paths for services and the AI engine
services = ["API/auth-node", "debt-markets-node"]
ai_engine_path = Path("debt-markets-node/src/ai_engine")

def check_command(command):
    """Check if a command is available on the system."""
    try:
        subprocess.run([command, "--version"], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        return True
    except FileNotFoundError:
        return False

def install_node_dependencies(service):
    """Install Node.js dependencies for a service."""
    print(f"Setting up Node.js dependencies for {service}...")
    service_path = Path(service)
    if not service_path.exists():
        print(f"Service directory {service} does not exist!")
        sys.exit(1)
    os.chdir(service_path)
    result = subprocess.run(["npm", "install"])
    if result.returncode != 0:
        print(f"Error installing dependencies for {service}. Exiting setup.")
        sys.exit(1)
    os.chdir("..")  # Return to the parent directory

def setup_python_environment():
    """Set up the Python virtual environment and install dependencies."""
    print("Setting up Python AI engine...")
    if not ai_engine_path.exists():
        print("AI Engine directory does not exist!")
        sys.exit(1)
    os.chdir(ai_engine_path)

    # Create virtual environment if it doesn't exist
    if not Path("venv").exists():
        print("Creating Python virtual environment...")
        subprocess.run(["python3", "-m", "venv", "venv"])

    # Activate virtual environment and install dependencies
    activate_script = Path("venv/bin/activate")
    subprocess.run(f"bash -c 'source {activate_script} && pip3 install -r requirements.txt'", shell=True, check=True)

    os.chdir("../../../..")  # Return to the root directory

def start_node_service(service):
    """Start a Node.js service."""
    print(f"Starting {service} service...")
    os.chdir(service)
    subprocess.Popen(["npm","run","dev"])
    os.chdir("..")

def main():
    print("Starting setup for the Debt Markets application...")

    # Check for Node.js
    if not check_command("node"):
        print("Node.js is not installed. Please install Node.js and retry.")
        sys.exit(1)

    # Install dependencies for Node.js services
    for service in services:
        install_node_dependencies(service)

    # Set up Python environment for AI engine
    setup_python_environment()

    # Start services
    print("Starting services...")
    for service in services:
        start_node_service(service)

    print("All services are running! Use a process manager (e.g., ps or pm2) to monitor them.")

if __name__ == "__main__":
    main()
