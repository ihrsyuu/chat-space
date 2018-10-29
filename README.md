# README

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text| |
|image|string| |
|group_id|integer|null: false, fareign_key: true|
|user_id|integer|null: false, fareign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
