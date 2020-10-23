# ionic5-vue-seed

> Ionic v5 and Vue 3.0 using tabs template plus authentication logic with OAuth2 including login and register page


## How to install the template

### Clone the repository
```
git clone https://github.com/altixco/ionic5-vue-seed.git project_name
cd project_name
```

## Additional features

### Push notifications
This repository currently contains a branch that you can use if push notifications are required in the project.

To add support for push notifications use:
```
git merge origin/push-notifications
```

## Initialize GIT

Remove the old .git directory to initialize a new one
```
rm -r ./.git
```

The command before will remove the `.git` folder so you will have to initialize git:
```
git init
git remote add origin <repository-url>
```

## Build Setup

``` bash
# Uninstall old Ionic
npm uninstall -g ionic

# Install latest Ionic CLI
npm install -g @ionic/cli@latest

# Install dependecies
npm install

# Serve the application
ionic serve

# Build the application (Required before opening app on IDEs)
ionic build

# Open app on Xcode
ionic cap open ios

# Open app on Android Studio
ionic cap open android

# Run unit tests
npm run test:unit

# Run e2e tests
npm run test:e2e
```
