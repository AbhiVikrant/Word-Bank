// Import Express JS.
const express = require("express");
// Import Express Routes
const words = express.Router();

const Words = {
  hello: {
    Word: "Hello",
    Meaning: "Used as a greeting or to begin a telephone conversation.",
    Sentence: "Hello there, LetsGrad!",
    User: "Praveen"
  },
  world: {
    Word: "World",
    Meaning: "The earth, together with all of its countries and peoples.",
    Sentence: "He was doing his bit to save the world",
    User: "Praveen"
  }
};

// Adding Routes.
words.get("/", (req, res) => {
  res.json({
    Error: false,
    Message: Words
  });
});
words.get("/:wordId", (req, res) => {
  if (Words[req.params.wordId]) {
    res.json({
      ...Words[req.params.wordId],
      slug: req.params.wordId,
      qs: req.query,
      Error: false
    });
  } else {
    res.status(404).json({
      slug: req.params.wordId,
      qs: req.query,
      Error: true,
      ErrorMessage: "Word Not Found!"
    });
  }
});
words.post("/", (req, res) => {
  if (!req.session.User) {
    res.status(403).json({
      Error: true,
      ErrorMessage: "Not authorised."
    });
  } else {
    const { slug, Word, Meaning, Sentence } = req.body;
    if (slug && Word && Meaning && Sentence) {
      if (!Words[slug]) {
        Words[slug] = {
          Word,
          Meaning,
          Sentence,
          User: req.session.User.username
        };
        res.status(201).json({
          Error: false,
          Message: "Created new word " + slug + "."
        });
      } else {
        res.status(409).json({
          Error: true,
          ErrorMessage: "Word already exists."
        });
      }
    } else {
      res.status(400).json({
        Error: true,
        ErrorMessage: "You should give all the values of slug, Word, Meaning, Sentence!"
      });
    }
  }
});

module.exports = words;
