import os
import cv2
import imutils
import pytesseract
from pathlib import Path
from dotenv import load_dotenv

# Load the .env file 
env_path = Path(__file__).parents[2]
env_path = str(env_path)+"\\.env"
load_dotenv(env_path)

# Get car image path from .env file
image_path = os.environ.get("CAR_PLATE_PATH")

# psm stands for 'Page Segmentation Mode', which is the way that we are extracting the characters from the image
# osm stands for 'OCR Engine Mode', which is the way we are using the OCR (Here it's the default)
myconfig = r"--psm 11 --oem 3"

# Read the image using cv2
image = imutils.resize(cv2.imread(image_path), width=500)

gray_image=cv2.bilateralFilter(cv2.cvtColor(image,cv2.COLOR_BGR2GRAY),11,17,17)

canny_edges = cv2.Canny(gray_image,120,200)

car_plate_number =""



car_plate_number.replace(" ", "") 
new_car_plate=""
for element in range(0, len(car_plate_number)):
    if(car_plate_number[element].isalpha() or car_plate_number[element].isnumeric()):
        new_car_plate=new_car_plate+car_plate_number[element].upper()

print(new_car_plate)   