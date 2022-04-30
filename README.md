# Job Seeking Tracker Application

A web application to help you track your job applications.

## Features

+ Users can login with their username to access their own account
+ Users can record the `company name`, `submit day`, `job title`, `job description link`, `referral name`, and the history status for each submission
+ Sorting the submissions by application status
+ Users can edit the application status and/or check for the history status of the hiring process
+ Contains reference links to popular job boards and a search window to search for job posts on indeed

## How to use

#### Run the application

* Download the code to your local machine

* `cd YOUR-CODE-PATH/`

* `npm install` and then `npm run build` to install the dependencies, and then `npm start` to run the server 

* Go to `http://localhost:3000`

* Running the dev by: `npm run dev` and then going to `http://localhost:4000`

#### Application rules

+ Login
    + You are required to login with a username
    + `dog` is an invalid username. You cannot use it as your username

+ Add a new application
    + Click on the `Add new application` button to push a new job application
    + The job title and job description link must have at least one entry
    + The submission day format must be `MM/DD/YYYY`, or you are not allow to submit the push
  
+ Update a submission
    + Click on the `UPDATE` button to get the edit form
    + There are shortcut keys to mark the submission as `Get Offer`/`Withdraw`/`Not Selected` by one-click
    + Click on the `DELETE` button to delete this submission