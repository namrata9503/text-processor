# Text-Processor App + Angular

Project link: [Click here](https://text-processor-924fd.web.app/)

This project is demonstrate how can text being processed with use of calculateHighestFrequency(), calculateFrequencyForWord() and calculateMostFrequentNWords() functions.

Outline below mention my development journey including thought process and tech-stack.

  

## Requirement understanding

- Read the requirement, done brainstroming on paper, this helps me to visualize how end product will look like.

- Understand the Acceptance criteria of requirement.

- Noted down the action items and their sequence which need to be cover.

  

## Approach

- As per my prototype (which I draw on paper) I developed the code on local.

- Step by step enhanced the features such as using interfaces which contains 3 functions for text processing, Developed logics and calculations as per given requirements.

- Then started working on UI development.

- Tested all acceptance criteria with different sets of input through unit tests.

- I make sure for standard code quality get followed with best practices.

  

## Get started

  

We need to setup Angular environment by installing required softwares and then need to setup project

### Angular environment setup:

Lets setup the environment from begining..!

  

#### Setup the environment:

  

- Download and Install node (node comes with npm) (website: https://nodejs.org/en)

- After installation check version of node and npm by command: `node -v` or `node --version` OR `npm -v` OR `npm --version`

- Install Angular CLI (website https://cli.angular.io/) by using command: `npm install -g @angular/cli` (it will install Angular CLI globally)

- After installation check version of angular CLI by using the command: `ng -v` OR `ng --version`, you can also verify angular CLI installation by command: `ng` OR `ng --help`

- Create a new app with angular CLI by using syntax: ng new project-name: command: `ng new text-processor`

- Go inside the project/app directory, command: `cd text-processor`

- Build and run Angular App, command: `ng serve` OR `ng serve -o` OR `ng serve --open`

- Go to the browser and launch/check Angular App by entering the web address: `localhost:4200`

  
  

### Project setup:

As environment is set lets setup the project..!

  

#### Clone the repo

```sh

https://github.com/namrata9503/text-processor.git

cd text-processor

```

#### Install npm packages

Install the `npm` packages described in `package.json` and verify it works!

```sh

npm install

```

  

#### Build

To Build project, Build artifacts will be stored in the dist/ directory and sets up build for production.

```sh

npm run build

```

  

To start the app on local server `http://localhost:4200` use `npm start`

```sh

npm start

```

  

##### ESLint: Run

  

```sh

ng lint

```

  

#### Unit Test

To execute unit test:

```sh

ng test

```

  

## Tech

  

-  [Angular] - HTML enhanced for web apps!

-  [TypeScript] - To make JavaScript development more efficient.

- [Tailwind CSS] - CSS framework

-  [HTML] - Form Structure.

-  [Eslint] - To make code more consistent and avoiding bugs

-  [Jasmine] - For unit test

  

## Final UI

  

![UI-Demo](src/assets/text.gif)

  

## Thanks for reading..!