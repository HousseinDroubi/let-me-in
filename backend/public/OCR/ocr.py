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
myconfig = r"--psm 6 --oem 3"

# Read the image using cv2 and resize it to 500, because in our case, the Raspberry Pi is taking an image 
# while the car is exactly in front of it. Hence, taking the image 'as it' will not give us an accurate result.
image = imutils.resize(cv2.imread(image_path), width=500)

# Here, we are converting the colors of the image from blue, green and red to gray, and then, removing 
# the noise by adding bilateralFilter function which will make the 'strong edges' appear and help the 
# openCV itself to identify the edges.
gray_image=cv2.bilateralFilter(cv2.cvtColor(image,cv2.COLOR_BGR2GRAY),11,17,17)

# Now, we are using Canny to get the edges from the image.
canny_edges = cv2.Canny(gray_image,120,200)

# Here, we are getting the contours of shapes we might need in order to get the contour that has
# 4 endpoints later on.
contours,new = cv2.findContours(canny_edges.copy(),cv2.RETR_LIST,cv2.CHAIN_APPROX_SIMPLE)

# Now, we are sorting these contours, by calculating the area in descending order and take first 30 contours.
contours = sorted(contours,key=cv2.contourArea,reverse=True)[:30]

# Below, we are looping over every contour and find the contour that has 4 endpoints, which must be
# the car plate that is the same of rectangle shape.
car_plate_image=None
for contour in contours:
    
    # Calculate the perimeter of the contour and suppose it's closed.
    perimeter  = cv2.arcLength(contour, True)
    
    # Now, we are approximating the polygon using Douglas-Peucker algorithm, which is a way to get specific 
    # points of an edge accroding to a specific percentage, and in our case, this percentage will be 20%.
    # Last, suppose that the edge is closed as well.
    approx = cv2.approxPolyDP(contour,0.02 * perimeter,True)
    
    # In case the length of our approximation is 4, so, this might be a rectangle and which should be the car
    # plate in our case.
    if len(approx)==4:

        # Here, x and y are respectively X and Y coordinates, w and y are respectively the width and height.
        # Hence, boundingRect will let us to get the x,y,w and h of this contour.
        x,y,w,h=cv2.boundingRect(contour)

        # Now, we need to crop this image. x and y will be the coordinates of the bottom-left of the contour.
        # Add to that, the height will be added to the y coordinate and the width will be added to x coordinate.
        car_plate_image=gray_image[y:y+h,x:x+w]
        break

# Now, we are converting the cropped image to only black and white image by fixing the theshold.
# Hence, any pixel that has a value more than 100, it will be converted to 255 which is white, otherwise, it will be converted to 0 which is black.
threshold,blackAndWhiteImage=cv2.threshold(car_plate_image,120,255,cv2.THRESH_BINARY)

# Get the car plate number from image using pytesseract and with english language.
car_plate_number = pytesseract.image_to_string(blackAndWhiteImage,config=myconfig,lang='eng')

# Convert all letters to uppercase.
car_plate_number = car_plate_number

# Remove any space.
car_plate_number.replace(" ", "") 
new_car_plate_number=""

# Catch only the letters and digits
for element in range(0, len(car_plate_number)):
    if(car_plate_number[element].isalpha() or car_plate_number[element].isnumeric()):
        new_car_plate_number=new_car_plate_number+car_plate_number[element].upper()

# print result.
print(new_car_plate_number)