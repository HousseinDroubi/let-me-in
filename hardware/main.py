import controller as fct
import time

#Initiate stepper motor
fct.initiate_Barrier()
#Initiate IRSensor
fct.initiate_IRSensor()
#Initiate Leds
fct.initiate_Leds()

#Suppose that the barrier is closed as first step
is_barrier_closed = True
