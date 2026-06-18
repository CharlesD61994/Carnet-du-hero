import { fightingFantasy01 } from "./fightingFantasy01";
import { fightingFantasy52 } from "./fightingFantasy52";
import { fightingFantasy65 } from "./fightingFantasy65";

export const bookProfiles = [
  fightingFantasy01,
  fightingFantasy52,
  fightingFantasy65,
] as const;

export type BookProfileId = (typeof bookProfiles)[number]["id"];

export function findBookProfile(profileId?: string) {
  if (!profileId) return undefined;
  return bookProfiles.find((profile) => profile.id === profileId);
}
