import os
import cv2
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
myconfig = r"--psm 6 --oem 3"

# Read the image using cv2
image = cv2.imread(image_path)
car_plate_number =""

# Get all the characters into the image
boxes = pytesseract.image_to_boxes(image,config=myconfig)
for box in boxes.splitlines():
    box = box.split(" ")
    car_plate_number = car_plate_number+box[0]

car_plate_number.replace(" ", "") 
counter = 0
got_number_first = False
got_number_first_index = -1
numbers = ""

# Here, we are getting the first 6 numbers in the image, and first uppercase letter before these 6 numbers
for index, character in enumerate(car_plate_number):
    if(character.isdigit()):
        counter+=1
        numbers = numbers+character
        if(not got_number_first):
            got_number_first=True
            got_number_first_index = index
    elif(character.isalpha()):
        counter=0  
        got_number_first=False 
        got_number_first_index=-1 
    if(counter==6):
        break
if(got_number_first_index==-1):
    print("error")
else:
    possible_characters = car_plate_number[:got_number_first_index]
    possible_characters=possible_characters[::-1]
    character = ""
    for char in possible_characters:
        if(char.isupper()):
            character = char
            break
    car_plate_number = character+numbers
    
    # Print the result
    print(car_plate_number)    