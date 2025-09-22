const router = require('express').Router()
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')



//GET /movies para el listado de peliculas

router.get('/', (req, res, next) => {

    Movie.find().populate('cast')
        .then(moviesFromDb => res.render('movies/index', ({movies: moviesFromDb})))
        .catch(err => next(err))
}
)

//GET movies/new show a form to create a movie

router.get("/new", (req, res, next) => {

    Celebrity.find()
        .then(celebrities => res.render("movies/new", { celebrities }))
        .catch(err => next(err))
})


router.post("/", (req, res, next) => {
    const { title, genre, plot } = req.body;

    let cast = [];

    if (!req.body.cast) {
        cast = []; //caso 1: no seleccionan nada
    } else if (Array.isArray(req.body.cast)) { //caso 2: es array, seleccionaron mas de 1
        cast = req.body.cast;
    } else {
        cast = [req.body.cast]  //caso 3: string lo paso a array
    }
    

    Movie.create({ title, genre, plot, cast })
        .then(() => res.redirect("/movies"))
        .catch(err => next(err));
})


//GET movies/:id/details

router.get("/:id/details", (req, res, next) => {
    const { id } = req.params;

    Movie.findById(id)
        .populate('cast')
        .then(moviePopFromDb => res.render('movies/details', ({movie: moviePopFromDb})))
        .catch(err => next(err))
})

//POST movies/:id/delete

router.get('/:id/delete', (req, res, next) => {
    const { id } = req.params;

    Movie.deleteOne({_id: id})
        .then(() => res.redirect('/movies'))
        .catch(err => next(err))
})

//GET /movies/:id/edit

router.get('/:id/edit', (req, res, next) => {
    const { id } = req.params;

    Movie.findById(id)
        .populate('cast')
        .then(movie => {
            Celebrity.find()
                .then(celebrities => 
                    res.render('movies/edit', {movie, celebrities}))

                })
                .catch(err => next(err))
})

//POST /movie/:id/edit

router.post('/:id/edit', (req, res, next) => {
    const { id } = req.params;
    const { title, genre, plot } = req.body;

    //hacer que cast sea siempre un array

    let cast = [];

    if (!req.body.cast) {
        cast = []; //caso 1: no seleccionan nada
    } else if (Array.isArray(req.body.cast)) { //caso 2: es array, seleccionaron mas de 1
        cast = req.body.cast;
    } else {
        cast = [req.body.cast]  //caso 3: string lo paso a array
    }

    Movie.updateOne({_id: id}, {$set: {title, genre, plot, cast}}, {runValidators: true})
        .then(() => res.redirect('/movies'))
        .catch(err => next(err))
}
)

module.exports = router;