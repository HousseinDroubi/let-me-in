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