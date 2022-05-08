// Require Comment Model
const { Comment } = require("../models");

const commentData = [
  {
    comment_text: "Nunc rhoncus dui vel sem.",
    user_id: 2,
    post_id: 1,
  },
  {
    comment_text:
      "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    user_id: 1,
    post_id: 1,
  },
  {
    comment_text: "Aliquam erat volutpat. In congue.",
    user_id: 3,
    post_id: 2,
  },
  {
    comment_text:
      "Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
    user_id: 3,
    post_id: 3,
  },
  {
    comment_text: "I think this is a great post!",
    user_id: 4,
    post_id: 1,
  },
  {
    comment_text: "Hello World!",
    user_id: 1,
    post_id: 2,
  },
  {
    comment_text:
      "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    user_id: 2,
    post_id: 3,
  },
  {
    comment_text:
      "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    user_id: 1,
    post_id: 4,
  },
  {
    comment_text:
      "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    user_id: 3,
    post_id: 5,
  },
  {
    comment_text:
      "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat.",
    user_id: 4,
    post_id: 1,
  },
];

// Bulk create comments
const seedComments = () => Comment.bulkCreate(commentData);

// Export
module.exports = seedComments;
