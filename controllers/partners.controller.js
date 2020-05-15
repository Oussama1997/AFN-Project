const Partner = require('../models/partners.model');

exports.findAll = (req, res) => {
    Partner.find((err, partners) => {
        if (err) return res.status(500).send(err.message || "Some error occurred while finding list of partners.");
        res.send({partners: partners});
    })
};

exports.add = function (req, res) {
    /*Creation de l'objet Partner*/
    let partner = new Partner({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        tel: req.body.tel,
        fax: req.body.fax
    });

    /*ajout du student*/
    partner.save((saveErr, savedPartner) => {
        if (saveErr) return res.status(500).send(saveErr.message || "Some error occurred while creating the Partner.");
        res.status(201).send({data: savedPartner});
    });
};

exports.details = function (req, res) {
    Partner.findById(req.params._id, function (err, data) {
        if (err) return res.status(500).send('Partner not found');
        return res.status(200).send(data);
    });
};

exports.update = (req, res, next) => {
    Partner.findById(req.params._id, (err,partner) => {
        // This assumes all the fields of the object is present in the body.
        partner.username = req.body.username;
        partner.name = req.body.name;
        partner.email = req.body.email;
        partner.address = req.body.address;
        partner.tel = req.body.tel;
        partner.fax = req.body.fax;

        partner.save((saveErr, updatedPartner) => {
            if (saveErr) return res.status(500).send(saveErr.message || "Some error occurred while updating the Partner.");
            res.send({data: updatedPartner});
        });
    });
};

exports.delete = function (req, res) {
    Partner.findById(req.params.id, (err, partner) => {
        partner.remove((partnerErr, removedPartner) => {
            if (partnerErr) return res.status(500).send(partnerErr.message || "Some error occurred while deleting the partner.");
            res.send("suppression avec succés");
        });
    });
};

