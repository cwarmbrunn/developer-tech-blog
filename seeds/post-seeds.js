// Require Post Model
const { Post } = require("../models");

const postData = [
  {
    title: "Donec posuere metus vitae ipsum.",
    post_url: "https://www.riotgames.com/en",
    user_id: 1,
  },
  {
    title: "Hello World!",
    post_url: "https://www.riotgames.com/en",
    user_id: 1,
  },
  {
    title: "Donec posuere metus vitae ipsum.",
    post_url: "https://www.riotgames.com/en",
    user_id: 2,
  },
  {
    title: "Donec posuere metus vitae ipsum.",
    post_url: "https://www.riotgames.com/en",
    user_id: 3,
  },
  {
    title: "Donec posuere metus vitae ipsum.",
    post_url: "https://www.riotgames.com/en",
    user_id: 4,
  },
  {
    title: "Donec posuere metus vitae ipsum.",
    post_url: "https://www.riotgames.com/en",
    user_id: 5,
  },
];

// Bulk create seed posts 
const seedPosts = () => Post.bulkCreate(postData);

// Export 
module.exports = seedPosts;
