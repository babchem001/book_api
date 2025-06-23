const express = require("express");
const router = express.Router();

const prisma = require("../lib/prisma");

const authProtect = require("../middleware/auth");

router.post("/createbook", authProtect, async (req, res, next) => {
  try {
    const { title, author, description, genre, price, categoryId } = req.body;

    const { sub, isAdmin } = req.user;
    const book = await prisma.book.create({
      data: {
        title: title,
        author: author,
        description: description,
        genre: genre,
        price: price,
        category: {
          connect: {
            id: Number(categoryId),
          },
        },
        user: {
          connect: {
            id: Number(sub),
          },
        },
      },
    });

    if (book) {
      res.status(201).json({
        message: "Book has been successfully created",
        book,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/update",authProtect, async (req, res) => {
  try {
    const { title, author, description, genre, price, categoryId, bookId } =
      req.body;
    const { sub, isAdmin } = req.user;

    const book = await prisma.book.update({
      where: {
        id: Number(bookId),
        userId: Number(sub),
      },
      data: {
        title,
        description,
        genre,
        author,
        price: Number(price),
      },
    });
    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }
    return res.status(203).json({
      message: "Book has been successfully updated",
      data: book,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/allbooks", authProtect, async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      where: {
        userId: Number(req.user.sub),
      },
    });
    return res.status(200).json(books);
  } catch (error) {
    next(error);
  }
});

router.get("/singlebook/:id", authProtect, async (req, res) => {
  try {
    const { id } = req.params;
    const { sub, isAdmin } = req.user;

    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }
    const book = await prisma.book.findUnique({
      where: {
        id: Number(id),
        userId: Number(sub),
      },
      select: {
        // id: true,
        title: true,
        author: true,
        description: true,
        genre: true,
        price: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    return res.status(200).json({
      book
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete/:id", authProtect, async (req, res) => {
  try {
    const { id } = req.params;
    const { sub, isAdmin } = req.user;

    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }
    const book = await prisma.book.delete({
      where: {
        id: Number(id),
        userId: Number(sub),
      },
    });

    return res.status(200).json({
      message: `Book title - ${book.title} has been successfully deleted`,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
