require("dotenv").config();
const cors = require("cors");
const express = require("express");
const authRouter = require("./router/auth-router");
const contactRouter = require("./router/contact-router");
const servicesRouter = require("./router/service-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "  GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRouter);

app.use("/api/form", contactRouter);

app.use("/api/data", servicesRouter);

app.use(errorMiddleware);

connectDB().then(() => {
  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
  });
});
