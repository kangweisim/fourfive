const express = require("express");
const router = express.Router();
const { weigh, getWeighs } = require("../handlers/weigh");

router.get("/:name/weigh", weigh);
router.get("/:name/weighs", getWeighs);

module.exports = router;
