# Atlas Server

Atlas Server は Firebase の各サービスで動作する Atlas のバックエンド実装・設定です。


## Services

* Firebase Database (Cloud Firestore)
* Firebase Functions
* Firebase Hosting
* Firebase Storage


## Deployment

```coffee
# one command, all deploy
$ yarn deploy
# ... or single deploy
$ yarn deploy:firestore
$ yarn deploy:functions
$ yarn deploy:hosting
$ yarn deploy:storage
```