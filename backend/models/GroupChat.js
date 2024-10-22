import mongoose from "mongoose";

const groupChatSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		members: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		messages: [
			{
				sender: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
				content: {
					type: String,
					required: true,
				},
				timestamp: {
					type: Date,
					default: Date.now,
				},
			},
		],
	},
	{ timestamps: true }
);

const GroupChat = mongoose.model("GroupChat", groupChatSchema);

export default GroupChat;
