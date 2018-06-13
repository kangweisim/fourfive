const db = require("../models");
const jwt = require("jsonwebtoken");

exports.weigh = async function(req, res, next) {
  try {
    let { weight } = req.query;
    let { name } = req.params;
    validate(name, weight);
    let users = await db.User.findOrCreate({
      where: {
        name,
      }
    });
    let user = users[0];
    console.log(user);
    let weigh = await db.Weigh.create({
      weight,
      userId: user.getDataValue("id")
    });
    let token = jwt.sign(
      {
        name,
      },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      name,
      weight,
      token
    });
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    });
  }
};

exports.getWeighs = async function(req, res, next) {
  try {
    let { name } = req.params;
    validateName(name);
    let users = await db.User.findOrCreate({
      where: {
        name,
      }
    });
    let user = users[0];
    let weighs = await db.Weigh.findAll({
      where: {
        userId: user.getDataValue("id")
      }
    });
    let weighDays = [];
    weighs.forEach((weigh) => {
      let dateString = weigh.createdAt.toDateString();
      let day = weighDays.find((day) => dateString === day.date.toDateString());
      if (!day) {
        weighDays.push({
          date: weigh.createdAt,
          weights: [weigh.weight] 
        })
      } else {
        day.weights.push(weigh);
      }
    });
    weighDays.forEach((day) => {
      day.avg = day.weights.reduce((acc, curVal) => acc + curVal.weight) / day.weights.length;
    });
    let token = jwt.sign(
      {
        name,
      },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      name,
      weighDays,
      token
    });
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    });
  }
};

let validate = (name, weight) => {
  validateName(name);
  if (!weight) throw new Error("Weight Required");
  if (weight <= 0 || !weight.isNaN) throw new Error("Invalid weight");
}

let validateName = (name) => {
  if (!name) throw new Error("Name Required");
}
