**Work in progress!**

The database that `taskback` is using is [MongoDB](https://www.mongodb.org/). The choice was motivated by the ease of integration between Node and the database, given that the maturity of the connector (the [mongoose](http://mongoosejs.com) library) is high and the language (Javascript) is the same in both platforms.

### Deployment and security

During the initial development phase of Taskback, the MongoDB database used is hosted by [MLab](https://mlab.com), using a free and small-scale [sandbox deployment](https://mlab.com/plans/pricing). Check the following section to learn how the Taskback server connects to the database.

**WARNING!!**

Before deploying a production version of the Taskback server (`alpha` or `beta` versions), remember to revert the connection of the database to a local one, to avoid non-encrypted communication between the Taskback back-end and the MLab hosted database. As explained in their [documentation site](http://docs.mlab.com/ssl-db-connections), MLab do not offer SSL/TLS protected connections to either the *sandbox* or the *shared* plans, at the time of this writing (15th March, 2016).

#### Localhost deployment

To ease the development of Taskback in the local environment, an instance of MongoDB is set up in the development machine, as done by following the next instructions, grabbed from the original [tutorial](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu).

To install MongoDB, in Ubuntu, just issue the commands:

```bash
# Import the public key used by the package management system.
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927

# Create a list file for MongoDB.
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list

# Reload local package database.
sudo apt-get update

# Install the MongoDB packages.
sudo apt-get install -y mongodb-org
```

The default `/etc/mongod.conf` configuration file supplied by the packages have the `bind_ip` property set to `127.0.0.1` by default, so no further configuration is needed to keep the database local.

To `start`, `stop`, `restart` the `mongod` service deamon, issue the usual service commands:

```bash
sudo service mongod start
```

### Connection credentials

The production pre-`alpha` deployment uses an MLab hosted MongoDB database, which requires a user-password secured connection. The details of the connection (the URI, `username` and `password`) are stored in a properties configuration file that is **NOT** checked in to the code repository. This file is, however, required by the `config` module of the Taskback server, which will emit an error if it does not find it.

To connect to the local database instance in the development environment, the values used in the `config/env/development.js` file are used.
