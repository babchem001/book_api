const express = require("express");
const router = express.Router();

// import prisma

const prisma = require("../lib/prisma");

// import Joi
const userSchema = require("../prisma/joyschema/prismajoy");

// Bring in argon2 for password verification
const argon2 = require("argon2");

// import jwt
const jwt = require("jsonwebtoken");

// import config
const config = require("config");

router.post("/login", async (req, res, next) => {
  try {
    // user validation of inputs using Joi
    const valResult = userSchema.loginVal.validate(req.body, {
      abortEarly: false,
    });

    // check if there is an error
    if (valResult.error) {
      return res.status(400).send(valResult.error.details);
    }
    const { email, password } = req.body;

    // To check if the user exists before he can login
    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
        // password: password,
      },
    });

    // check if the user exists
    if (!userExists) {
      return res.status(401).json({
        message: "Auth error/ This email does not exist on our server",
      });
    }

    // compare if the hashed password is correct with new input hashed password
    const valPwd = await argon2.verify(userExists.password, password);

    if (!valPwd) {
      return res.status(401).json({
        message: "Auth error/ Password is incorrect",
      });
    }

    // create a token

    const payLoad = {
      sub: userExists.id,
      email: userExists.email,
      isAdmin: userExists.isAdmin,
    };

    const jwtOptions = {
      expiresIn: "1d",
    };
    const token = jwt.sign(payLoad, config.get("jwtSecret"), jwtOptions);
    return res.status(200).json({
      access_token: token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
