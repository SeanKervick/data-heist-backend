import { User } from "../models/User.js";

export const updateHighScore = async (req, res) => {
  const { username, score } = req.body;
  // check body for debugging
  console.log(req.body);

  try {
    // find user by username (stored locally in browser at login and used for API call)
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    // only update the score if higher than the user's previously saved score
    if (score > (user.score || 0)) {
      user.score = score;
      await user.save();
    }

    res.status(200).json({ message: "Score updated", highScore: user.score });
  } catch (err) {
    res.status(500).json({ error: "Failed to update score" });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    // get top 10 users, sort them by score in descending order (-1) https://www.mongodb.com/docs/manual/reference/method
    const topUsers = await User.find().sort({ score: -1 }).limit(10);
    res.status(200).json(topUsers);
  } catch (err) {
    console.error("Error fetching leaderboard:", err);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
};
