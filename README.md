# OceaniaApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Agnular CLI

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### create fetaure
`ng generate module [module-name] --routing`
like: `ng generate module features/projects --routing`

#### create component
`ng generate component [component-name]`
like: `ng generate component features/projects/project-list`

#### create service
`ng generate service [service-name]`
like: `ng generate service features/projects/projects`






## deploy
build and copy the content (inside `dist`)
```
ng build
scp -r dist/oceania-app platypusweb@paulovelho.com:~/oceania/oceania-app/dist/
```

## docker
```

docker run -d \
    -v /Users/paulohenriquemartins/Paulo/oceania-app/dist/oceania-app:/web \
    -p 8080:8080 \
    halverneus/static-file-server:latest

```



