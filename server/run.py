import os
# Set environment variables for the application

from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(port=5555, debug=True)