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