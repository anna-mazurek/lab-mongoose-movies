var express = require("express");
var celebritiesRouter = express.Router();
const Celebrity = require("./../models/celebrity");

celebritiesRouter.get("/", (req, res, next) => {
  Celebrity.find()
    .then((allCelebrities) => {
      const data = {
        allCelebrities: allCelebrities,
      };

      res.render("celebrities/index", data);
    })
    .catch((err) => console.log(err));
});

celebritiesRouter.get("/new", (req, res, next) => {
  res.render("celebrities/new");
});

celebritiesRouter.get("/:celebrityId", (req, res, next) => {
  const celebrityId = req.params.celebrityId;
  Celebrity.findById(celebrityId)
    .then((oneCelebrity) => {
      const data = {
        oneCelebrity: oneCelebrity,
      };

      res.render("celebrities/show", data);
    })
    .catch((err) => console.log(err));
});

celebritiesRouter.get("/:celebrityId/edit", (req, res, next) => {
  const { id } = req.params;
  Celebrity.findById(id)
    .then((oneCelebrity) => {
      const data = {
        oneCelebrity: oneCelebrity,
      };
      res.render("celebrities/edit", data);
    })
    .catch((err) => console.log(err));
});
celebritiesRouter.post("/:celebrityId", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const { id } = req.params;
  Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase })
    .then((updatedCelebrity) => {
      res.redirect("/");
    })
    .catch((err) => res.render("celebrities/edit", data));
});

// celebritiesRouter.get("/:celebrityId/edit", (req, res, next) => {
//   const celebrityId = req.params.celebrityId;
//   Celebrity.findById(celebrityId)
//     .then((oneCelebrity) => {
//       const data = {
//         oneCelebrity: oneCelebrity,
//       };

//       res.render("celebrities/edit", data);
//     })
//     .catch((err) => console.log(err));
// });

// celebritiesRouter.post("/:celebrityId", (req, res, next) => {
//   const { name, occupation, catchPhrase } = req.body;
//   const { celebrityId } = req.params;

//   Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase })
//     .then((createdCelebrity) => {
//       res.redirect("/");
//     })
//     .catch((err) => res.render("celebrities/edit", data));
// });

// Receives the data from the add CELEBRITY form

celebritiesRouter.post("/", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then((createdCelebrity) => {
      res.redirect("/");
    })
    .catch((err) => res.render("celebrities/new", data));
});

celebritiesRouter.post("/:celebrityId/delete", (req, res, next) => {
  const celebrityId = req.params.celebrityId;
  Celebrity.findByIdAndRemove(celebrityId)
    .then((removedCelebrity) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

module.exports = celebritiesRouter;
