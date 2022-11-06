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

#Turning off all leds in case there was a led truned on
fct.turnOffLeds()

while True:
    time.sleep(3)
    barrier_status = fct.getBarrierStatus()
    if(barrier_status == "closed"):
        print("closed")  
        if(not is_barrier_closed):    
            fct.closeBarrier()
            fct.turnOffLeds()
            is_barrier_closed = True
        if(not fct.isRedTurnedOn()):
            fct.turnOnRed()
    elif(barrier_status == "opened"):
        print("opened")
        if(is_barrier_closed):
            fct.turnOffLeds()
            fct.openBarrier()
            is_barrier_closed = False
        if(not fct.isGreenTurnedOn()):
            fct.turnOnGreen()
    else:
        print("normal")
        if(fct.isGreenTurnedOn() or fct.isRedTurnedOn()):
            fct.turnOffLeds()
        if(not is_barrier_closed):
            fct.closeBarrier()
            is_barrier_closed = True
        if(fct.isSomethingClose()):
            time.sleep(2)
            if(fct.isSomethingClose()):
                fct.turnOnYellow()
                fct.takePicture()
                car_status = fct.checkCarPlate()
                if(car_status =="open"):
                    fct.turnOffYellow()
                    fct.turnOnGreen()
                    fct.openBarrier()
                    time.sleep(3)
                    fct.closeBarrier()
                    fct.turnOffGreen()
                elif(car_status == "close"):
                    fct.turnOffYellow()
                    fct.turnOnRed()
                    time.sleep(3)
                    fct.turnOffRed()
                else:
                    counter = 0
                    while(counter<3):
                        print("Retrying after 10 secondes")
                        time.sleep(10)
                        car_decision = fct.getCarDecision(car_status)
                        if(car_decision=="open"):
                            fct.turnOffYellow()
                            fct.turnOnGreen()
                            fct.openBarrier()
                            time.sleep(3)
                            fct.closeBarrier()
                            fct.turnOffGreen()
                            break
                        elif(car_decision=="close" or counter==2):
                            fct.turnOffYellow()
                            fct.turnOnRed()
                            time.sleep(3)
                            fct.turnOffRed()
                            break
                        else:
                            counter += 1