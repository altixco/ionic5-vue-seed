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

# Build and synchronize with the native projects (See: https://capacitorjs.com/docs/getting-started/with-ionic#syncing-your-app-with-capacitor)
ionic cap copy

# Open app on Xcode
ionic cap open ios

# Open app on Android Studio
ionic cap open android

# Run unit tests
npm run test:unit

# Run e2e tests
npm run test:e2e
```

## Environment Variables

The project settings are present in environment variables located in the `.env` files of the project root.

There are three modes loaded by `vue-cli-service`:

- `development` used by `ionic serve`
- `production` used by `ionic build`
- `test` used by the test commands

The `.env` files are loaded in the following order with the specific files having higher priorities and overriding the previous ones in case of duplicated vars:

```
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.[mode]         # only loaded in specified mode
.env.[mode].local   # only loaded in specified mode, ignored by git
```

> Important: In case a private variable needs to be configured, place them in the `.local` files, they are configured to be ignored by GIT

For additional information see: https://cli.vuejs.org/guide/mode-and-env.html
