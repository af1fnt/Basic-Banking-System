const express = require('express')
const route = require('express').Router()
const multerUpload = require("../libs/multer")
const mediaControllers = require('../controllers/mediaControllers');

route.post("/upload", multerUpload.single('image'), mediaControllers.uploadImage)
route.get('/images', mediaControllers.getImages);
route.get('/images/:id', mediaControllers.getImageById);
route.put('/images/:id', mediaControllers.updateImage);
route.delete('/images/:id', mediaControllers.deleteImage);

module.exports = route;