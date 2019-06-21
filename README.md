[![CircleCI](https://circleci.com/gh/andela/travel_tool_front.svg?style=svg&circle-token=3ce13da82e06d3d2dcefa5b59608d1f1787a8419)](https://circleci.com/gh/andela/travel_tool_front)
[![Maintainability](https://api.codeclimate.com/v1/badges/e827017c4dbdedc8e944/maintainability)](https://codeclimate.com/repos/5c35c067613b2b0286009fd2/maintainability)
[![Coverage](https://api.codeclimate.com/v1/badges/e827017c4dbdedc8e944/test_coverage)](https://codeclimate.com/repos/5c35c067613b2b0286009fd2/test_coveragey)
# Andela Travel

## Description

**travel_tool_front** is the frontend application for the Andela Travel application which automates travel processes in Andela. This application also helps to collate and manage all travel-related data across Andela's locations.

## Table of Contents

- [Description](#description)
- [Documentation](#documentation)
- [Setup](#setup)
  - [Dependencies](#dependencies)
  - [Getting Started](#getting-started)
  - [Environment Variables](#environment-variables)
- [Testing](#testing)
- [To use Storybook](#to-use-storybook)
- [Prototype](#prototype)
- [Contribute](#contribute)
- [Deployment](#deployment)
- [License](#license)
- [Technical Charts](#technical-charts)

## Documentation

[Link to Documentation](https://documenter.getpostman.com/view/5772810/S1ZxbV12)

## Setup

### Dependencies

List of libraries, tools, etc needed (e.g. yarn, node.js, python, etc)

- [React.js](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Node.js](https://nodejs.org/en/) - A JavaScript runtime environment
- A package manager - [yarn](https://yarnpkg.com/lang/en/) or [NPM](https://www.npmjs.com/)
- [Redux](https://redux.js.org/) - A predictable state container for JavaScript apps
- [Webpack](https://webpack.js.org/) - A bundler for assets and scripts

### Getting Started

- Clone the repo - `git clone https://github.com/andela/travel_tool_front.git`
- Change into the project directory - `cd travel_tool_front`
- Install project dependencies run `make ssh` and/or `yarn install`
- Run the server `make start` or `yarn start`

### Environment Variables

 Create your `.env` file in the root directory by following the `.env.example` below
  ```
  REACT_APP_ANDELA_AUTH_HOST=andela microservices url
  REACT_APP_AUTH_REDIRECT_URL=website url
  REACT_APP_API_URL=api url
  REACT_APP_CLOUNDINARY_API=Your cloudinary URL
  REACT_APP_PRESET_NAME=Name of the preset for unsigned uplaod
  REACT_APP_CITY=city for a user if andela api does not return a location
  REACT_APP_ALL_USERS=Andela api endpoint to fetch information for user
  REACT_APP_DEFAULT_LOCATION=default location for a user if andela api does not return a location
  REACT_APP_JWT_PUBLIC_KEY=input public token
  NODE_ENV=environment for putting the app in maintenance mode
  REACT_APP_GOOGLE_AUTH_CLIENT_ID=google authentication id
  BAMBOOHRID_API=bamboohr directory
  ```

## Testing

- Run `make test` on the terminal to run test inside containers

## To use Storybook

- Ensure docker is installed, to install docker click [here](https://www.docker.com/products/docker-desktop)
- Run `make components` docker build command on the terminal to run storybook in the docker development environment server
- On the web browser, type `http://localhost:9001` to access storybook.

## Prototype

The application is staged [here](https://travela-staging.andela.com/)

## Contribute

Contributions to the project are welcome! Before contributing, look through the branch naming, commit message and pull request conventions [here](https://github.com/andela/engineering-playbook/tree/master/5.%20Developing/Conventions). When you are all done, follow the guidelines below to raise a pull request:

- Identify the feature, chore or bug to be worked on from the [pivotal tracker board](https://www.pivotaltracker.com/n/projects/2184887). If the ticket does not exist on the board, consult the project owners for approval before adding the ticket to the board
- Clone the repository and checkout from `develop` to a new branch to start working on the assigned task. Ensure branch names follow the convention linked above
- Work on the task following the coding standards and [style guide](https://github.com/airbnb/javascript) used in the project
- When task has been completed, make commits and raise a pull request against `develop` branch, also ensure to follow the conventions linked above

If the pull request is accepted by the owners of the repository, then it is merged into the `develop` branch and closed.

## Deployment

Deployment in this project happens under two circumstances.
- When a PR has been successfully merged to `develop`, the application is deployed to the `staging` environment.
- When `QA` and `QC` tests have been successfully carried out and merged to `master`, the application is deployed to the `production` environment

[Jenkins](https://jenkins.io/doc/) is used to hanlde support for automatating the implementation and integration of continuous delivery pipelines.

The deployment scripts for the application are hosted [here](https://github.com/andela/travel_tool_deployment_scripts)

## License

This application is licensed under the terms of the [MIT License](https://github.com/andela/travel_tool_back/blob/develop/LICENSE)

## Technical Charts

[Architectural Diagram](https://www.lucidchart.com/invitations/accept/777cc1cd-1e62-4ccc-867c-2d0c6f9e85ec)
