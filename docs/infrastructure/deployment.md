The deployment of the Taskback server is done using a [bare Git repository](http://stackoverflow.com/a/7861254) together with a [`post-receive` Git hook](http://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks). The following diagram illustrates the deployment process.

![Taskback Deployment](img/taskback-deployment.png)

### Git deployment repository

Besides the GitHub repository hosting all the code and development branches, a "server-side" repository is hosted at the production machine. Whenever a new release is to be rolled out, a simple

```
git push deploy master
```

command will push the `master` branch to the bare `deploy` [remote](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes), triggering a `post-receive` hook, which takes care of actually copying the updated code to the staging directory from which it is served by the Nginx proxy.

#### Bare repository setup

To create the `deploy` remote repository, ssh' into the deployment machine and issue the following commands:

```
mkdir ~/taskback.git && cd ~/taskback.git
git init --bare
```

The `--bare` switch indicates that the repository folder will not contain a working tree (no files, just source control).

After creating the repository, go back to your local development machine and add the new remote (in the local repository folder):

```
git remote add deploy ssh://user@mydomain.com/home/user/taskback.git
```

#### post-receive Git hook

In order to deploy the files from the bare repository, once a new `push` is received, a simple Bash script named `post-receive` has to be placed under the `hooks` directory in the Git repository. (Remember to `chmod +x` the script!)

```bash
#!/bin/bash -l

# NOTE: this git hook is meant to be installed in the deployment remote repository

# checks out the latest changes into the staging directory (PUBLIC_WWW) and builds
#  (npm install) the server. If no instance is already running, it is started with
#  the 'forever' utility. If an instance is running, all forever jobs are restarted

GIT_REPO=$HOME/taskback.git
PUBLIC_WWW=/data/web/taskback

git --work-tree=$PUBLIC_WWW --git-dir=$GIT_REPO checkout -f
pushd $PUBLIC_WWW
npm install
forever_command="restartall"
if forever list | grep -q "No forever processes running"; then
  forever_command="start";
fi
NODE_ENV=production forever $forever_command \
  -a -l $(pwd)/logs/forever.log -o $(pwd)/logs/sys-out.log -e $(pwd)/logs/sys-err.log \
  --uid "taskback-production" \
  --minUptime 5000 --spinSleepTime 2000 \
  server.js
popd
exit
```

### Forever

Noticed the use of `forever` in the previous Git hook script? `forever` is a simple CLI tool for ensuring that a given Node script runs continuously. It can be installed using the NPM:

```
npm install -g forever
```

### Not everything is automated

Please note that not all of the deployment process is automated. If there were changes in the Nginx configuration or in the production environment properties file (a file that is ignored in the source control), these would have to be manually copied and taken care of.

A simple, local, `pre-push` Git hook can remind us of this situation whenever we are pushing to the `deploy` remote:

```bash
#!/bin/bash -l

# NOTE: this git hook is meant to be installed in the local development repository

# checks the remote to which the commit is going to be pushed and
#  warns to check the production properties file if the remote is the
#  deploy repository

red=`tput setaf 1`
reset=`tput sgr0`

if [ "$1" == "deploy" ]; then
  echo ""
  echo "${red}!!!! DEPLOYING SERVER TO PRODUCTION !!!!"
  echo ""
  echo "If there are any changes, remember to:"
  echo "   - Remote copy the production properties file."
  echo "   - Copy nginx config files, update values and restart nginx accordingly."
  echo "${reset}"
  echo ""
fi
```
