import { useState } from "react";
import type { StaffMember } from "../types";

interface Props {
  member: StaffMember;
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function StaffCard({ member }: Props) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-full aspect-[3/4] overflow-hidden bg-[#1a1558] mb-4 flex items-center justify-center">
        {imgError ? (
          <span className="font-headline-xl text-headline-xl text-secondary-fixed opacity-60">
            {initials(member.name)}
          </span>
        ) : (
          <img
            src={member.photo}
            alt={`${member.name} — ${member.role}`}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <h3 className="font-headline-md text-headline-md text-secondary-fixed uppercase">
        {member.name}
      </h3>
      <p className="font-label-lg text-label-lg text-white uppercase mt-2 tracking-widest">
        {member.role}
      </p>
    </div>
  );
}
