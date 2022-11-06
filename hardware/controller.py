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
#used pins are used.
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