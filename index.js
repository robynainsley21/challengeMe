import express from "express";
import path from "path";
import { connection as db } from "./config/index.js";

const app = express();
const port = +process.env.PORT || 3000;
const router = express.Router();

/**
 * Middleware
 */
app.use(
  express.json(),
  express.urlencoded({ extended: true }),
  express.static("./static"),
  router
);

/**
 * A fetch request for the index page and everything displayed on it
 */
router.get("^/$|/challenge", (req, res) => {
  res.status(200).sendFile(path.resolve("./static/html/index.html"));
});

/**
 * Fetching all users using GET
 */
router.get("/users", (req, res) => {
  try {
    const strQry = `
            SELECT userID, userName, userSurname, userAge, userEmail, userPwd
            FROM Users;
        `;
    db.query(strQry, (err, result) => {
      if (err) throw new Error(`Unable to fetch all users: ${err}`);
      res.json({
        status: res.statusCode,
        result,
      });
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
});

/**
 * Fetching a single user using GET based on the primary key
 */
router.get("/users/:userID", (req, res) => {
  try {
    const strQry = `
            SELECT userID, userName, userSurname, userAge, userEmail, userPwd
            FROM Users
            WHERE userID = ${req.params.userID};
        `;
    db.query(strQry, (err, result) => {
      if (err) throw new Error(`Unable to fetch user: ${err}`);
      res.json({
        status: res.statusCode,
        result,
      });
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
});

/**
 * Using POST to add a new user to the database
 */
router.post("/users", (req, res) => {
  console.log("Request body:", req.body);

  try {
    const { userID, userName, userSurname, userAge, userEmail, userPwd } =
      req.body;
    const strQry = `
            INSERT INTO Users
            (userID, userName, userSurname, userAge, userEmail, userPwd)
            VALUES
            (?, ?, ?, ?, ?, ?);
        `;

    db.query(
      strQry,
      [userID, userName, userSurname, userAge, userEmail, userPwd],
      (err, result) => {
        if (err) throw new Error(`Unable to add user: ${err}`);
        res.json({
          status: res.statusCode,
          result,
        });
      }
    );
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
});

/**
 * Using PATCH to update an existing user
 */
router.patch("/users/:userID", (req, res) => {
  try {
    const { userID, userName, userSurname, userAge, userEmail, userPwd } =
      req.body;
    const strQry = `
            UPDATE Users
            SET userName = ?, userSurname = ?, userAge = ?, userEmail = ?, userPwd = ?
            WHERE userID = ${req.params.userID};
        `;
    db.query(
      strQry,
      [userID, userName, userSurname, userAge, userEmail, userPwd],
      (err, result) => {
        if (err) throw new Error(`Unable to update user: ${err}`);
        res.json({
          status: res.statusCode,
          result,
        });
      }
    );
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
});

/**
 * Using DELETE to delete an existing user
 */
router.delete("/users/:userID", (req, res) => {
  try {
    const strQry = `
    DELETE FROM Users
    WHERE userID = ?;
    `;
    db.query(strQry, [req.params.userID], (err, result) => {
      if (err) throw new Error(`Unable to delete user: ${err}`);
      res.json({
        status: res.statusCode,
        result,
      });
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
});

/**
 * Using GET to fetch all products
 */
router.get("/products", (req, res) => {
  try {
    const strQry = `
    SELECT * FROM Products;
    `;
    db.query(strQry, (err, result) => {
      if (err) throw new Error(`Unable to fetch products: ${err}`);
      res.json({
        status: res.statusCode,
        result,
      });
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
});

/**
 * Using GET to fetch a single product
 */
router.get("/products/:prodID", (req, res) => {
  try {
    const strQry = `
        SELECT * FROM Products
        WHERE prodID = ?;
        `;
    db.query(strQry, [req.params.prodID], (err, result) => {
      if (err) throw new Error(`Unable to fetch product: ${err}`);
      res.json({
        status: res.statusCode,
        result,
      });
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
});

/**
 * Using POST to add a new product to the database
 */
router.post("/products", (req, res) => {
  console.log("Request body:", req.body);
  try {
    const { prodID, prodName, prodQuantity, prodPrice, prodURL, userID } =
      req.body;
    const strQry = `
        INSERT INTO Products
        (prodID, prodName, prodQuantity, prodPrice, prodURL, userID)
        VALUES(?, ?, ?, ?, ?, ?);
        `;

    db.query(
      strQry,
      [prodID, prodName, prodQuantity, prodPrice, prodURL, userID],
      (err, result) => {
        if (err) throw new Error(`Unable to add product: ${err}`);
        res.json({ status: res.statusCode, result });
      }
    );
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
});

/**
 * Using PATCH to update an existing product
 */
router.patch("/products/:prodID", (req, res) => {
  try {
    const { prodID, prodName, prodQuantity, prodPrice, prodURL, userID } =
      req.body;
    const strQry = `
        UPDATE Products
        SET prodName = ?, prodName = ?, prodQuantity = ?, prodPrice = ?, prodURL = ?, userID = ?
        WHERE userID = ${req.params.prodID};
        `;

    db.query(
      strQry,
      [prodID, prodName, prodQuantity, prodPrice, prodURL, userID],
      (err, result) => {
        if (err) throw new Error(`Unable to update product: ${err}`);
        res.json({
          status: res.statusCode,
          result,
        });
      }
    );
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
});

/**
 * Using DELETE to delete an existing product
 */
router.delete("/products/:prodID", (req, res) => {
  try {
    const strQry = `
    DELETE FROM Products
    WHERE userID = ?;
    `;

    db.query(strQry, [req.params.prodID], (err, result) => {
      if (err) throw new Error(`Could not delete specified products: ${err}`);
      res.json({
        status: res.statusCode,
        result,
      });
    });
  } catch (error) {
    res.json({
      status: 404,
      message: error.message,
    });
  }
});

router.get("*", (req, res) => {
  res.json({
    status: 404,
    message: "Resource not found",
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
