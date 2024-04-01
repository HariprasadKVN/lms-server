const add = (array, data) => {
  array.push(data);
  return array;
};

const update = (array, id, data) => {
  let objectToUpdate = array.find((obj) => obj.id === id);

  // If object is found, update its values
  if (objectToUpdate) {
    Object.assign(objectToUpdate, data);
    return array;
  } else {
    console.log("Object not found with ID:", id);
  }
};

const remove = (array, id) => {
  return array.filter((obj) => obj.id !== id);
};

module.exports = { add, update, remove };
