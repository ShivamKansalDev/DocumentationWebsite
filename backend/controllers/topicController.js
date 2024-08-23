const Topic = require("../models/topicModel");

const TopicController = {
  createType : async (req, res) => {
    try {
      const topic = new Topic(req.body);
      await topic.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getAllTypes : async (req, res) => {
    try {
      const types = await Topic.find(); // to find all the entries
      res.status(200).json(types);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getAllTopicsByType : async (req, res) => {
    try {
      const type = req.params.type;
      if(type){
        const types = await Topic.findOne({type}); // to find all the entries
        res.status(200).json(types);
      }else{
        throw(error, "Type not listed")
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getAllQuestionsByTopic : async (req, res) => {
    try {
      const { type, topic} = req.params;
      if(type && topic){
        const type = await Topic.findOne({type});
        if(!type) res.status(400).json({ error: 'No document found for the specified type' });
        const topic = type.subheadings.find((sub) => sub.topic == topic);
        if (!topic) {
          res.status(404).json({ error: 'No subheading found for the specified topic' });
        }
        res.status(200).json(topic.questions);
      }else{
        throw(error, "Type not listed")
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
}

module.exports = TopicController;
