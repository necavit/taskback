[Nginx](http://nginx.org/) is one of the [most popular web servers](https://en.wikipedia.org/wiki/Web_server#Market_share) in the world and is responsible for hosting some of the largest and highest-traffic sites on the internet. It is more resource-friendly than Apache in most cases and can be used as a web server or a **reverse proxy**. An important concept to be noted about Nginx is that it works on a configuration file basis.

### Installation

```
sudo apt-get update
sudo apt-get install nginx
```

### Nginx process management

A series of commands are used to interact with the Nginx process, which runs as an init.d service.

```
sudo service nginx start
sudo service nginx reload   #reload config
sudo service nginx restart  #restart *completely*
sudo service nginx status   #tell if it's running
sudo service nginx stop
```

This commands can be useful when loading a new configuration after a new service is setup or the parameters for one of them change.

### Configuration

The configuration files of Nginx are located at `/etc/nginx`. There are three important items under this directory:

* `nginx.conf` is the main Nginx configuration file, holding shared (between the proxied servers) feature settings such as logging, gzip-ing of responses, etc.
* `sites-available/` contains the config files for all the services we want to define.
* `sites-enabled/` contains symlinks (`ln -s TARGET LINK_NAME`) for the service definitions in `sites-available` that we actually want to expose (proxy) through Nginx.

Therefore, if we want to setup a new service, we will write its definition file in `sites-available` and then create a symlink pointing to it in `sites-enabled`. Later on, we will `reload` (or `restart`) the `nginx` service to make it aware of the changes.

#### HTTPS configuration

All Taskback traffic is protected by encrypting the traffic from the front-end clients (the Angular and Android apps) to Nginx using HTTPS (the traffic between Nginx and Node os not protected, easing the development of the Node.js server). To do so, we need a certificate and a proper configuration of the reverse proxy.

> **NOTE:** HTTPS secured traffic is not the only security feature of Taskback. Check the [Security section](#security) below for the rest of the implemented mechanisms.

> **NOTE:** The following procedure is explained in more detail in a [DigitalOcean tutorial](https://www.digitalocean.com/community/tutorials/how-to-create-an-ssl-certificate-on-nginx-for-ubuntu-14-04).

To generate a [self-signed certificate](https://en.wikipedia.org/wiki/Self-signed_certificate) with an expiration date of 1 year in advance, we will execute:

```
sudo mkdir /etc/nginx/ssl
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/taskback.key -out /etc/nginx/ssl/taskback.crt
```

The rest of the configuration is provided in the specific config files (see below).

#### Config files

The configuration needed to run Taskback consists of its own `server` block definitions in the `/etc/nginx/sites-available/taskback.conf` file and some modifications to the global `nginx.conf` file.

The following `server` block is used to avoid unsecured HTTP traffic, by redirecting it to HTTPS:

```
server {
  listen 80;                                   # listen to HTTP,
  server_name taskback.example.com;            # in this domain
  return 301 https://$server_name$request_uri; # and redirect *permanently* (301)
}
```

The actual proxy redirection to the Node.js back end is performed by the next `server` block:

```
server {
  listen 443 ssl;                             # listen to HTTPS,
  server_name         taskback.example.com;   # in this domain

  ssl_certificate     /etc/nginx/ssl/taskback.crt;
  ssl_certificate_key /etc/nginx/ssl/taskback.key;
  ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;  # do not allow for SSL! It is not secure!
  add_header Strict-Transport-Security "max-age=31536000" always;

  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_pass http://localhost:PORT;        # where PORT is the actual Node.js TCP port
  }
}
```
