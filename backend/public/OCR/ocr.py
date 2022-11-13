import os
import cv2
import pytesseract
from pathlib import Path
from dotenv import load_dotenv

env_path = Path(__file__).parents[2]
env_path = str(env_path)+"\\.env"
load_dotenv(env_path)
image_path = os.environ.get("CAR_PLATE_PATH")

