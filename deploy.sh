#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
<<<<<<< HEAD
npm run build
=======
npm run docs:build
>>>>>>> 618e50edb5dcf6ad5d676adfc5b9ca653322abf2

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io  USERNAME=你的用户名 
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>  REPO=github上的项目
<<<<<<< HEAD
git push -f git@github.com:MY729/blog.git master:gh-pages
=======
git push -f git@github.com:MY729/BLOG.git master:gh-pages
>>>>>>> 618e50edb5dcf6ad5d676adfc5b9ca653322abf2

cd -
