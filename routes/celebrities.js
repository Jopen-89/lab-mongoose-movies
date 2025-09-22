const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// GET /celebrities
router.get("/", (req, res, next) => {
  Celebrity.find()
    .then(celebritiesFromDB => {
      res.render("celebrities/index", { celebrities: celebritiesFromDB });
    })
    .catch(err => next(err));
});

//GET /celebrities/new  ACORDARSE DEL ORDEN DE LAS RUTAS

router.get("/new", (req, res) => {
  res.render("celebrities/new");
});

//POST /celebrities/news

router.post("/new", (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;

    Celebrity.create({ name, occupation, catchPhrase })
        .then(() => 
            res.redirect('/celebrities')
        )
        .catch(err => res.render('celebrities/new'))

})

//POST /celebrities/_id/delete

router.post("/:id/delete", (req, res) => {
    const { id } = req.params;
    Celebrity.deleteOne({_id: id})
        .then(() => res.redirect("/celebrities")) 
        .catch(err => console.log("error intentando borrar", err))
})

//GET /celebrities/details 

router.get("/:id", (req, res, next) => {
    const { id } = req.params;

    Celebrity.findById(id)
        .then(celebFromDB =>
            res.render('celebrities/details', celebFromDB))
        .catch(err => res.render());
}) 

//GET /celerbities/:id/edit

router.get("/:id/edit", (req, res, next) => {
  const { id } = req.params;

  Celebrity.findById(id)
    .then(celebrity => 
      res.render("celebrities/edit", { celebrity }))
    .catch(next);
});

router.post("/:id", (req, res, next) => {
  const { id } = req.params;
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.updateOne(
    {_id: id}, 
    {$set: { name, occupation, catchPhrase }}
  )
    .then(() => res.redirect('/celebrities'))
    .catch(err => next(err))
})



module.exports = router;


