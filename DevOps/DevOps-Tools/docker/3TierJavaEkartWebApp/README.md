# Spring Boot Shopping Cart Web App
# EkartWebApp-Java-3Tier

## About

This is a demo project for practicing Spring + Thymeleaf. The idea was to build some basic shopping cart web app.

It was made using **Spring Boot**, **Spring Security**, **Thymeleaf**, **Spring Data JPA**, **Spring Data REST**. 
Database is in memory **H2**.

There is a login and registration functionality included.

Users can shop for products. Each user has his own shopping cart (session functionality).
Checkout is transactional.

## Configuration

### Configuration Files

Folder **src/resources/** contains config files for **shopping-cart** Spring Boot application.

* **src/resources/application.properties** - main configuration file. Here it is possible to change admin username/password,
as well as change the port number.

## How to run

Go to the root folder of the application and type:

```bash
sudo apt-get install openjdk-8-jdk
mvn package -DskipTests=true
```

Once the app starts, go to the web browser and visit `http://localhost:3395/home`

Admin username: **admin**

Admin password: **admin**

User username: **user**

User password: **password**


## Helper Tools

### HAL REST Browser

Go to the web browser and visit `http://localhost:3395/`

You will need to be authenticated to be able to see this page.

### H2 Database web interface

Go to the web browser and visit `http://localhost:3395/h2-console`

In field **JDBC URL** put 
```
jdbc:h2:mem:shopping_cart_db
```
## Project Structure

Please refer to `consoleOutput.txt` for more details. 😊
