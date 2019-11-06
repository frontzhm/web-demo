#!/bin/bash

# cd /Users/zhm/mygit/http-demo/enhanced-table
# yarn build
# git add .;git commit -m"update enhanced-table"
# git pull
# git push
# ssh han "cd ~/web-demo/enhanced-table;git pull"
# echo -e '\033[32m ok♪(^∇^*)请访问  \033[0m'
scp /Users/zhm/mygit/http-demo/enhanced-table/server.js han:~/web-demo/enhanced-table/server.js