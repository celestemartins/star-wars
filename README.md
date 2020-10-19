# Star Wars

_This project was bootstrapped with Create React App and uses Redux to manage application state_

## Install for the first time

- Run `npm i` in the command line.

## Run project locally

- Run `npm start` in the command line.

## About project the structure
The project is divided into state and views in order to be able to modify the app state management easily. 

## Challenge

- Use the Star Wars API to get a list of all the planets in the Star Wars Universe. ✔︎
- Display all of those planets in a list on the front page of your app. ✔︎
- Add a text input at the top of the page that allows a user to search the full list of planets. The filtering should NOT re-call any api calls. ✔︎
    The approach i used to solve it is to search locally all the data we have dated. It means, if you navigate from pages 1 to 4, you filter will search locally with those 4 pages information.
- When a user clicks on a planet, they should navigate to a new page that shows a list of the residents of the planet fetched from the Star Wars API. ✔︎
- When a user clicks on one of the residents, they should navigate to another page that shows the personal details of that resident. ✔︎
- Include a header with breadcrumbs. Something like All Planets / Planet Name / Resident Name. Each breadcrumb section should be clickable to navigate to the appropriate page. ✔︎
- Include a service file that contains all the api urls and gets. Your React components should not contain any url references. ✔︎


## [TRY IT!](https://cm-starwars.netlify.app/)
