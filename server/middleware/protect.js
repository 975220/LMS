import { clerkClient } from "@clerk/clerk-sdk-node";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const session = await clerkClient.sessions.verifySession(token);

    if (!session || !session.userId) {
      return res.status(401).json({ message: "Unauthorized: Invalid session" });
    }

    req.user = await clerkClient.users.getUser(session.userId);
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};