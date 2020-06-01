const ReportsAnsi = require("../models/reportsAnsi.model");

exports.findAll = (req, res) => {
  ReportsAnsi.find((err, reportsAnsi) => {
    if (err)
      return res
        .status(500)
        .send(
          err.message ||
            "Some error occurred while finding list of ReportsAnsi."
        );
    res.send({ reportsAnsi: reportsAnsi });
  });
};

exports.add = function (req, res) {
  /*Creation de l'objet Partner*/
  let reportsAnsi = new ReportsAnsi({
    username: req.body.username,
    permission: req.body.permission,
    person: req.body.person,
    structure: req.body.structure,
    sector: req.body.sector,
    subject: req.body.sector,
    type: "",
    date: new Date(),
  });

  /*ajout du student*/
  reportsAnsi.save((saveErr, savedReportsAnsi) => {
    if (saveErr)
      return res
        .status(500)
        .send(
          saveErr.message ||
            "Some error occurred while creating the ReportsAnsi."
        );
    res.status(201).send({ data: savedReportsAnsi });
  });
};

exports.details = function (req, res) {
  ReportsAnsi.findById(req.params._id, function (err, data) {
    if (err) return res.status(500).send("ReportsAnsi not found");
    return res.status(200).send(data);
  });
};

exports.update = (req, res, next) => {
  ReportsAnsi.findById(req.params._id, (err, reportsAnsi) => {
    // This assumes all the fields of the object is present in the body.
    reportsAnsi.username = req.body.username;
    reportsAnsi.permission = req.body.permission;
    reportsAnsi.person = req.body.person;
    reportsAnsi.structure = req.body.structure;
    reportsAnsi.sector = req.body.sector;
    reportsAnsi.subject = req.body.subject;

    reportsAnsi.save((saveErr, updatedReportInlucc) => {
      if (saveErr)
        return res
          .status(500)
          .send(
            saveErr.message ||
              "Some error occurred while updating the ReportInlucc."
          );
      res.send({ data: updatedReportInlucc });
    });
  });
};

exports.update1 = (req, res, next) => {
  ReportsAnsi.findById(req.params._id, (err, reportsAnsi) => {
    // This assumes all the fields of the object is present in the body.
    reportsAnsi.type = req.body.type;

    reportsAnsi.save((saveErr, updatedReportsAnsi) => {
      if (saveErr)
        return res
          .status(500)
          .send(
            saveErr.message ||
              "Some error occurred while updating the ReportsAnsi."
          );
      res.send({ data: updatedReportsAnsi });
    });
  });
};

exports.delete = function (req, res) {
  ReportsAnsi.findById(req.params.id, (err, reportsAnsi) => {
    reportsAnsi.remove((partnerErr, removedReportsAnsi) => {
      if (partnerErr)
        return res
          .status(500)
          .send({error:
            partnerErr.message ||
              "Some error occurred while deleting the ReportsAnsi."}
          );
      res.send({success:"suppression avec succés"});
    });
  });
};
