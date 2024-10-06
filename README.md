# vaccination-registration API


This API enables users to register for a vaccine, book slots, and allows admins to manage vaccination slots. Built with Node.js, Express.js, and MongoDB Atlas.

Features:

User registration and login.
View available slots and register for a vaccine slot.
Update slot registration up to 24 hours before the scheduled time.
Admin can create and manage vaccine slots.
Admin can view all registered users and their assigned slots.

Tech Stack:

Node.js: JavaScript runtime for the backend.
Express.js: Framework for building RESTful APIs.
MongoDB Atlas: Cloud-based NoSQL database.
Mongoose: ODM library for MongoDB.

MongoDB Atlas Credentials:

MONGODB_URI: 'mongodb+srv://sindhu:sindhu@cluster0.cixvq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

username:"sindhu"

password:"sindhu"

Installation Steps:

To run this project locally, follow these steps:

1.clone repository:
command: git clone https://github.com/yourusername/vaccine-registration-api.git
cd vaccine-registration-api

2.install dependencies

command: npm install express mongoose bcrypt

3.run

command: npm start
(server will run at 'http://localhost:5000'.)

MODELS:
1.User Model:
-> Register: {name,phoneNumber,age,pincode,aadharNo,password,vaccinationStatus};

2.Slot Model:
->slots:{date,time,availabledoses}

Using Postman for Testing the APIs:

Postman is an API testing tool that simplifies sending requests to APIs and visualizing responses. Follow the steps below to test the API endpoints described above:

Steps to Test API Endpoints with Postman:
Download and Install Postman:

If you don't have Postman installed, you can download it here.
Set Up Requests:

Open Postman and create a new request for each endpoint.
Select the HTTP method (GET, POST, PUT) based on the API.
In the URL field, enter the base URL http://localhost:5000 followed by the API path (e.g., /register, /login).
Send Data (for POST or PUT requests):

In the Body tab, choose raw and select JSON format from the dropdown.
Add the required JSON data (as specified in the API documentation above) to the body of the request.
Execute Request:

After setting the URL and body (if needed), click the "Send" button.
You will see the response in the Postman interface.
View Response:

Review the response status (e.g., 200, 400) and the message in the response body. These responses indicate whether the request was successful or if there was an error.

API Endpoints

USER ROUTES:

1. POST http://localhost:5000/api/users/register
   Description: Register a new user.
   Body Params:{
   "name": ,
   "phoneNumber":,
   "age":,
   "pincode":,
   "aadharNo":,
   "password":,
   "vaccinationStatus":

}
Response: Returns a success message upon successful registration or an error message if registration fails (e.g., if the phone number already exists).

2. POST http://localhost:5000/api/users/login  
    Description: Log in as an existing user.  
    Body Params: {  
    "phoneNumber": ,  
    "password":  
    }
   Response: Returns a success message with user details upon successful login or an error message if login fails (e.g., incorrect password).

3. POST http://localhost:5000/api/users/book-slot
   Description: Register a slot for vaccination.
   Body Params:{
   "phoneNumber": "",
   "date": "",
   "time": "",
   "doseType": ""
   }
   Response: Returns a success message upon successful registration for the slot or an error message if the slot is not available.

4. GET http://localhost:5000/api/users/slots?date=${VALUE}
   Description: View available slots for that day
   Response: Returns a list of available slots for the specified date or a message indicating no slots are available.

5. POST http://localhost:5000/api/users/manage-slot
   Description: update slot before 24 hours of registered date.
   Body Params:
   {
   "phoneNumber": "",
   "date": "",
   "time": "",
   "newDate": "",
   "newTime": ""
   }
   Response: Returns a success message upon successful update or an error message if conditions are not met (e.g., trying to update within 24 hours).

ADMIN ROUTES:

1. GET http://localhost:5000/api/admin/slots/users
   Description: total number of users in application
   Response: Returns an array of user objects with their details or an error message if retrieval fails.

2. GET http://localhost:5000/api/admin/slots/checkslots?date=${date}
   Description: check slots of users
   {
   "phoneNumber": "",
   "date": "",
   "time": "",
   "newDate": "",
   "newTime": ""
   }
   Response: Returns a list of slots along with details about registered users or a message indicating no slots are available.
