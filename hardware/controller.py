import RPi.GPIO as GPIO
import time
import os
import requests
from dotenv import load_dotenv
from picamera import PiCamera
from PIL import Image
load_dotenv()

# GPIO.BOARD mode will refer to the number of the pin in the plug
GPIO.setmode(GPIO.BOARD)

#Set warning as false will never give attentions that the actual
#used pins are in use.
GPIO.setwarnings(False)

#The below function will initiate the 3 leds at pin 29,31 and 37
def initiate_Leds():
    GPIO.setup(29,GPIO.OUT)
    GPIO.setup(31,GPIO.OUT)
    GPIO.setup(37,GPIO.OUT)
    
#The below function will turn on the green led    
def turnOnGreen():
    print("Turning on green")
    GPIO.output(37,GPIO.HIGH)
  
#The below function will turn off the green led    
def turnOffGreen():
    print("Turning off green")
    GPIO.output(37,GPIO.LOW)

#The below function will return true if green led is turned on.
#Otherwise, it will return false
def isGreenTurnedOn():    
    if(GPIO.input(37)==1):
        return True
    return False

#The below function will turn on the yellow led 
def turnOnYellow():
    print("Turning on yellow")
    GPIO.output(31,GPIO.HIGH)

#The below function will turn off the yellow led   
def turnOffYellow():
    print("Turning off yellow")
    GPIO.output(31,GPIO.LOW)
 
#The below function will return true if yellow led is turned on.
#Otherwise, it will return false 
def isYellowTurnedOn():    
    if(GPIO.input(31)==1):
        return True
    return False

#The below function will turn on the red led 
def turnOnRed():
    print("Turning on red")
    GPIO.output(29,GPIO.HIGH)
    
#The below function will turn off the red led      
def turnOffRed():
    print("Turning off red")
    GPIO.output(29,GPIO.LOW)

#The below function will return true if red led is turned on.
#Otherwise, it will return false 
def isRedTurnedOn():    
    if(GPIO.input(29)==1):
        return True
    return False

#The below function will turn off the 3 leds
def turnOffLeds():
    turnOffRed()
    turnOffGreen()
    turnOffYellow()

#The below function will initiate the stepper motor at pin 11,
#12 ,13 and 15. These pins are plugged into a motor controller
#called L298N Motor Driver Module
def initiate_Barrier():
    GPIO.setup(11,GPIO.OUT)
    GPIO.setup(12,GPIO.OUT)
    GPIO.setup(13,GPIO.OUT)
    GPIO.setup(15,GPIO.OUT)

