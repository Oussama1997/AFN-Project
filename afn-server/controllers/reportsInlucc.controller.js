const ReportsInlucc = require("../models/reportsInlucc.model");

exports.findAll = (req, res) => {
  ReportsInlucc.find((err, reportsInlucc) => {
    if (err)
      return res.status(500).send({
        error:
          err.message ||
          "Some error occurred while finding list of ReportsInlucc.",
      });
    res.send({ reportsInlucc: reportsInlucc });
  });
};

exports.add = function (req, res) {
  /*Creation de l'objet Partner*/
  console.log(req.body);
  let reportsInlucc = new ReportsInlucc({
    username: req.body.username,
    permission: req.body.permission,
    person: req.body.person,
    structure: req.body.structure,
    sector: req.body.sector,
    subject: req.body.subject,
    type: "",
    date: new Date(),
  });

  /*ajout du student*/
  reportsInlucc.save((saveErr, savedReportsInlucc) => {
    if (saveErr)
      return res
        .status(500)
        .send(
          saveErr.message ||
            "Some error occurred while creating the ReportsInlucc."
        );
    res.status(201).send({ data: savedReportsInlucc });
  });
};

exports.details = function (req, res) {
  ReportsInlucc.findById(req.params._id, function (err, data) {
    if (err) return res.status(500).send("ReportsInlucc not found");
    return res.status(200).send(data);
  });
};

exports.update = (req, res, next) => {
  ReportsInlucc.findById(req.params._id, (err, reportsInlucc) => {
    // This assumes all the fields of the object is present in the body.
    reportsInlucc.username = req.body.username;
    reportsInlucc.permission = req.body.permission;
    reportsInlucc.person = req.body.person;
    reportsInlucc.structure = req.body.structure;
    reportsInlucc.sector = req.body.sector;
    reportsInlucc.subject = req.body.subject;

    reportsInlucc.save((saveErr, updatedReportInlucc) => {
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
  ReportsInlucc.findById(req.params._id, (err, reportsInlucc) => {
    // This assumes all the fields of the object is present in the body.
    reportsInlucc.type = req.body.type;

    reportsInlucc.save((saveErr, updatedReportInlucc) => {
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

exports.delete = function (req, res) {
  ReportsInlucc.findById(req.params.id, (err, reportsInlucc) => {
    reportsInlucc.remove((partnerErr, removedReportsInlucc) => {
      if (partnerErr)
        return res
          .status(500)
          .send(
            partnerErr.message ||
              "Some error occurred while deleting the ReportsInlucc."
          );
      res.send("suppression avec succés");
    });
  });
};
