"use client";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import ActiveCollaborators from "./ActiveCollaborators";
import Loader from "./Loader";
const CollaborativeRoom = ({roomId,roomMetadata}:CollaborativeRoomProps) => {
  console.log("Rooom", roomId)
  if (!roomId) {
    console.error("No Room ID provided");
    return <div>Error: No room ID provided.</div>; // Display error if no roomId
  }
  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader/>}>
        <div className="collaborative-room">
          <Header>
            <div className="w-fit items-center justify-center">
              <p className="document-title text-white">Share</p>
            </div>
            <div className="flex flex-1 w-full justify-end gap-2 sm:gap-3">
              {/* <ActiveCollaborators /> */}
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>
          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
