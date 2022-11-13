import os
import cv2
import pytesseract
from pathlib import Path
from dotenv import load_dotenv

env_path = Path(__file__).parents[2]
env_path = str(env_path)+"\\.env"
load_dotenv(env_path)
image_path = os.environ.get("CAR_PLATE_PATH")

myconfig = r"--psm 6 --oem 3"

image = cv2.imread(image_path)
car_plate_number =""
boxes = pytesseract.image_to_boxes(image,config=myconfig)
for box in boxes.splitlines():
    box = box.split(" ")
    car_plate_number = car_plate_number+box[0]