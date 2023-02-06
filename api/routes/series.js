//  series router
const express = require('express');
const passport = require('passport')

const passportService = require('../services/passport')

const protectedRoute = passport.authenticate('jwt', { session: false })
const router = express.Router();

// build our info about the series
const Series = require('../models/singleseries');


// RESTful Endpoints
// Get, Post, Patch, Delete

const getSeries = async (req, res, next) => {
    // set = to series we find
    let series
    try {
        series = await Series.findById(req.params.id);
        if (series === null) {
            return res.status(404).json({
                message: 'Series not found'
            })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.series = series;
    next();
}


// Get all series
router.get('/', protectedRoute, async (req, res) => {
    try {
        // find everything in the series model
        const series = await Series.find();
        res.json(series);
    } catch (error) {
        res.status(500).json(error); // 500 = Internal Server Error
    }
});

//  Get one Series by ID
// look at getSeries first
router.get('/:id', getSeries, async (req, res) => {
    // variable matches the id in the URL
    res.json(res.series);
});

// Post - create new Series
router.post('/', async (req, res) => {
    const series = new Series({
        title: req.body.title,
        description: req.body.description,
        videolink: req.body.videolink,
    })
    try {
        const newSeries = await series.save();
        res.status(201).json(newSeries);  // 201 object created ok
    } catch (error) {
        res.status(400).json({ message: error.message }); // 400 user error, get message back

    }
});

// Patch - update Series
// update individual pieces of an item
router.patch('/:id', getSeries, async (req, res) => {
    // variable matches the id in the URL
    // res.send(`Series ID: ${req.params.id}`);
    // did this request send a title?
    if (req.body.title != null) {
        res.series.title = req.body.title;
    }
    if (req.body.description != null) {
        res.series.description = req.body.description;
    }
    if (req.body.videolink != null) {
        res.series.videolink = req.body.videolink;
    }
    try {
        // const updatedSeries = await Series.findByIdAndUpdate(req.params.id, req.body, { new: true });
        const updatedSeries = await res.series.save();
        res.json(updatedSeries);
    } catch (error) {
        res.status(400).json({ message: error.message }); // 4 
    }
});

// Delete - delete Series
router.delete('/:id', getSeries, async (req, res) => {
    // variable matches the id in the URL
    // res.send(`Series ID: ${req.params.id}`);
    try {
        await res.series.remove();
        res.json({ message: 'Remove series' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;