#The below function will rotate the stepper motor depending on a
#given angle
def barrierAngle(angle):
    out1 = 13
    out2 = 11
    out3 = 15
    out4 = 12

    i=0
    positive=0
    negative=0
    y=0
    try:
      GPIO.output(out1,GPIO.LOW)
      GPIO.output(out2,GPIO.LOW)
      GPIO.output(out3,GPIO.LOW)
      GPIO.output(out4,GPIO.LOW)
      x = int(angle)
      if x>0 and x<=400:
          for y in range(x,0,-1):
              if negative==1:
                  if i==7:
                      i=0
                  else:
                      i=i+1
                  y=y+2
                  negative=0
              positive=1
              if i==0:
                  GPIO.output(out1,GPIO.HIGH)
                  GPIO.output(out2,GPIO.LOW)
                  GPIO.output(out3,GPIO.LOW)
                  GPIO.output(out4,GPIO.LOW)
                  time.sleep(0.03)
              elif i==1:
                  GPIO.output(out1,GPIO.HIGH)
                  GPIO.output(out2,GPIO.HIGH)
                  GPIO.output(out3,GPIO.LOW)
                  GPIO.output(out4,GPIO.LOW)
                  time.sleep(0.03)
              elif i==2:  
                  GPIO.output(out1,GPIO.LOW)
                  GPIO.output(out2,GPIO.HIGH)
                  GPIO.output(out3,GPIO.LOW)
                  GPIO.output(out4,GPIO.LOW)
                  time.sleep(0.03)
              elif i==3:    
                  GPIO.output(out1,GPIO.LOW)
                  GPIO.output(out2,GPIO.HIGH)
                  GPIO.output(out3,GPIO.HIGH)
                  GPIO.output(out4,GPIO.LOW)
                  time.sleep(0.03)
              elif i==4:  
                  GPIO.output(out1,GPIO.LOW)
                  GPIO.output(out2,GPIO.LOW)
                  GPIO.output(out3,GPIO.HIGH)
                  GPIO.output(out4,GPIO.LOW)
                  time.sleep(0.03)
              elif i==5:
                  GPIO.output(out1,GPIO.LOW)
                  GPIO.output(out2,GPIO.LOW)
                  GPIO.output(out3,GPIO.HIGH)
                  GPIO.output(out4,GPIO.HIGH)
                  time.sleep(0.03)
              elif i==6:    
                  GPIO.output(out1,GPIO.LOW)
                  GPIO.output(out2,GPIO.LOW)
                  GPIO.output(out3,GPIO.LOW)
                  GPIO.output(out4,GPIO.HIGH)
                  time.sleep(0.03)
              elif i==7:    
                  GPIO.output(out1,GPIO.HIGH)
                  GPIO.output(out2,GPIO.LOW)
                  GPIO.output(out3,GPIO.LOW)
                  GPIO.output(out4,GPIO.HIGH)
                  time.sleep(0.03)
              if i==7:
                  i=0
                  continue
              i=i+1
      
      elif x<0 and x>=-400:
          x=x*-1
          for y in range(x,0,-1):
              if positive==1:
                  if i==0:
                      i=7
                  else:
                      i=i-1
                  y=y+3
                  positive=0
              negative=1
              if i==0:
                  GPIO.output(out1,GPIO.HIGH)
                  GPIO.output(out2,GPIO.LOW)
                  GPIO.output(out3,GPIO.LOW)
                  GPIO.output(out4,GPIO.LOW)
                  time.sleep(0.03)
              elif i==1:
                  GPIO.output(out1,GPIO.HIGH)
                  GPIO.output(out2,GPIO.HIGH)
                  GPIO.output(out3,GPIO.LOW)
                  GPIO.output(out4,GPIO.LOW)
                  time.sleep(0.03)
              elif i==2:  
                  GPIO.output(out1,GPIO.LOW)
                  GPIO.output(out2,GPIO.HIGH)
                  GPIO.output(out3,GPIO.LOW)
                  GPIO.output(out4,GPIO.LOW)
                  time.sleep(0.03)
              elif i==3:    
                  GPIO.output(out1,GPIO.LOW)
                  GPIO.output(out2,GPIO.HIGH)
                  GPIO.output(out3,GPIO.HIGH)
                  GPIO.output(out4,GPIO.LOW)
                  time.sleep(0.03)
              elif i==4:  
                  GPIO.output(out1,GPIO.LOW)
                  GPIO.output(out2,GPIO.LOW)
                  GPIO.output(out3,GPIO.HIGH)
                  GPIO.output(out4,GPIO.LOW)
                  time.sleep(0.03)
              elif i==5:
                  GPIO.output(out1,GPIO.LOW)
                  GPIO.output(out2,GPIO.LOW)
                  GPIO.output(out3,GPIO.HIGH)
                  GPIO.output(out4,GPIO.HIGH)
                  time.sleep(0.03)
              elif i==6:    
                  GPIO.output(out1,GPIO.LOW)
                  GPIO.output(out2,GPIO.LOW)
                  GPIO.output(out3,GPIO.LOW)
                  GPIO.output(out4,GPIO.HIGH)
                  time.sleep(0.03)
              elif i==7:    
                  GPIO.output(out1,GPIO.HIGH)
                  GPIO.output(out2,GPIO.LOW)
                  GPIO.output(out3,GPIO.LOW)
                  GPIO.output(out4,GPIO.HIGH)
                  time.sleep(0.03)
              if i==0:
                  i=7
                  continue
              i=i-1 
    
    except KeyboardInterrupt:
        GPIO.cleanup()

