# development

1. adjust `npm run dev` script to remove cache data depending on your OS
2. run `npm run dev`

# generating schema types

- `npm run generate`

# run prod build

1. set openssl for `npm start` script:

- windows CMD: `set NODE_OPTIONS=--openssl-legacy-provider`
- linux: `export NODE_OPTIONS=--openssl-legacy-provider`

2. run `npm run start`
