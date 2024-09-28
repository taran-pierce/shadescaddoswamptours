# shadescaddoswamptours `1`
Shades Caddo Swamp Tours website built in React using NextJS.

## Setup for development
* `https://github.com/taran-pierce/shadescaddoswamptours.git`
* cd into `/frontend/` and run `npm install`
  - set up your .env
* `npm run dev` - Compiles the site and starts the dev server
* Pages are all located in `/frontend/pages/`
  - needs to be migrated to `/frontend/app/` for latest Nextjs App Router
* Components are located in `/frontend/src/components/`
* Public files are located in `/frontend/public/`
* Utility files in `/frontend/utils/`

## Builds
Azure handles deployment of all code. The urls for each environement can be found in Azure.

### Preview
Creating a pull request to develop will trigger a preview deploy. There is also a consistent "dev" branch based off of develop.

### Build for production
Merging into the master branch kicks will build and deploy the site to production

## Commands
- `npm run dev` - start dev server
- `npm run build` - make production bundle
- `npm run analyzeBundle` - runs bundle analyzer with production settings
