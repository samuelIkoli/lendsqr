import swaggerJsdoc from "swagger-jsdoc";

const options = {
    swaggerDefinition: {
        swagger: "2.0",
        info: {
            title: "Lendsqr End Point Documentation",
            version: "1.0.0",
            description: "API for Lendsqr End Point Documentation",
        },
    },
    apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;