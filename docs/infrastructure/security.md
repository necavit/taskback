Taskback is secured using a number of standard schemes, which are explained in the subsections below.

### Firewall

The machine hosting the Taskback back end stack uses the [ufw](https://wiki.ubuntu.com/UncomplicatedFirewall) firewall to block all connections to ports/protocol-port that are not explicitly allowed. The only available ports are:

* `80/tcp`: to access the rest of the web services (static pages) provided by the host under normal HTTP.
* `443/tcp`: to access the Taskback server under HTTPS (TLS).

To check the status of the firewall, issue the command:

```
sudo ufw status
```

### HTTPS

All traffic between the clients and the Taskback server is encrypted over the TLS transport, using a self-signed certificate. Clients should be aware of the fact that this certificate will not be recognized by the standard libraries of the underlying systems (particularly in the case of Android).

The generation, installation and use of the SSL certificate was already covered in the [Nginx](#nginx) section.

### API keys and tokens

**Work in progress!**
