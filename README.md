# Indonesia Public Data API Tools

## Available tools
- Fetch Bridging API BPS from https://sig.bps.go.id/bridging-kode/


### Fetch Bridging API BPS
#### Setup & Usage

``` javascript
    # Setup
        $ npm install

    # Usage
        $ npm start
        /* generated sql will be written in ./output/wilayah.sql */

    # Import data to your local mysql
        $ mysql -h localhost -u db_user -p db_password db_name < output/wilayah.sql
        /* change db_user, db_password, and db_name according to your local mysql database connection */
```

