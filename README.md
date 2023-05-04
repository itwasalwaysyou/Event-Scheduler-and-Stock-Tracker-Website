# Event-Scheduler-and-Stock-Tracker-Website
`Full Stack` Project:creating a website that included login functionality and five pages (`Welcome`,`Create Account`,`Login`, `Schedule`, and `Add Event`), as well as a `Stock page` that displayed stock data obtained from an `external API`.

To efficiently manage user accounts and event information, I designed and implemented a database system using `SQL`.This database system enabled efficient storage and retrieval of data, allowing for seamless management of user accounts and event information.

## Database:
This system included two tables: an `account table` and an `event table`. 

![image](https://user-images.githubusercontent.com/112202949/235239034-14dca81e-7a7f-4a2a-9465-1eb8870d14ab.png)



## Create Account: 

![Screenshot from 2023-05-03 20-44-06](https://user-images.githubusercontent.com/112202949/236090988-04204704-0408-4391-9a29-c84ddd0cf557.png)

If the username or email already exists in the database, a prompt will be displayed to the user with an error message.

![Screenshot from 2023-05-03 20-44-48](https://user-images.githubusercontent.com/112202949/236091067-1c7e4109-2582-42c3-9110-1ab66ee69963.png)

## Login:

It seems that there is already an account with the name `Skylar` in the database. Let's log in directly! 

![Screenshot from 2023-05-03 20-47-19](https://user-images.githubusercontent.com/112202949/236091490-49577376-b09f-48ad-a8f6-8fbc04fc57a1.png)



## Adding new event:

The Add Event page used a form to insert new data into the database

![Screenshot from 2023-05-03 20-52-38](https://user-images.githubusercontent.com/112202949/236092923-b1f67878-763e-479f-8706-6511bd8b1c2a.png)


Great ! my lunch event has been successfully added to the database.

![Screenshot from 2023-05-03 20-53-00](https://user-images.githubusercontent.com/112202949/236092775-2bcf0490-aa76-43b1-8210-1f62ab8e26b1.png)


## Adding new events via a JSON file:

It allows for quick importing of schedule events from a JSON file. 

![image](https://user-images.githubusercontent.com/112202949/235238371-97ead17a-f40d-4693-b13a-ef34d8a75beb.png)

It seems that the events file I provided has been added to the database successfully!

![Screenshot from 2023-05-03 21-01-20](https://user-images.githubusercontent.com/112202949/236094619-f665cf78-1225-4091-9a43-ffd58ac09324.png)


## Delete Event from client :

When a user hovers over a row with an event on it, the Delete/Edit button should be shown inside the row.

![Screenshot from 2023-05-03 21-02-57](https://user-images.githubusercontent.com/112202949/236095057-f4cdd03b-82ab-400e-923c-256ae7494b02.png)

![Screenshot from 2023-05-03 21-03-07](https://user-images.githubusercontent.com/112202949/236095068-929d23d2-426c-406b-a769-56f3d3dd5d4b.png)

The event `CSCI 4131 Lecture` has been deleted from database successfully:)

![Screenshot from 2023-05-03 21-03-13](https://user-images.githubusercontent.com/112202949/236095083-fe13cd31-c734-4092-ab40-5b375e15ab93.png)


## Edit Event from client :

Let's edit the event `New Event`(for testing)!   
![Screenshot from 2023-05-03 21-09-57](https://user-images.githubusercontent.com/112202949/236096262-7710c049-1825-455b-ade9-f1f528782aee.png)
Surprise! the form should be prepopulated with the current values of the schedule, so that the user can make changes to the event and see what the original values were before changing them!!
[Screenshot from 2023-05-03 22-04-37](https://user-images.githubusercontent.com/112202949/236104242-01e30382-ef56-4550-884d-986866405c7c.png)
edit it...

![Screenshot from 2023-05-03 21-12-16](https://user-images.githubusercontent.com/112202949/236096270-d64219ec-b607-459f-b9ca-ae586218d78c.png)
Successful! 
![Screenshot from 2023-05-03 21-12-23](https://user-images.githubusercontent.com/112202949/236096272-efb8fab6-d6f0-42a3-9cdf-6fb9e167401d.png)


## Stock page:
the Stock page displayed stock data obtained from an external API.
![Screenshot from 2023-05-03 21-16-22](https://user-images.githubusercontent.com/112202949/236096737-315579be-00d0-41bc-a8f0-719200322f48.png)
![Screenshot from 2023-05-03 21-16-30](https://user-images.githubusercontent.com/112202949/236096748-7ebc2398-3048-429d-9085-8996a7aae355.png)
