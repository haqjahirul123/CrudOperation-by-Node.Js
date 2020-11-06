var express = require('express');
var router = express.Router();

var Model = require('../schema/boat');
const Search = require('../schema/search')
var Response = require('../response');
router.get('/', function(req, res, next) {
    res.render('index');
  });



//List search Data
// router.get('/search/:boat_name', function(req, res) {

//     console.log(Model.boat_name)
//     Model.find({boat_name:req.params.boat_name},function(err, searchBoats) {
//         if (err) {
//             console.log(err);
//         } else {
//             //  res.render('search', { searchBoats: searchBoats });
//             console.log(searchBoats);
//         }
//     });

//     res.render('search');

//     });
router.get('/search', function(req, res, next) {
    res.render('search');
});
router.post('/search', function(req, res,next) {
    {$or:[{region: "NA"},{sector:"Some Sector"}]}
    Model.find( {$or:[{'boat_name': req.body.boat_name} ,{'boat_price' : { $gt : req.body.boat_price}}]},function(err, users) {
        if (err) {
            console.log(err);
        } else {
            //res.render('search', { users: users });
            console.log('HERE',users);
        }
    });

    // Model.find({'boat_name': req.body.boat_name},function(err, users) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         //res.render('search', { users: users });
    //         console.log('HERE',users);
    //     }
    // });


});




//List Table Data
router.get('/display', function(req, res) {

console.log(Model.boat_name)
    Model.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.render('display-table', { users: users });
            console.log(users);
        }
    });
});


//Display Form
router.get('/add', function(req, res, next) {
    res.render('add-form');
});


/* POST Data. */
router.post('/add', function(req, res, next) {
    console.log(req.body);

    const mybodydata = {
        boat_name: req.body.boat_name,
        boat_manufractureYear: req.body.boat_manufractureYear,
        boat_price : req.body.boat_price,
        boat_sail: req.body.boat_sail,
        boat_motor: req.body.boat_motor
    }
    var data = Model(mybodydata);
    //var data = UsersModel(req.body);
    data.save(function(err) {
        if (err) {

            res.render('add-form', { message: 'User registered not successfully!' });
        } else {

            res.render('add-form', { message: 'User registered successfully!' });
        }
    })
});

/* DELETE User BY ID */
router.get('/delete/:id', function(req, res) {
    Model.findByIdAndRemove(req.params.id, function(err, project) {
        if (err) {

            req.flash('error_msg', 'Record Not Deleted');
            res.redirect('../display');
        } else {

            req.flash('success_msg', 'Record Deleted');
            res.redirect('../display');
        }
    });
});

/* GET SINGLE User BY ID */
router.get('/show/:id', function(req, res) {
    console.log(req.params.id);
    Model.findById(req.params.id, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            console.log(user);

            res.render('show', { users: user });
        }
    });
});

/* GET SINGLE User BY ID */
router.get('/edit/:id', function(req, res) {
    console.log(req.params.id);
    Model.findById(req.params.id, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            console.log(user);

            res.render('edit-form', { users: user });
        }
    });
});

/* UPDATE User */
router.post('/edit/:id', function(req, res) {
    Model.findByIdAndUpdate(req.params.id, req.body, function(err) {
        if (err) {
            req.flash('error_msg', 'Something went wrong! User could not updated.');
            res.redirect('edit/' + req.params.id);
        } else {
            req.flash('success_msg', 'Record Updated');
            res.redirect('../display');
        }
    });
});

module.exports = router;
