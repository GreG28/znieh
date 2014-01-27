Znieh Game Server
========================

Development Workflow : https://gist.github.com/spyl94/4abb12ac838d4a686241

Coding Convention : https://gist.github.com/spyl94/3e85ddc37b018d907936


1) Installation
----------------------------------

    git clone git@github.com:spyl94/znieh.git

    php composer.phar install

If you don't have composer yet : http://getcomposer.org/


2) Checking your System Configuration
-------------------------------------

Before starting coding, make sure that your local system is properly
configured for Symfony.

Execute the `check.php` script from the command line:

    php app/check.php

If you get any warnings or recommendations, fix them before moving on.

3) Database
-------------------------------------

Create database :

    php app/console doctrine:database:create

Create schema of database :

    php app/console doctrine:schema:update --force

Load DataFixtures : (validate with Y to continue)

    php app/console doctrine:fixtures:load


4) Dumping assets
-------------------------------------

    php app/console assetic:dump

    php app/console assetic:dump --env=prod --no-debug

You must have both node and less installed :

    npm install -g less

You can configure node_paths in app/config/parameters.yml


 Clearing the cache
-------------------------------------

     php app/console cache:clear

     php app/console cache:clear --env=prod
     
5) Node.js
-------------------------------------

In "node" repository, execute the following command to install node_modules.

    npm install

Then, you have to copy the file called `config.json` to `config.user.json` and edit the values according to your environnement.

You'll probably need to edit the target IP in the `index.html`.
    
Finally, run the server :

    node app.js

For your information, the game server runs on port 1337.

6) Chat server
-------------------------------------

In "chat-server" repository, execute the following command to install node_modules.

    npm install

Then, you have to copy the file called `config.json` to `config.user.json` and edit the values according to your environnement.

You'll probably need to edit the target IP in the `index.html`.

You need to add one table in your database, using the following script : https://gist.github.com/alfoeternia/752b89ab189e6b56e119

Finally, run the server :

    node app.js

For your information, the chat server runs on port 1338.

 Composer
-------------------------------------

Having composer.lock in the repository assures that each developer is using the same versions.
If you update your libs, you need to commit the lockfile too. It basically states that your project is locked to those specific versions of the libs you are using.

In production you should not update your dependencies, you should run composer install which will read from the lock file and not change anything.
