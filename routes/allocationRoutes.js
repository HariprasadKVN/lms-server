const express = require("express");
const {
  getAllocations,
  getAllocation,
  createAllocation,
  updateAllocation,
  deleteAllocation,
} = require("../controllers/allocationController");

const router = express.Router();
const fakeAuth = (p, req, res, next) => {
  const { user } = req.params;
  console.log(user);
  next();
};
const test = (req, res, next) => {
  console.log("test");
  next("call fake");
};

router.use(test);
router.use(fakeAuth);
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
