<img src="./readme/title1.svg"/>

<div align="center">

> Hello world! This is the project’s summary that describes the project plain and simple, limited to the space available.  

**[PROJECT PHILOSOPHY](https://github.com/HousseinDroubi/let-me-in#project-philosophy) • [WIREFRAMES](https://github.com/HousseinDroubi/let-me-in#wireframes) • [TECH STACK](https://github.com/HousseinDroubi/let-me-in#tech-stack) • [IMPLEMENTATION](https://github.com/HousseinDroubi/let-me-in#implementation) • [HOW TO RUN?](https://github.com/HousseinDroubi/let-me-in#how-to-run)**

</div>

<br><br>


<img src="./readme/title2.svg" id="project-philosophy"/>

> Let me in system will open the barrier upon the approved list of license car plates the admin choose, just by taking a picture for the car plate number through the Pi camera. 
>
> In addition, the admin has the ability to add, edit and block users. Also, he can open/close the barrier permanently or until further notice.

### User Stories
- As a user, I want to know who enter and exit the parking, so that I can find them easily.
- As a user, I want to approve some of users, so that the barrier won't open for others.
- As a user, I want to get informed for new upcoming guests, so that I can either approve or reject them.

<br><br>

<img src="./readme/title3.svg" id ="wireframes"/>

> This design was planned before on paper, then moved to Figma app for the fine details.
Note that i didn't use any styling library or theme, all from scratch and using pure css modules

| Login  | Forgot Password  |
| -----------------| -----|
| ![Login](/readme/figma/Login.png) | ![forgotPassword](/readme/figma/forgot_password.png) |

| Home  | All Users |
| -----------------| -----|
| ![Home](/readme/figma/home_page_events.png) | ![allUsers](/readme/figma/all_users.png) 

| Add User  | Edit User |
| -----------------| -----|
| ![addUser](/readme/figma/add_user.png) | ![editUsers](/readme/figma/edit_user.png) 

| Blocked List  | New Coming Car |
| -----------------| -----|
| ![blockedList](/readme/figma/blocked_list.png) | ![newComingUser](/readme/figma/waiting_new_car.png) 

| Edit Profile  | Change Password |
| -----------------| -----|
| ![editProfile](/readme/figma/edit_admin_data.png) | ![changePassowrd](/readme/figma/change_password.png) 

<br><br>

<img src="./readme/title4.svg" id="tech-stack"/>

Here's a brief high-level overview of the tech stack the Let me in system uses:

- This project uses the [Laravel Framework](https://laravel.com/). Laravel is a web application framework with expressive, elegant syntax.
- For the Database, MySQL was used.
- Let me in also uses the [React](https://reactjs.org/) library for the front-end. React makes it painless to create interactive UIs, is component-based and is reusable.
- For the hardware side, this project uses the [Raspberry Pi](https://www.raspberrypi.org/) and [Raspberry Pi 3 Model B+](https://www.raspberrypi.com/products/raspberry-pi-3-model-b-plus/) as a specific type. Raspberry Pi is a single board computer, which provides a set of GPIO (General Purpose Input/Ouput) pins, so, it allows you to control one or many electronic components for physical computing and explore the Internet of Things (IoT).
- [Python](https://www.python.org/) is the programming language used for the Pi. Python is an interpreted, object-oriented, high-level programming language with dynamic semantics.

<br><br>

<img src="./readme/title5.svg" id="implementation"/>
> Using the above mentioned tech stacks and the wireframes built with figma from the user stories we have, the implementation of the app is shown as below, these are gifs from the real app.

| Open the Barrier| 
| -----------------|
|![OpenBarrier](/readme/gifs/open_barrier.gif)|

| Close the Barrier| 
| -----------------|
|![CloseBarrier](/readme/gifs/close_barrier.gif)|

| Return to Initial State| 
| -----------------|
|![NormalBarrier](/readme/gifs/return_to_normal.gif)|

| User in the Accepted List| 
| -----------------|
|![AcceptedUser](/readme/gifs/accepted_user.gif)|

| User in the Blocked List| 
| -----------------|
|![BlockedUser](/readme/gifs/rejected_user.gif)|

| Accept New User| 
| -----------------|
|![AcceptNewUser](/readme/gifs/new_user_accept.gif)|

| Reject New User| 
| -----------------|
|![RejectNewUser](/readme/gifs/new_user_reject.gif)|

| Forgot Password| 
| -----------------|
|![ForgotPassword](/readme/gifs/forgot_password.gif)|

| Home Page  | Edit Profile |
| -----------------| -----|
| ![Login](/readme/gifs/login.gif) | ![ChangePassword](/readme/gifs/change_password.gif) 

| Add User  | Edit User's Data |
| -----------------| -----|
| ![AddUser](/readme/gifs/add_user.gif) | ![EditUser](/readme/gifs/edit_user.gif) 

| Block User  | Unblock User |
| -----------------| -----|
| ![BlockUser](/readme/gifs/block_user.gif) | ![UnblockUser](/readme/gifs/unblock_user.gif) 

> These are screenshots from the real app.

| Landing  | Login |
| -----------------| -----|
| ![Landing](/readme/screenshots/get_started.png) | ![Login](/readme/screenshots/login.png) 

| Forgot Password  | Home |
| -----------------| -----|
| ![ForgotPassword](/readme/screenshots/forgot_password.png) | ![Home](/readme/screenshots/home_page.png) 

| All Users  | Add User |
| -----------------| -----|
| ![AllUsers](/readme/screenshots/all_users.png) | ![AddUser](/readme/screenshots/add_user.png)

| Edit User  | Blocked Users |
| -----------------| -----|
| ![EditUser](/readme/screenshots/edit_user.png) | ![BlockedUsers](/readme/screenshots/blocked_users.png) 

| Waiting User  | Admin Profile |
| -----------------| -----|
| ![WaitingUser](/readme/screenshots/waiting_user.png) | ![AdminProfile](/readme/screenshots/edit_admin_data.png) 

| Change Password  |
| -----------------| 
| ![ChangePassword](/readme/screenshots/change_admin_password.png) |

<br><br>

<img src="./readme/title6.svg" id="how-to-run"/>
> This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* Download and Install [XAMPP](https://www.apachefriends.org/download.html)
* Download and Install [composer](https://getcomposer.org/Composer-Setup.exe)
* Download and Install [Tesseract OCR](https://github.com/tesseract-ocr/tesseract#installing-tesseract)
* Download and Install [Python](https://www.python.org/downloads/) and [Pip](https://pip.pypa.io/en/stable/installation/)
* npm
```sh
npm install npm@latest -g
```
* Now open the environment variables->double click on Path->New->Add python and tesseract ocr. In my case, tesseract OCR path was:
```sh
C:\Program Files\Tesseract-OCR
```
* Now click Ok. In the 'User variables' above, click on New..., then add the following:
1. Enter for 'Variable name':
```sh
TESSDATA_PREFIX
``` 
2. Enter for 'Variable value' the below if your tesseract OCR path is the same as mine then click OK.
```sh
C:\Program Files\Tesseract-OCR\tessdata
```
* Open your cmd and download using pip as following:
```sh
pip install pytesseract
```
```sh
pip install pillow opencv-python
```
```sh
pip install python-dotenv
```
* For the hardware part:
    - Raspberry Pi 3 model B+
    - PiCamera
    - Stepper motor
    - L298N Motor Driver Module
    - IR Sensor
    - Power Supply DC 12V 1A
    - 3 resistors 330 ohm
    - Red led
    - Green led
    - Yellow led
    - Breadboard
    - Jumper wires
* On the Raspberry Pi, open the terminal:
```sh
pip3 install python-dotenv
```
### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

Strting with the backend:
1. Clone the repo:
```sh
git clone https://github.com/HousseinDroubi/let-me-in
```
2. Open your XAMPP control panel and start Apache and MySQL

3. Go to backend 
```sh
cd backend
```
4. Rename the .env.example file to .env and specify your database name

5. Turn on 2-Step Verification on your email
```sh
manage your google account->security->turn on 2-Step Verification
```
6. At the same page, create App passwords
```sh
manage your google account->security->App passwords
```
7. Copy the app password, and go back to .env file and fill the following:
```sh
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_USERNAME='Your email'
MAIL_PASSWORD='The password you just copied'
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="Your email"
MAIL_FROM_NAME="${APP_NAME}"
```
8. Migrate the database schema
```sh
   php artisan migrate
```
9. Generate a new JWT secret key:
```sh
php artisan jwt:secret
```
10. Install the dependencies
```sh
   composer install
```
11. Open the cmd and copy the IPv4
```sh
ipconfig
```
12. Go back and launch the server
```sh
php artisan serve --host your IPv4 --port 8000
```
13. Using [Postman](https://www.postman.com/downloads/):

- Create an account for the admin and another one for the Raspberry Pi using 'register' route
- Create one row into the table barrier_statuses 
- Login for the Raspberry Pi (second email you created for it) using 'login' route, and copy the 'access_token' 

14. Now go to the Raspberry Pi, and clone the repo (same step #1)

15. Rename the .env.example file to .env and past the 'access_token' from postman into MY_TOKEN 

16. Remove 'your IPv4' and replace the IPv4 of your access point (same as step #11). But, be carefull, the Raspberry Pi and your pc must be connected to the same access point

17. Now, we have to connect the circuit as below:
![circuit](/readme/circuit/let-me-in-circuit.png)

18. Now to get the front-end get running, go into the front-end folder in a new terminal
```sh
   cd frontend
```
19. Install the dependencies
```sh 
npm install
```
20. Rename .env.example to .env

21. From .env remove your IPv4 and put your own IPv4.

22. Start the application
```sh
npm start
```