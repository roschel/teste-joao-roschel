# Stocks shares API :dollar: :arrow_down: :arrow_up:

## :bulb: Technologies:
- Python
- Flask
- React
- Axios

## :gear: INSTALLATION
First, clone this repository to a local folder.

Access the backend directory and run the follow script in your terminal:
```
source run.sh
```
ok, now the **backend** of the application should be running.

To start the **frontend**, access te web directory and run the follow script in terminal:
```
npm install
```

And then:
```
npm start
```

## GET INTO THE APPLICATON
To access the application, open http://localhost:3000 to view it in the browser.
It should look like this:
![image](https://user-images.githubusercontent.com/52433168/75366524-a2a42e80-589d-11ea-8fc2-c08c2883b4ee.png)


Now, click in **Register** to include a new user.
You should see a page like this:
![image](https://user-images.githubusercontent.com/52433168/75367212-bb611400-589e-11ea-9d9f-4b69a268c308.png)

That is it!
After you logged in, you should see the stocks page, where it's monitoring online IBOVESPA stocks
![image](https://user-images.githubusercontent.com/52433168/75367451-1abf2400-589f-11ea-907f-bc94ffdb8f60.png)


To change to another brazilian stock, you just have to include the name of the stock you want followed by ".SA"

![image](https://user-images.githubusercontent.com/52433168/75367626-61ad1980-589f-11ea-8f42-630a180cfa24.png)

All the new users and requests stocks are saved into Postgres:
![image](https://user-images.githubusercontent.com/52433168/75367832-a6d14b80-589f-11ea-8a5f-d32f9e614094.png)

![image](https://user-images.githubusercontent.com/52433168/75368050-ed26aa80-589f-11ea-8867-d3c4e3aac787.png)
