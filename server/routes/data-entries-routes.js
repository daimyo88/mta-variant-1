const express = require("express");
const { check } = require("express-validator");
const checkToken = require("../middleware/check-token");
const checkIsAdmin = require("../middleware/check-admin");
const checkCanManageDataEntry = require("../middleware/check-can-manage-data-entry");
const validateInputs = require("../middleware/validate-inputs");

const controller = require("../controllers/data-entries");

const router = express.Router();

router.get("/", checkToken, controller.getDataEntries);

router.get("/populate-data", checkToken, controller.populateData);

router.get("/export", checkToken, controller.exportData);

router.get(
  "/:did",
  checkToken,
  checkCanManageDataEntry,
  controller.getDataEntry
);

router.post(
  "/",
  checkToken,
  check("freightType").not().isEmpty(),
  check("dateNomination").not().isEmpty(),
  check("ship").not().isEmpty(),
  check("shipLength").not().isEmpty(),
  check("shipCategory").not().isEmpty(),
  validateInputs,
  controller.createDataEntry
);

router.delete("/:did", checkToken, checkIsAdmin, controller.deleteDataEntry);

module.exports = router;
