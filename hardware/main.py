import controller as fct
import time

#Initiate stepper motor
fct.initiate_Barrier()

#Initiate IRSensor
fct.initiate_IRSensor()

#Initiate Leds
fct.initiate_Leds()

#Suppose that the barrier is closed by default
is_barrier_closed = True

#Turning off all leds in case there was a led turned on
fct.turnOffLeds()

while True:
    time.sleep(3)
    #Get barrier status response will be 'closed', 'opened' or 'normal'
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
            #there is a user that's waiting
            if(fct.isSomethingClose()):
                #Turn on yellow led
                fct.turnOnYellow()
                #Take picture and save it into the same directory
                fct.takePicture()
                
                #Get the car status from the server, the response,
                #must be 'open', 'close' or the 'car plate number'
                car_status = fct.checkCarPlate()
                #If the response was 'open'
                if(car_status =="open"):
                    fct.letUserIn()
                    
                #If the response was 'close'    
                elif(car_status == "close"):
                    fct.rejectUser()
                    
                else:#If the response was the car plate number
                    
                    #Here, we are supposing that we should count
                    #for this car plate number as maximum
                    #three times. So, in case the admin wasn't
                    #responding, the system will suppose that
                    #this car plate is a rejected one
                    counter = 0
                    while(counter<3):
                        
                        #Ask for this car plate number after 10 secondes.
                        print("Retrying after 10 secondes")
                        time.sleep(10)
                        
                        #Get the decision of this car plate, the decision
                        #must be 'open', 'close' or 'wait'.
                        car_decision = fct.getCarDecision(car_status)
                        
                        #If the decision was 'open'
                        if(car_decision=="open"):
                            fct.letUserIn()
                            #Stop asking for this car plate number
                            break
                        
                        #If the decision was 'close', or the counter
                        #is more than 2, hence, the system will
                        #consider it is a rejected one
                        elif(car_decision=="close" or counter==2):
                            fct.rejectUser()
                            #Stop asking for this car plate number
                            break
                        
                        else:
                            counter += 1