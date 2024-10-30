// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// dev Url

export const environment = {
  production: false,
  env: 'normal',
  apiUrlUser: 'https://dev-api.pirospace.com/user-module/',
  apiUrlSpace:'https://dev-api.pirospace.com/space-module/',
  apiUrlEvent:'https://dev-api.pirospace.com/event-module/',
};

// staging Url
/*
export const environment = {
  production: false,
  env: 'normal',
  apiUrlUser: 'https://stage-v1-api.pirospace.com/user-module/',
  apiUrlSpace:'https://stage-v1-api.pirospace.com/space-module/',
  apiUrlEvent:'https://stage-v1-api.pirospace.com/event-module/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
