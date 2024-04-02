const express = require("express");
const {
  getTimesheets,
  getTimesheet,
  createTimesheet,
  updateTimesheet,
  deleteTimesheet,
} = require("../controllers/timesheetController");

const router = express.Router();

router
  .route("/users/:user/timesheets")
  .get(getTimesheets)
  .post(createTimesheet);

router
  .route("/users/:user/work/allocations/:id")
  .get(getTimesheet)
  .put(updateTimesheet)
  .delete(deleteTimesheet);

module.exports = router;
