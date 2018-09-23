# Endpoints

全ての API は CORS に対応しています。


## `GET /v1/images`

アップロードした画像一覧を取得します。


### Information

| Key            | Value |
| -------------- | ----- |
| Authentication | Yes   |



## `POST /v1/images`

画像をアップロードします。


### Information

| Key            | Value |
| -------------- | ----- |
| Authentication | Yes   |


### Parameters

| Key          | Required | Default   | Value                                          | Example     |
| ------------ | -------- | --------- | ---------------------------------------------- | ----------- |
| `image`      | Yes      | NA        | Image binary data                              | N/A         |
| `attributes` | No       | `[]`      | Comma-separated tags                           | `tag1,tag2` |
| `restrict`   | No       | `private` | `public`, `registered`, `allowed` or `private` | `private`   |
| `allowed`    | No       | `[]`      | Commma-separated UserIDs that allow access     | `mika,aki`  |


### Response

```json
{
  "user": "mikazuki",
  "timestamp": 1537731761000,
  "storageId": "6866ed3b-e92f-4e1b-9378-5d1b17cfe6d5",
  "attributes": [],
  "restrict": "private",
  "allowAccess": [],
}
```



## `GET /v1/images/:id`

指定した画像の詳細情報を取得します。


### Information

| Key            | Value |
| -------------- | ----- |
| Authentication | Yes   |



## `PATCH /v1/images/:id`

指定した画像に対して、タグや公開制限などを更新します。


### Information

| Key            | Value |
| -------------- | ----- |
| Authentication | Yes   |



## `GET /users/verify`

ユーザー認証が成功しているかどうかを検証します。


### Information

| Key            | Value |
| -------------- | ----- |
| Authentication | Yes   |


### Parameters

No parameters.


### Response

```json
{
  "message": "ok"
}
```



## `GET /versions`

Atlas API の現行バージョンを返します。


### Information

| Key            | Value |
| -------------- | ----- |
| Authentication | No    |


### Parameters

No parameters.


### Response

```json
{
  "versions": [
    "v1"
  ]
}
```