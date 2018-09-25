# AWS Structure


## S3

Amazon S3 の Bucket 構造


```
storage.atlas.mochizuki.moe
├── public
│   ├── user1
│   │   └── uuid.png
│   ├── user2
│   ...
├── registered
├── allowed
└── private
```

### `public` directory

S3 バケットポリシーにおいて、全世界に公開されています。


### `registered` directory

IAM Role にて、 Auth が付与されているユーザーはアクセス可能です。


### `allowed` directory

IAM Role にて、 Auth が付与されているユーザーはアクセス可能です。  
API Gateway + Lambda の組み合わせにて、画像の配信を行います。  
場合に応じて、 DynamoDB などでキャッシュを行うことも考えます。


### `private` directory

IAM Role にて、 Auth が付与されているかつ、作成したユーザーのみがアクセス可能です。