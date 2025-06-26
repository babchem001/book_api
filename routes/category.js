const express = require("express");
const router = express.Router();

const prisma = require("../lib/prisma");

// const authProtect = require("../middleware/auth");

router.post("/create", async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await prisma.category.create({
      data: {
        name: name,
      },
    });
    return res.status(201).json({
      message: "Category has been successfully created",
      category,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/allcategories", async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany();
    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

router.get("/singlebook/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      message: "Category has been successfully fetched",
      category: category,
    });
  } catch (error) {
    next(error);
  }
});
// edit category
router.put("/update/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const category = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
        description: description,
      },
    });
    return res.status(200).json({
      message: "Category has been successfully updated",
      category: category,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
