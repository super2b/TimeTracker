# timetracker_backend

time tracker backend api.

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org



### mysql
#### 设置远程ip地址访问：
1. 找到mysql的配置文件，将内容中的 bind-address=127.0.0.1
不同的版本或者系统可能存的位置也不一样：
以ubuntu16.04+mysql 5.7.22 存储的位置在    `/etc/mysql/mysql.conf.d`

2. 创建用户

CREATE USER 'username'@'host' IDENTIFIED BY 'password'
  
> username：你将创建的用户名
>
> host：指定该用户在哪个主机上可以登陆，如果是本地用户可用localhost，如果想让该用户可以从任意远程主机登陆，可以使用通配符%
>
> password：该用户的登陆密码，密码可以为空，如果为空则该用户可以不需要密码登陆服务器

授权
>privileges：用户的操作权限，如SELECT，INSERT，UPDATE等，如果要授予所的权限则使用ALL
>
> databasename：数据库名
>
>tablename：表名，如果要授予该用户对所有数据库和表的相应操作权限则可用*表示，如*.*

3. Ubuntu下完全删除mysql
首先删除mysql-> sudo apt-get remove mysql-*
然后清理残留的数据
dpkg -l |grep ^rc|awk '{print $2}' |sudo xargs dpkg -P

启动mysql服务：
```
sudo service mysql start|stop|restrat|status
```

#### Redis
可以任意ip地址访问redis->修改/etc/redis/redis.conf里面的bind 127.0.0.1这一样注释即可。