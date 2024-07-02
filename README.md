# 初めかた

clone後、node_modulesを追加するために下記のコマンドを順番に実行

docker-compose run -w /app/frontend --rm frontend yarn install

docker-compose run -w /app/backend --rm backend yarn install

実行後、次のコマンドでコンテナを立ち上げる

docker-compose up -d

# gitのコマンド。久保田が知っているやつ。  
## git

どっかークジラさん起動をする。  
docker-compose up -d    

コードを入力する場所が出てくる。
code .     

変更されているか確認できる。  
git status  

*他の人の変更を自分のところに反映する。*  
GitHubの:緑の丸特大:のコードの下のボタン（再読み込みみたいな）を押して、コードを入力。  
git pull origin main    

一覧と現在位置を見る  
git branch  
メインから枝を作る  
git branch origin/main  

新しい枝を作ってそこに移動  
git checkout -b branch名  
既存の枝に移動  
git checkout branch名  

自分の変更を申請する　　
git add .  
git commit -m "test久保田"  
git push origin main  
のボタンをぽちぽちしていく。  


その他  
（fetchとpushする先の確認）git remote -v  

## ドキュメントくん
https://drive.google.com/drive/folders/1-XXOKrDFSoj0wcoVwcMnUN1UZSfzk93X?usp=drive_link
