const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const { createFileIfNeed, read, write } = require("../lib/store");
const { add, remove, update } = require("../lib/arrayfunction");

//@desc Get all contacts
//@route GET /api/users/{userid}/work/allocations
//@access public
const getAllocations = asyncHandler(async (req, res) => {
  const { user } = req.params;
  const file = `${user}.json`;

  await createFileIfNeed(file);
  const data = await read(file);
  res.status(200).send(data);
});

//@desc Create new contact
//@route POST /api/users/{userid}/work/allocations
//@access public
const createAllocation = asyncHandler(async (req, res) => {
  const { taskId, description, start, end, status } = req.body;
  if (!taskId) {
    res.status(400);
    throw new Error("Bad request");
  }

  const { user } = req.params;
  const record = {
    id: uuidv4(),
    taskId,
    description,
    start,
    end,
    status,
  };

  const file = `${user}.json`;

  await createFileIfNeed(file);
  const data = await read(file);
  const x = add(data, record);
  await write(file, x);

  res.status(200).send(data.id);
});

//@desc Get contact
//@route GET /api/users/{userid}/work/allocations/{allocationid}
//@access public
const getAllocation = asyncHandler(async (req, res) => {
  const { user, id } = req.params;
  const file = `${user}.json`;

  await createFileIfNeed(file);
  const data = await read(file);

  res.status(200).send(data.filter((item) => item.id === id));
});

//@desc Update contact
//@route PUT /api/users/{userid}/work/allocations/{allocationid}
//@access public
const updateAllocation = asyncHandler(async (req, res) => {
  const { user, id } = req.params;
  const file = `${user}.json`;
  const { taskId, description, start, end, status } = req.body;

  const record = {
    id: id,
    taskId,
    description,
    start,
    end,
    status,
  };

  await createFileIfNeed(file);
  const data = await read(file);
  const x = update(data, id, record);
  await write(file, x);
  res.status(200).send(x.filter((item) => item.id === id));
});

//@desc Delete contact
//@route DELETE /api/users/{userid}/work/allocations/{allocationid}
//@access public
const deleteAllocation = asyncHandler(async (req, res) => {
  const { user, id } = req.params;
  const file = `${user}.json`;

  await createFileIfNeed(file);
  const data = await read(file);
  const x = remove(data, id);
  await write(file, x);
  res.status(200).send(`Deleted ${id}`);
});

module.exports = {
  getAllocation,
  createAllocation,
  getAllocations,
  deleteAllocation,
  updateAllocation,
};
