**Online Quantum Computing Frontend**

This repository hosts the source code of the University of Vienna's Online Quantum Computing front end service.

---

## Run locally

If you want to run this service locally, perform the following steps in your terminal:

1. Make sure you have installed node package manager on your machine
2. $ cd quantencomputing-webapp
3. $ npm install
4. $ npm start
5. Open your browser and navigate to http://localhost:3000/

Attention: Make sure that port 3000 is currently not blocked by another application, as it will be used as the standard port

---

## Create the docker image

To run the application within a docker container, perform the following tasks

1. Install docker locally ww
2. Build the image: $ docker build . -t ghcr.io/{{container-registry-username}}/quantencomputing-webapp
3. Run the docker image: docker run -p 3000:3000 ghcr.io/{{container-registry-username}}/quantencomputing-webapp
4. Open your browser and navigate to http://localhost:3000/

---

## Push Container image to container registry
export CR_PAT={{PersonalAccessToken}}
echo $CR_PAT | docker login ghcr.io -u USERNAME --password-stdin
docker push ghcr.io/{{container-registry-username}}/quantencomputing-webapp:latest