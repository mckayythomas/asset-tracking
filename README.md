# Asset-Tracking API

> **Note:**
> This version of the API is developed with TypeScript, Node, MongoDB, and GraphQL.

Asset tracking is a GraphQL project that demonstrates the skills and abilities of the developers involved. Asset tracking was created as a potential solution to help enterprises track products and material stock. 
Asset tracking was built with data consistency in mind. GraphQL resolvers are used with Typescript to ensure data is correctly input into a MongoDB NoSQL database. Mongo permits horizontal scalability, and repeated data changes across the database allow Asset Tracking API to handle many transactions. 
OAuth2 through Google was utilized using the passport library to ensure a level of security.
Unit Testing was performed using Jest to ensure all routes and GraphQL is functioning properly.

## Starting Asset Tracking
Asset Tracking can be built and started by following the below steps:

### 1. Build project:
```
npm run build
```

### 2. Run Dev environment:
```
npm run start-dev
```

### 3. Run production build: 
**Run after build required**
```
npm run start
```
