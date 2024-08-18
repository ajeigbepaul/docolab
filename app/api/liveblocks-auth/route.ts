import { liveblocks } from "@/lib/liveblocks";
import { getUserColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sign-in");
    return new Response(null, { status: 302 }); // Ensure the function exits after redirect
  }

  const { id, firstName, lastName, emailAddresses, imageUrl } = clerkUser;

  // Get the current user from your database
  const user = {
    id,
    info: {
      id,
      name: `${firstName} ${lastName}`,
      email: emailAddresses[0].emailAddress,
      avatar: imageUrl,
      color: getUserColor(id),
    },
  };
  try {
    // Identify the user and return the result
    const { status, body } = await liveblocks.identifyUser(
      {
        userId: user.info.email,
        groupIds: [],
      },
      { userInfo: user.info }
    );
    return new Response(body, { status });
  } catch (error) {
    console.error("Liveblocks Authentication failed:", error);
    return new Response("Authentication failed", { status: 401 });
  }
}
