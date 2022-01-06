### Define constants ###
WEBAPP_NAME=cidh-front-end
WEBAPP_VERSION=v1.0
WEBAPP_PORT=4200

### To build the frontend image ###
build:
	docker build -t $(WEBAPP_NAME):$(WEBAPP_VERSION) .

### To run the frontend container ###
run:
	docker run -d --name $(WEBAPP_NAME) -p $(WEBAPP_PORT):$(WEBAPP_PORT) $(WEBAPP_NAME):$(WEBAPP_VERSION)

### Stop container and then remove image ###
remove:
	docker stop $(WEBAPP_NAME)
	docker rm --force $$(docker ps -aqf name=$(WEBAPP_NAME))

### To start the frontend container ###
start:
	docker start $(WEBAPP_NAME)

### To stop the frontend container ###
stop:
	docker stop $(WEBAPP_NAME)

### To start a bash session of frontend container ###
bash:
	docker exec -it $(WEBAPP_NAME) bash

logs:
	docker logs $$(docker ps -aqf name=$(WEBAPP_NAME))
