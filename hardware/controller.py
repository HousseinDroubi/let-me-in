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
