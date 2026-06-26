const User = require("../models/User");

const getNextUser = async (flatId) => {

  console.log("Inside getNextUser");

  const users = await User.find({
    flatId: flatId,
    status: "ACTIVE"
  });

  console.log("Users Found:", users);

  if (users.length === 0) {

    throw new Error("No active users found");

  }

const nextUser = users.sort(
  (a, b) => {
    return new Date(a.lastAssignedAt || 0) -
           new Date(b.lastAssignedAt || 0);
  }
)[0];

nextUser.lastAssignedAt = new Date();
await nextUser.save();

  return nextUser;

};

module.exports = { getNextUser };