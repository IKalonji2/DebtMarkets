import os
import subprocess
import sys
from pathlib import Path

services = ["auth-node", "debt-markets-node/src/ai_engine"]

def check_command(command):
    try:
        subprocess.run([command, "--version"], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        return True
    except FileNotFoundError:
        return False

def install_node_dependencies(service):
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
    os.chdir("..")

def setup_python_environment():
    print("Setting up Python AI engine...")
    if not check_command("python3"):
        print("Python3 is not installed. Please install Python3 and retry.")
        sys.exit(1)

    ai_engine_path = Path("ai_engine")
    if not ai_engine_path.exists():
        print("AI Engine directory does not exist!")
        sys.exit(1)
    os.chdir(ai_engine_path)

    if not Path("venv").exists():
        print("Creating Python virtual environment...")
        subprocess.run(["python3", "-m", "venv", "venv"])

    activate_script = "venv/bin/activate" if os.name != "nt" else "venv\\Scripts\\activate"
    subprocess.run(f"source {activate_script} && pip install -r requirements.txt", shell=True)

    os.chdir("..")

def start_node_service(service):
    print(f"Starting {service} service...")
    os.chdir(service)
    subprocess.Popen(["npx","ts-node","seedData.ts"])
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
