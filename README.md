# REST API with Node using Typescript

This is a REST API developed using node and express with typescript

![Adsız (900 x 380 px) (1)](https://user-images.githubusercontent.com/96056425/147448581-a2530bd0-087f-465e-a296-eccb154188a8.png)

## Technical Details About the Project

The main focus will be to create a maintainable and highly testable architecture.
<br>
Following are the features of this project:

* **This backend is written in Typescript**: The type safety at build time and having intellisense for it in the IDE like vscode.

* **Dependecy Injection principle is applied**: The injector class injects dependency through the constructor of the class.It achieves that by decoupling the usage of an object from its creation.

* **Open Closed principle is applied**: Our classes ise open for extension, but closed for modification using abstract concrete approach

* **Separation of concern principle is applied**: Each component has been given a particular role. The role of the components is mutually exclusive. This makes the project easy to be unit tested.

* **Feature encapsulation is adopted**: The files or components that are related to a particular feature have been grouped unless those components are required in multiple features.

* **Centralised Error handling is done**: I have created a framework where all the errors are handled centrally. This reduces the ambiguity in the development when the project grows larger.

* **Mysql is used through Sequelize ORM**: Mysql fits very well with sequelize to the node.js application. 

* **Redis is used to provide caching**: Redis works by mapping keys to values with a sort of predefined data model

* **Async execution is adopted**: I have used async/await for the promises and made sure to use the non-blocking version of all the functions with few exceptions.

* **Docker compose has been configured**: I have created the Dockerfile to provide the easy deployability without any setup and configurations.

* **Unit test is favored**: The tests have been written to test the functions and routes without the need of the database server.

* **Logging Mechanism is provided** : The critical errors are logged through winston

## How to build and run this project
#### Install using Docker Compose [**Recommended Method**] 
  * Install Docker and Docker Compose. [Find Instructions Here](https://docs.docker.com/install/).
  * Execute `docker-compose up` in terminal from the repo directory.
  * You will be able to access the api from http://localhost:5000
  * To run the tests execute `npm test`.
#### Install Without Docker [**2nd Method**]
  * Install Mysql on your local.
  * Install Redis on your local.
  * Execute `npm install`
  * Execute `npm start` and You will be able to access the API from http://localhost:5000
  * To run the tests execute `npm test`.

 ## Directory Traversal for toDeepLink API call
 `/src → server.ts → /controller/ServerIndex.ts -> /controller/index.ts -> /controller/LinkConverterController.ts -> /services/Concrete/LinkConverterService.ts -> /helpers/error/errorWrapper -> /middleware/redis/redisMiddleware.ts /converters/todeeplinks/ToDeepLinkBase.ts -> /converters/todeeplinks/ToDeepLinkProduct.ts -> /helpers/utils/LinkBuilderHelper.ts -> data/repository/ConvertedLinkRepo.ts `
 

 ## API Examples
* toDeepLink
    * Method and Headers
    ```
    POST /api/link_to_DeepLink HTTP/1.1
    Host: localhost:5000
    Content-Type: application/json
    ```
    * Request Body
    ```json
    {
        "webUrl":"https://www.trendyol.com/casio/saat-p-1925865?boutiqueId=439892&merchantId=105064"
    }
    ```
    * Response Body: 200
    ```json
    {
      "success": "true",
      "Response": "ty://?Page=Product&ContentId=1925865&CampaignId=439892&MerchantId=105064"
    }
    ```
    * Response Body: 400
    ```json
    {
      "success": "false",
      "message": "errorName"
    }
    ```
* toWebUrl
    * Method and Headers
    ```
    POST /api/deepLink_to_Link HTTP/1.1
    Host: localhost:5000
    Content-Type: application/json
    ```
    * Request Body
    ```json
    {
        "deepLink":"ty://?Page=Product&ContentId=1925865&CampaignId=439892&MerchantId=105064"
    }
    ```
    * Response Body: 200
    ```json
    {
      "success": "true",
      "Response": "https://www.trendyol.com/brand/name-p-1925865?boutiqueId=439892&merchantId=105064"
    }
    ```
    * Response Body: 400
    ```json
    {
      "success": "false",
      "message": "errorName"
    }
    ```