#The below function will call barrierAngle function and give it
#90 degree as an angle        
def openBarrier():
    print("Opening Barrier")
    barrierAngle(90)
    
#The below function will call barrierAngle function and give it
#-90 degree as an angle 
def closeBarrier():
    print("Closing Barrier")
    barrierAngle(-90)

#The below function will initiate the IRSensor at pin 8 as input,
#since we need to read from it the digital output ('0' or '1')   
def initiate_IRSensor():
    GPIO.setup(8,GPIO.IN)
 
#The below function will read from IRSensor its output.
#So, in case the IRSensor's digital output was 0, it will return
#true. Otherwise, it will return false    
def isSomethingClose():
    if GPIO.input(8)==0:
        return True
    return False

#The below function will send a request to the server, in order
#to get barrier status. So, the response must be 'opened', 'closed'
#'opened' or 'normal'
def getBarrierStatus():
    token = os.getenv('MY_TOKEN')
    auth = {'Authorization': 'Bearer ' + token}
    try:
        r = requests.get(os.getenv('GET_BARRIER_STATUS_URL')
                     ,headers=auth)
        if(r.text =="closed" or r.text =="opened" or r.text =="normal"):
            return r.text
        return "closed"
    except:
        print("Error while getting barrier status")
        return "closed"

#The below function will take a picture from Raspberry Pi camera,
#then rotate it by -90 degree.
def takePicture():
    #Initiate PiCamera
    camera = PiCamera()
    #Set PiCamera resolution
    camera.resolution = (1920,1080)
    #Start preview
    print("Taking a picture")
    camera.start_preview()
    time.sleep(1)
    #Get an image and save it into the same folder of the file
    #we are calling takePicture() function
    camera.capture("car_plate.jpg")
    #Stop preview
    camera.stop_preview()
    #Close camera
    camera.close()
    #Rotate image using PIL library
    image = Image.open("./car_plate.jpg")
    rotated_image = image.rotate(-90)
    #Save the rotated image by overwriting on the previous one
    rotated_image = rotated_image.save("car_plate.jpg")

#The below function will send a post request to the server,
#taking the last captured image as data, in order to get the
#status of this car plate number    
def checkCarPlate():
    token = os.getenv('MY_TOKEN')
    auth = {'Authorization': 'Bearer ' + token}
    image = {'image' : open('car_plate.jpg','rb')}
    try:
        r = requests.post(os.getenv('CHECK_CAR_PLATE_URL')
                     ,headers=auth,files=image)
        return r.text
    except:
        return "close"

#The below function will send a get request to the server,
#taking the car plate number as data, in order to get the decision    
#of the admin about this car plate number that's not existed
#neither in the approved list, nor in the blocked list    
def getCarDecision(car_plate_number):
    token = os.getenv('MY_TOKEN')
    auth = {'Authorization': 'Bearer ' + token}
    try:
        r = requests.get(os.getenv('GET_CAR_DECISION_URL')+car_plate_number
                     ,headers=auth)
        if(r.text=="close" or r.text=="open" or r.text=="wait"):
            return r.text
        return "close"
    except:
        return "close"
        
def letUserIn():
    #Turn off yellow led
    turnOffYellow()
    #Turn on green led
    turnOnGreen()
    #Open barrier
    openBarrier()
    time.sleep(3)
    #Close barrier
    closeBarrier()
    #Turn off green led
    turnOffGreen()

def rejectUser():
    #Turn off yellow led
    turnOffYellow()
    #Turn on red led
    turnOnRed()
    time.sleep(3)
    #Turn off red led
    turnOffRed()