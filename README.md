# advanced-auth-pagination

# How to use

## 1. Clone Project into your local machine
```
git clone https://github.com/SerhiiNikif/ctr-dashboard-api.git
```

## 2. Go into project folder

```
cd ctr-dashboard-api
```

## 3. Start project

```
npm install
```

```
npm run dev
```

## 4. Download zip file
Download the zip file to the __src/data__ folder with the following structure:

__events.zip__
```
/__MACOSX
/events
  sessions_2023-12-07_0.csv
  sessions_2023-12-10_7.csv
  sessions_2023-12-11_3.csv
  sessions_2023-12-12_1.csv
```

## 5. Play with APIs now !
> Please make sure mongoDB Server service is installed and running on your localhost:27017.

Now, you are ready to test all APIs.
Just simply open your browser http://localhost:4000/day?date=2023-12-07.

## API Endpoints
List and describe the main API endpoints provided by your project.

| APIs                           | Method |         Desc                                  |
| -------------------------------| :----: | --------------------------------------------- |
| /day?date=                     |  GET   | Retrieves log data for a specific day.        |
| /period?from=&to=              |  GET   | Retrieves log data for a specified period.    |
