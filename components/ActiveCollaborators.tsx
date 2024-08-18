import { useOthers } from "@liveblocks/react/suspense";
import Image from "next/image";
import React from "react";

const ActiveCollaborators = () => {
  const others = useOthers();
  if (!others) {
    console.error("Failed to fetch others");
    return <div>Error: Unable to fetch collaborators.</div>;
  }
  const collaborators = others.map((other) => other.info);
  console.log("Collaborators:",collaborators)
  if (!collaborators || collaborators.length === 0) {
    console.log("No collaborators found");
    return <div>No collaborators found.</div>;
  }
  return (
    <ul className="collaborators-list">
      {collaborators.map(({ id, avatar, name, color }) => (
        <li key={id}>
          <Image
            src={avatar}
            alt={name}
            width={100}
            height={100}
            className="inline-block ring-dark-100 ring-2 rounded-full size-8"
            style={{ border: `3px solid ${color}` }}
          />
        </li>
      ))}
    </ul>
  );
};

export default ActiveCollaborators;
