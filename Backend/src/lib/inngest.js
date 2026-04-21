import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../modles/User.js";

export const inngest = new Inngest({
  id: "talent-iq",
  INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY,
});

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();

    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`,
      profileImg: image_url,
    };

    await User.create(newUser);
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();

    const { id } = event.data;
    await User.deleteOne({ clerkId: id });

    await User.create(newUser);
  }
);

export const functions = [syncUser, deleteUserFromDB];
