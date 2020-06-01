var bcrypt = require("bcryptjs");
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
    date: new Date(),
    type: "user",
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      callback("server error");
    } else {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          callback("server error");
        } else {
          user.password = hash;
          /*ajout du student*/
          user.save((saveErr, savedUser) => {
            if (saveErr)
              return res.status(500).send({
                error:
                  saveErr.message ||
                  "Some error occurred while creating the User.",
              });
            res.status(201).send({ data: savedUser });
          });
        }
      });
    }
  });
};

exports.details = function (req, res) {
  User.findById(req.params._id, function (err, data) {
    if (err) return res.status(500).send("User not found");
    return res.status(200).send(data);
  });
};

exports.findOne = function (req, res, callback) {
  User.findOne({ username: req.body.username }, (err, user) => {
    // This assumes all the fields of the object is present in the body.
    if (err) {
      console.log(err);
      callback("Server not found");
    } else if (user == undefined) {
      callback("User not found");
    } else {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) {
          callback("server error");
        } else if (isMatch === true) {
          user.password = req.body.password;
          return res.status(200).send(user);
        } else {
          callback("login info incorrect");
        }
      });
    }
  });
};

exports.update = (req, res, next) => {
  User.findById(req.params._id, (err, user) => {
    // This assumes all the fields of the object is present in the body.
    user.username = req.body.username;
    user.email = req.body.email;
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        callback("server error");
      } else {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) {
            callback("server error");
          } else {
            user.password = hash;
            /*update user*/
            user.save((saveErr, updatedUser) => {
              if (saveErr)
                return res.status(500).send({
                  error:
                    saveErr.message ||
                    "Some error occurred while updating the User.",
                });
              //user.password = req.body.password;
              res.send({ data: updatedUser });
            });
          }
        });
      }
    });
  });
};
exports.update1 = (req, res, next) => {
  User.findById(req.params._id, (err, user) => {
    // This assumes all the fields of the object is present in the body.
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.cin = req.body.cin;
    user.dateB = req.body.dateB;
    user.profession = req.body.profession;
    user.adresse = req.body.adresse;
    user.ville = req.body.ville;
    user.tel = req.body.tel;
    user.gender = req.body.gender;
    /*update user*/
    user.save((saveErr, updatedUser) => {
      if (saveErr)
        return res.status(500).send({
          error:
            saveErr.message || "Some error occurred while updating the User.",
        });
      res.send({ data: updatedUser });
    });
  });
};

exports.delete = function (req, res) {
  User.findById(req.params.id, (err, user) => {
    user.deleteOne((userErr, removedUser) => {
      if (userErr)
        return res.status(500).send({
          error:
            userErr.message || "Some error occurred while deleting the User.",
        });
      if (removedUser)
        return res.status(200).send({ success: "successful deletion" });
    });
  });
};
