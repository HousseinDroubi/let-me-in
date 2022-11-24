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
    #Get barrier status will be closed, opened or normal
    barrier_status = fct.getBarrierStatus()
    
    #If the response was 'closed'
    if(barrier_status == "closed"):
        print("closed")
        #If the barrier wasn't closed
        if(not is_barrier_closed):
            #Close barrier
            fct.closeBarrier()
            #Turn off all leds
            fct.turnOffLeds()
            is_barrier_closed = True
            
        #If the red led wasn't turned on   
        if(not fct.isRedTurnedOn()):
            #Turn on red led
            fct.turnOnRed()
            
            
    #If the response was 'opened'      
    elif(barrier_status == "opened"):
        print("opened")
        #If the barrier was closed
        if(is_barrier_closed):
            #Turn of all leds
            fct.turnOffLeds()
            #Open barrier
            fct.openBarrier()
            is_barrier_closed = False
            
        #If the green led wasn't turned on      
        if(not fct.isGreenTurnedOn()):
            #Turn on green led
            fct.turnOnGreen()
            
            
    else:#If the response was 'normal'
        print("normal")
        
        #In case there was a led turned on
        if(fct.isGreenTurnedOn() or fct.isRedTurnedOn()):
            #Turn off all leds
            fct.turnOffLeds()
        #If the barrier wasn't closed
        if(not is_barrier_closed):
            #Close barrier
            fct.closeBarrier()
            is_barrier_closed = True
            
        #If the IRSensor return true,that means something
        #is on the front of the barrier  
        if(fct.isSomethingClose()):
            time.sleep(2)
            
            #If the IRSensor still returning true, that means
            #something a car is waiting
            if(fct.isSomethingClose()):
                #Turn on yellow led
                fct.turnOnYellow()
                #Take picture and save it into the same directory
                fct.takePicture()
                
                #Get the car status from the server, the response,
                #must be open, close or wait
                car_status = fct.checkCarPlate()
                #If the response was 'open'
                if(car_status =="open"):
                    fct.letUserIn()
                    
                #If the response was 'close'    
                elif(car_status == "close"):
                    #Turn off yellow led
                    fct.turnOffYellow()
                    #Turn on red led
                    fct.turnOnRed()
                    time.sleep(3)
                    #Turn off red led
                    fct.turnOffRed()
                    
                else:#If the response was 'wait'
                    
                    #Here, we are supposing that we should count for
                    #for this car plate number as maximum
                    #three times. So, in case the admin wasn't
                    #responding,the system will suppose that
                    #this car plate as a rejected one
                    counter = 0
                    while(counter<3):
                        
                        #Retry asking for this car plate after 10 secondes.
                        print("Retrying after 10 secondes")
                        time.sleep(10)
                        
                        #Get the decision of this car plate, the decision
                        #must be open, close or wait.
                        car_decision = fct.getCarDecision(car_status)
                        
                        #If the decision was 'open'
                        if(car_decision=="open"):
                            #Turn off yellow led
                            fct.turnOffYellow()
                            #Turn on green led
                            fct.turnOnGreen()
                            #Open barrier
                            fct.openBarrier()
                            time.sleep(3)
                            #Close barrier
                            fct.closeBarrier()
                            #Turn off green led
                            fct.turnOffGreen()
                            #Stop asking for this car plate number
                            break
                        
                        #If the decision was 'close', or the counter
                        #is more than 2, hence, the system will
                        #consider it as rejected one
                        elif(car_decision=="close" or counter==2):
                            #Turn off yellow led
                            fct.turnOffYellow()
                            #Turn on red led
                            fct.turnOnRed()
                            time.sleep(3)
                            #Turn off red led
                            fct.turnOffRed()
                            #Stop asking for this car plate number
                            break
                        
                        else:
                            counter += 1