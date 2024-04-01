const express = require("express");
const {
  getAllocations,
  getAllocation,
  createAllocation,
  updateAllocation,
  deleteAllocation,
} = require("../controllers/allocationController");

const router = express.Router();

router
  .route("/users/:user/work/allocations")
  .get(getAllocations)
  .post(createAllocation);

router
  .route("/users/:user/work/allocations/:id")
  .get(getAllocation)
  .put(updateAllocation)
  .delete(deleteAllocation);

module.exports = router;
