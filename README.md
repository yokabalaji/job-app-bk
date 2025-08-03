1.   clone project:
             git clone repository url


2.   install package
            npm install in your terminal
    
3.   compile Project:
            npm run start  in your terminal

4.   run Project:
            npm run dev in your terminal

5.   API'S
        run post man for the api links:
    
    1.   Create User API(Open api):

                POST http://localhost:8080/api/v1/users

    2.    Login User Login API (open Api):
    
                POST http://localhost:8080/api/v1/login

    4.    Post Jobs API (Authenticated) by Admin :

                POST http://localhost:8080/api/v1/jobs

    5.    find One Job API (Authenticated) By User And Admin:

                 http://localhost:8080/api/v1/jobs/688e28d1b913eb767f88645e(jobid)

    6.    find All Jobs API (Authenticated) By User And Admin :

                 http://localhost:8080/api/v1/jobs

    7.    Update Job API (Authenticated) by Admin:

                 PUT http://localhost:8080/api/v1/jobs/:jobId
                 Example: http://localhost:8080/api/v1/jobs/688e28d1b913eb767f88645e