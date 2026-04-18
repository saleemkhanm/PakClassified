const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const DbConnection = require("./Config/db");
const { notFound, errorHandler } = require("./Middlewares/middleware");
const path = require("path");

const CountryRouter = require("./Routers/CountryRouter");
const ProvinceRouter = require("./Routers/ProvinceRouter");
const CityRouter = require("./Routers/CityRouter");
const CityAreaRouter = require("./Routers/CityAreaRouter");
const AdvertismentStatusRouter = require("./Routers/AdvertismentStatusRouter");
const AdvertismentTypeRouter = require("./Routers/AdvertismentTypeRouter");
const RoleRouter = require("./Routers/RoleRouter");
const UserRouter = require("./Routers/UserRouter");
const AdvertismentCategoryRouter = require("./Routers/AdvertismentCategoryRouter");
const AdvertismentSubCatRouter = require("./Routers/AdvertismentSubCatRouter");
const AdvertismentimageRouter = require("./Routers/AdvertismentimageRouter");
const AdvertismentRouter = require("./Routers/AdvertismentRouter");

dotenv.config();

// CREATE APP FIRST
const app = express();

// CONNECT DB
DbConnection();

// MIDDLEWARES
app.use(cors());               
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));
// Root route
app.get("/", (req, res) => {
  res.send("API is Running Successfully!");
});

// Routes
app.use("/api/v1/country", CountryRouter);
app.use("/api/v1/province", ProvinceRouter);
app.use("/api/v1/city", CityRouter);
app.use("/api/v1/cityarea", CityAreaRouter);
app.use("/api/v1/status", AdvertismentStatusRouter);
app.use("/api/v1/type", AdvertismentTypeRouter);
app.use("/api/v1/role", RoleRouter);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/category", AdvertismentCategoryRouter);
app.use("/api/v1/sub", AdvertismentSubCatRouter);
app.use("/api/v1/image", AdvertismentimageRouter);
app.use("/api/v1/advertisment", AdvertismentRouter);

// Error Middlewares
app.use(notFound);
app.use(errorHandler);

// Start Server
const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
  console.log(`Server Running at: http://${host}:${port}`);
});
