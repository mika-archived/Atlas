# AWS Structure

## Amazon DynamoDB  について

Atlas では、1つのテーブル `Atlas` に全てのデータを保存しています。  
テーブル構造は、以下の構造の通りです。

| Partition Key | Sort Key | Attributes |
| ------------- | -------- | ---------- |
| id            | varies   | ...        |

Partition Key は、 UserID や StorageID などの一意の ID です。  
Sort Key は、型名もしくは型名にタイムスタンプを付与した文字列を使用します。  
型名は [`../server/shared/records.ts`](../server/shared/records.ts) に定義されている型を使用します。  
Sort Key は以下のような形式になります。

```ts
tUser // User 型の項目
tStorage1537966412095 // 2018/09/26 21:55 頃に作成された Storage 型の項目
```

なお、タイムスタンプを付与した Sort Key を使用した場合、項目を時系列順に並べることが可能ですが、  
検索時など参照を行う時にもタイムスタンプを Query に渡す必要があります。


## S3 の Bucket について

Atlas では、 Bucket `storage.atlas.mochizuki.moe` にファイルを保存しており、  
認証時に付与される IAM ロールによって、アクセス制限を行っています。  
ただし、 `allow` 属性のファイルについては、 API Gateway によって制御されます。

Atlas における Bucket のディレクトリ構造は、下記のようになっています。

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
全てのユーザー (非認証含む) がアクセス可能です。


### `registered` directory

IAM Role にて、 Auth が付与されているユーザーは全員アクセス可能です。


### `allowed` directory

IAM Role にて、 Auth が付与されているユーザーは全員アクセス可能です。  
ただし、画像の配信は API Gateway + Lambda の組み合わせにて行います。  


### `private` directory

IAM Role にて、 Auth が付与されているかつ、作成したユーザーのみがアクセス可能です。