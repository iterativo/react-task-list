This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Task List App

A task-list app example

![App UI](./docs/app-ui.png?raw=true)

## To set up for local development

1. Set up a new Firebase project and get the config.
2. Save the config in `src/config.js` and export it as default.

Template:

```js
// src/config.js
export default {
    apiKey: "<api-key>",
    authDomain: "<auth-domain>",
    databaseURL: "<database-url>",
    projectId: "<project-id>",
    storageBucket: "<storage-bucket>",
    messagingSenderId: "<messaging-sender-id>",
    appId: "<app-id>",
    measurementId: "<measurement-id>"
};
```

## TODO

- [ ] Move firebase configs to env variables
- [ ] Unit test Add/Complete/Delete task
- [ ] Optimize React renders
- [ ] Support for multiple lists
- [ ] Support for multiple users
