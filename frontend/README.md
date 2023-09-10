# Frontend
## 如何新增釣魚網站到 Frontend
- 取得使用者帳號
    - username/email input tag 的 name 要是 "username"。
    - 因為後端抓取 username 來判斷輸入內容。
    - ``<input type="text" name="username">``
- Flag
    - 把包住「送出使用者輸入內容的 button 」的 form，裡面的 action 設為 /fish。
    - 因為後端認的是 action 中的 /fish 。
    - ``<form method="POST" action="/fish">``
- 內網
    - 要把網頁的圖片連結改為直接拿取圖片，並把對外連結刪除。
    - hitcon-fishing-wall 不連外網，因此連出去的圖片、連結會失效。

## 補充資料
- clone 網站
    - 我們使用 https://saveweb2zip.com/en 。

----------------------------------------------------------------------------

## How to add new phishing pages to Frontend?
- Get Users' Accounts
    - The name attribute of username/email input should be "username".
    - Because backend will use the word username to filter input.
    - ``<input type="text" name="username">``
- Flag
    - Set the action attribute in the "sent out user's input" form as /fish.
    - Because backend will use /fish to recognise flag.
    - ``<form method="POST" action="/fish">``
- Intranet
    - Change the links that connect to the Internet to local ones (pictures) or delete them (links).
    - hitcon-fishing-wall is designed as intranet, any external links will fail to connect.

## Additional Information
- Clone Websites
    -  We used https://saveweb2zip.com/en . 
