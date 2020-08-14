const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('*', (req, res) => {
    res.send({
        error: 404,
        message: "Error Page, nothing to show"
    });
});

module.exports = router;