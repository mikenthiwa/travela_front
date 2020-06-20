# Project variables
PROJECT_NAME ?= travela-frontend
TARGET_MAX_CHAR_NUM=10
# File names
DOCKER_DEV_COMPOSE_FILE := docker/dev/docker-compose.yml
DOCKER_E2E_TESTS_COMPOSE_FILE := docker/e2e-tests/docker-compose.yml

.PHONY: help

## Show help
help:
	@echo ''
	@echo 'Usage:'
	@echo '${YELLOW} make ${RESET} ${GREEN}<target> [options]${RESET}'
	@echo ''
	@echo 'Targets:'
	@awk '/^[a-zA-Z\-\_0-9]+:/ { \
		message = match(lastLine, /^## (.*)/); \
		if (message) { \
			command = substr($$1, 0, index($$1, ":")-1); \
			message = substr(lastLine, RSTART + 3, RLENGTH); \
			printf "  ${YELLOW}%-$(TARGET_MAX_CHAR_NUM)s${RESET} %s\n", command, message; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)
	@echo ''

background:
	@ ${INFO} "Building required docker images"
	@ docker-compose -f $(DOCKER_DEV_COMPOSE_FILE) build web
	@ ${INFO} "Starting background local development server"
	@ docker-compose -f $(DOCKER_DEV_COMPOSE_FILE) up -d

## Start local development server
start:
	@ ${INFO} "Building required docker images"
	@ docker-compose -f $(DOCKER_DEV_COMPOSE_FILE) build web
	@ ${INFO} "Build Completed successfully"
	@ echo " "
	@ ${INFO} "Starting local development server"
	@ docker-compose -f $(DOCKER_DEV_COMPOSE_FILE) up web

## Launch the storybook environment for component builds
components:
	@ ${INFO} "Building required docker images"
	@ docker-compose -f $(DOCKER_DEV_COMPOSE_FILE) build storybook
	@ ${INFO} "Build Completed successfully"
	@ echo " "
	@ ${INFO} "Starting storybook environment"
	@ docker-compose -f $(DOCKER_DEV_COMPOSE_FILE) up -d storybook

## Stop local development server containers
stop:
	${INFO} "Stop development server containers"
	@ docker-compose -f $(DOCKER_DEV_COMPOSE_FILE) down -v
	${INFO} "All containers stopped successfully"

## Run project test cases
test:background
	@ ${INFO} "Running tests in docker container"
	@ docker-compose -f $(DOCKER_DEV_COMPOSE_FILE) exec web yarn test

## Run end-to-end tests; make e2e-tests BACKEND=path/to/backend [BRANCH=backend branch to run the tests against] [SPEC=specific test file to run]
e2e-tests:
ifeq ($(BACKEND),)
	$(error BACKEND is not set: make e2e-tests BACKEND=absolute-path/to/backend/repo)
endif
	@ export BACKEND=$(BACKEND)

ifdef $(BRANCH)
	@ ${INFO} "Checking out to $(BRANCH) branch on backend"
	@ cd $(BACKEND) && git checkout $(BRANCH)
endif

	@ ${INFO} "Building required docker images"
	@ docker-compose -f $(DOCKER_E2E_TESTS_COMPOSE_FILE) build
	@ ${INFO} "Done building required docker images"
	@ ${INFO} "Running end-to-end tests"
	@ docker-compose -f $(DOCKER_E2E_TESTS_COMPOSE_FILE) up -d database
	@ docker-compose -f $(DOCKER_E2E_TESTS_COMPOSE_FILE) up -d backend
	@ docker-compose -f $(DOCKER_E2E_TESTS_COMPOSE_FILE) up -d frontend
	@while [ "$$(docker inspect --format '{{ .State.Health.Status }}' $$(docker-compose -f docker/e2e-tests/docker-compose.yml ps -q frontend))" != "healthy" ]; do \
		printf "    Waiting for frontend.\r"; \
		sleep 0.5; \
		printf "    Waiting for frontend..\r"; \
		sleep 0.5; \
		printf "    Waiting for frontend...\r"; \
		sleep 0.5; \
		printf "\r\033[K"; \
		printf "    Waiting for frontend\r"; \
		sleep 0.5; \
	done; \
	true

ifeq ($(SPEC),)
	@ -docker-compose -f $(DOCKER_E2E_TESTS_COMPOSE_FILE) exec frontend yarn end2end:headless
else
	@ export SPEC=$(SPEC)
	@ -docker-compose -f $(DOCKER_E2E_TESTS_COMPOSE_FILE) exec frontend yarn end2end:headless --spec $(SPEC)
endif

	@ ${INFO} "Stopping and deleting the containers"
	@ docker-compose -f $(DOCKER_E2E_TESTS_COMPOSE_FILE) down

## Remove all development containers and volumes
clean:
	${INFO} "Cleaning your local environment"
	${INFO} "Note all ephemeral volumes will be destroyed"
	@ docker-compose -f $(DOCKER_DEV_COMPOSE_FILE) down -v
	@ docker images -q -f label=application=$(PROJECT_NAME) | xargs -I ARGS docker rmi -f ARGS
	${INFO} "Removing dangling images"
	@ docker system prune
	${INFO} "Clean complete"

## Ssh into service container
ssh:background
	${INFO} "Opening web container terminal"
	@ docker-compose -f $(DOCKER_DEV_COMPOSE_FILE) exec web bash

  # COLORS
GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
MAGENTA  := $(shell tput -Txterm setaf 5)
NC := "\e[0m"
RESET  := $(shell tput -Txterm sgr0)
# Shell Functions
INFO := @bash -c 'printf $(YELLOW); echo "===> $$1"; printf $(NC)' SOME_VALUE
EXTRA := @bash -c 'printf "\n"; printf $(MAGENTA); echo "===> $$1"; printf "\n"; printf $(NC)' SOME_VALUE
SUCCESS := @bash -c 'printf $(GREEN); echo "===> $$1"; printf $(NC)' SOME_VALUE
