// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // googleMapsKey: "AIzaSyBnKWK7IYbXZJrMxbC6-vOXWwD_CAZevSg",//oldest
  // googleMapsKey: "AIzaSyCNDgKiscnX-jLxGBWM4jpwfh0LRnoMTgE",//newest
  googleMapsKey: "AIzaSyC_OUwdIuljMfV46nVce2oi0nnj6dEGuk0",//new key
  pubNubKey:{
      publishKey: 'pub-c-8d87da18-49ea-4c17-8c92-fc012ec61ad2',
      subscribeKey: 'sub-c-9a17b996-891c-11e8-b7a4-ce74daf54d52',
      ssl: true,
      secretKey: 'sec-c-NjEzYjcxZWMtNWJkOS00NWVjLThjOTAtM2VmY2YyY2QwOWIx'
  }
};
