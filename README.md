# Stickr

[![Build Status](https://travis-ci.org/mauvemonkeys/mauvemonkeys.svg?branch=master)](https://travis-ci.org/mauvemonkeys/mauvemonkeys) [![npm version](https://badge.fury.io/js/npm.svg)](https://badge.fury.io/js/npm) [![Waffle.io - Columns and their card count](https://badge.waffle.io/mauvemonkeys/mauvemonkeys.svg?columns=done)](https://waffle.io/mauvemonkeys/mauvemonkeys)

_For all your throwback tech sticker needs_: Your one stop shop for laptop mounted nostalgia flair!

Stickr is a full-stack ecommerce project developed at Fullstack Academy which utilizes the NERDS stack (Node.js, Express, React, Databases using SQL).

Check out [Stickr](https://mauve-monkeys.herokuapp.com/)!

## Setup

To use the `stickr` project locally, you'll need to make use of npm (Node Package Manager).
If you don't have NPM installed already, you can do so [here](https://www.npmjs.com/get-npm).

## Viewing Locally:

With [npm](https://npmjs.org/) installed, run:

    $ npm start

and browse to http://localhost:8080/

<!-- If you want to run the server and/or webpack separately, you can also `npm run start-server` and `npm run build-client`.

    npm run start-server
    npm run build-client -->

## Team

Coded with &hearts; at Fullstack by:
[Abbey](https://github.com/abbeymondshein), [Henry](https://github.com/LonelyBuddy), [Ines](https://github.com/ineszenk), and [Ross](https://github.com/rsicher1).

<!-- ## Deployment

Ready to go world wide? Here's a guide to deployment! There are two (compatible) ways to deploy:

* automatically, via continuous integration
* manually, from your local machine

Either way, you'll need to set up your deployment server to start: -->

<!-- ### Prep

1.  Set up the [Heroku command line tools](https://devcenter.heroku.com/articles/heroku-cli)
2.  `heroku login`
3.  Add a git remote for heroku:

* **If you're creating a new app...**

  1.  `heroku create` or `heroku create your-app-name` if you have a name in mind.
  2.  `heroku addons:create heroku-postgresql:hobby-dev` to add ("provision") a postgres database to your heroku dyno

* **If you already have a Heroku app...**

  1.  `heroku git:remote your-app-name` You'll need to be a collaborator on the app.

### When you're ready to deploy

#### Option A: Automatic Deployment via Continuous Integration

(_**NOTE**: This step assumes that you already have Travis-CI testing your code._)

CI is not about testing per se – it's about _continuously integrating_ your changes into the live application, instead of periodically _releasing_ new versions. CI tools can not only test your code, but then automatically deploy your app. Boilermaker comes with a `.travis.yml` configuration almost ready for deployment; follow these steps to complete the job.

1.  Run `git checkout master && git pull && git checkout -b f/travis-deploy` (or use some other new branch name).
2.  Un-comment the bottom part of `.travis.yml` (the `before_deploy` and `deploy` sections)
3.  Add your Heroku app name to `deploy.app`, where it says "YOUR HEROKU APP NAME HERE". For example, if your domain is `cool-salty-conifer.herokuapp.com`, your app name is `cool-salty-conifer`.
4.  Install the Travis CLI tools by following [the instructions here](https://github.com/travis-ci/travis.rb#installation).
5.  Run `travis encrypt $(heroku auth:token) --org` to encrypt your Heroku API key. _**Warning:** do not run the `--add` command suggested by Travis, that will rewrite part of our existing config!_
6.  Copy-paste your encrypted API key into the `.travis.yml` file under `deploy.api_key.secure`, where it says "YOUR ENCRYPTED API KEY HERE".
7.  `git add -A && git commit -m 'travis: activate deployment' && git push -u origin f/travis-deploy`
8.  Make a PR for the new branch, get it approved, and merge it into master.

That's it! From now on, whenever `master` is updated on GitHub, Travis will automatically push the app to Heroku for you.

#### Option B: Manual Deployment from your Local Machine

Some developers may prefer to control deployment rather than rely on automation. Your local copy of the application can be pushed up to Heroku at will, using Boilermaker's handy deployment script:

1.  Make sure that all your work is fully committed and pushed to your master branch on Github.
2.  If you currently have an existing branch called "deploy", delete it now (`git branch -d deploy`). We're going to use a dummy branch with the name "deploy" (see below), so if you have one lying around, the script below will error
3.  `npm run deploy` - this will cause the following commands to happen in order:

* `git checkout -b deploy`: checks out a new branch called "deploy". Note that the name "deploy" here isn't magical, but it needs to match the name of the branch we specify when we push to our heroku remote.
* `webpack -p`: webpack will run in "production mode"
* `git add -f public/bundle.js public/bundle.js.map`: "force" add the otherwise gitignored build files
* `git commit --allow-empty -m 'Deploying'`: create a commit, even if nothing changed
* `git push --force heroku deploy:master`: push your local "deploy" branch to the "master" branch on heroku
* `git checkout master`: return to your master branch
* `git branch -D deploy`: remove the deploy branch

Now, you should be deployed!

Why do all of these steps? The big reason is because we don't want our production server to be cluttered up with dev dependencies like webpack, but at the same time we don't want our development git-tracking to be cluttered with production build files like bundle.js! By doing these steps, we make sure our development and production environments both stay nice and clean! -->
