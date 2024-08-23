const express = require('express');
const router = express.Router();

const TopicController = require('../controllers/topicController');

// ***** admin only *****
router.post('/create-type', TopicController.createType);

// get all types 
router.get('/get-all-types', TopicController.getAllTypes);


// ***** user routes *****

// get all topics inside a specific type 
router.get(`/:type/all-topics`, TopicController.getAllTopicsByType);

// get all questions of a specific topic 
router.get(`/:type/:topic`, TopicController.getAllQuestionsByTopic);



module.exports = router;
