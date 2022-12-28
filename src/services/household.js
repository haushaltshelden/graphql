const Household = require('../models/Household');

const getHousholds = async () => {
  return await Household.find();
};

const createHousehold = async (name, user) => {
  try {
    const hh = await Household.create({
      name,
      membercount: 1,
    });

    await user.update({ household: hh._id });

    return {
      success: true,
    };
  } catch (e) {
    console.log(e);

    return {
      success: false,
      msg: e,
      code: 0,
    };
  }
};

const joinHousehold = async (id, user) => {
  const hh = await Household.findById(id);
  if (!hh)
    return { success: false, code: 1, msg: 'Household does not exists!' };

  await Household.updateOne({
    _id: id
  }, {
    $inc: { membercount: 1 }
  })

  await user.updateOne({ household: hh._id });

  return {
    success: true,
  };
};

const getMyHousehold = async (user) => {
  return await Household.findById(user.household);
};

const leaveHousehold = async (user) => {
  await Household.updateOne(
    { _id: user.household },
    {
      $inc: { membercount: -1 },
    },
  );

  await user.updateOne({ $unset: { household: '' } });

  return {
    success: true,
  }
};

module.exports = {
  getHousholds,
  createHousehold,
  joinHousehold,
  getMyHousehold,
  leaveHousehold,
};
