const User = require("../models/users.model");

exports.findAll = (req, res) => {
  User.find((err, users) => {
    if (err)
      return res
        .status(500)
        .send(
          err.message || "Some error occurred while finding list of users."
        );
    res.send({ users: users });
  });
};

exports.add = function (req, res) {
  /*Creation de l'objet User*/
  let user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  /*ajout du student*/
  user.save((saveErr, savedUser) => {
    if (saveErr)
      return res
        .status(500)
        .send(
          saveErr.message || "Some error occurred while creating the User."
        );
    res.status(201).send({ data: savedUser });
  });
};

exports.details = function (req, res) {
  User.findById(req.params._id, function (err, data) {
    if (err) return res.status(500).send("User not found");
    return res.status(200).send(data);
  });
};

exports.findOne = function (req, res) {
  User.findOne(req.params.email, (err, user) => {
    // This assumes all the fields of the object is present in the body.
    user.username = req.body.username;
    user.email = req.body.email;

    if (err) {
      console.log(err);
      callback("server error");
    } else if (user == undefined) {
      callback("user not found");
    } else {
      if ((user.password = req.body.password)) {
        callback("login successfully");
      } else {
        callback("login info incorrect");
      }
    }
  });
};

exports.update = (req, res, next) => {
  User.findById(req.body._id, (err, user) => {
    // This assumes all the fields of the object is present in the body.
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save((saveErr, updatedUser) => {
      if (saveErr)
        return res
          .status(500)
          .send(
            saveErr.message || "Some error occurred while updating the User."
          );
      res.send({ data: updatedUser });
    });
  });
};

exports.delete = function (req, res) {
  User.findById(req.params.id, (err, user) => {
    user.deleteOne((userErr, removedUser) => {
      if (userErr)
        return res
          .status(500)
          .send(
            userErr.message || "Some error occurred while deleting the User."
          );
      res.send("suppression avec succés");
    });
  });
};
