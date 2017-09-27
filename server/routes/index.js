'use strict';
const express = require('express');
const router = express.Router();

const auth = require('./auth');
const mentors = require('./mentors');
const posts = require('./posts');
const profile = require('./profile');
const users = require('./users');

router.use('/auth', auth);
router.use('/mentors', mentors);
router.use('/posts', posts);
router.use('/profile', profile);
router.use('/users', users);

module.exports = router;