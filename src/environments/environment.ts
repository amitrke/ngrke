// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  serviceURL: 'http://localhost:8080/api/',
  uploadServerURL: 'http://localhost:8080',
  awsServiceURL: 'https://api.aws.roorkee.org/dev/db',
  staticContentURL: 'https://www-static.roorkee.org/dev',
  website: 'rke-dev',
  build: '123'
};
