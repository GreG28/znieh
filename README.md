Znieh Game Server
========================

Development Workflow : https://gist.github.com/spyl94/4abb12ac838d4a686241

Coding Convention : https://gist.github.com/spyl94/3e85ddc37b018d907936


1) Installation
----------------------------------

    git clone git@github.com:spyl94/znieh.git

    php composer.phar install --dev

If you don't have composer yet : http://getcomposer.org/


2) Checking your System Configuration
-------------------------------------

Before starting coding, make sure that your local system is properly
configured for Symfony.

Execute the `check.php` script from the command line:

    php app/check.php

If you get any warnings or recommendations, fix them before moving on.

Make sure you have node and npm installed and setup. If you do, the following 2 commands should work.

    node -v
    npm -v

If these don't work, install them!

3) Database
-------------------------------------

Create database :

    php app/console doctrine:database:create

Create schema of database :

    php app/console doctrine:schema:update --force

Load DataFixtures : (validate with Y to continue)

    php app/console doctrine:fixtures:load


4) Assets files
-------------------------------------

    php app/console assets:install

You must have both node and less installed :

    npm install -g less

Use npm to install bower, compass and grunt-cli :

    npm install -g bower
    npm install -g compass
    npm install -g grunt-cli

Download the package dependencies :

    npm install

Download the bower dependencies :

    bower install

This should give you a populated web/assets/vendor directory.

Use grunt to initially compile the SASS files

    grunt

If you don't have SASS yet, install Ruby then

    gem install sass
    gem install compass

Later, when you're actually developing, you will use grunt to watch for file changes and automatically re-compile:

    grunt watch

 5) Translation
 ------------------------------------

    php app/console translation:extract fr --config=app

Run again for each locales (replace "fr" by the new local).

6) Gameserver - app.js
-------------------------------------

In "node" repository, execute the following command to install node_modules.

    npm install

Then, you have to copy the file called `config.json` to `config.user.json` and edit the values according to your environnement.

Finally, run the server :

    node app.js

For your information, the game server runs on port 1337, and the test webpage on port 8080.

Some bonus informations :

 Clearing the cache
-------------------------------------

     php app/console cache:clear

     php app/console cache:clear --env=prod

 Composer
-------------------------------------

Having composer.lock in the repository assures that each developer is using the same versions.
If you update your libs, you need to commit the lockfile too. It basically states that your project is locked to those specific versions of the libs you are using.

In production you should not update your dependencies, you should run composer install which will read from the lock file and not change anything.
