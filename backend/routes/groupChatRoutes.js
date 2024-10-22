import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import GroupChat from "../models/GroupChat.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// Create a group chat
router.post("/create", protectRoute, async (req, res) => {
	const { name, members } = req.body;

	try {
		const newGroupChat = await GroupChat.create({ name, members });
		res.status(201).json(newGroupChat);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// Add members to group chat
router.post("/:groupId/addMember", protectRoute, async (req, res) => {
	const { groupId } = req.params;
	const { userId } = req.body;

	try {
		const groupChat = await GroupChat.findById(groupId);
		groupChat.members.push(userId);
		await groupChat.save();
		res.status(200).json(groupChat);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// Send a message to the group chat
router.post("/:groupId/message", protectRoute, async (req, res) => {
	const { groupId } = req.params;
	const { sender, content } = req.body;

	try {
		const groupChat = await GroupChat.findById(groupId);
		groupChat.messages.push({ sender, content });
		await groupChat.save();
		res.status(200).json(groupChat);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// Get all group chats for a user
router.get("/:userId/groups", protectRoute, async (req, res) => {
	const { userId } = req.params;

	try {
		const groups = await GroupChat.find({ members: userId });
		res.status(200).json(groups);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;

export default router;
//this wot work this way
