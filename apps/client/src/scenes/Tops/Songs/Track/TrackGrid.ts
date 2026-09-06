import { commonUnits } from "../../../../components/Grid/commonUnits";
import { useMobile } from "../../../../services/hooks/hooks";

export const MANDATORY_TOP_SONGS_COLUMNS = [
  "rank",
  "cover",
  "title",
  "count",
  "total",
  "options",
] as const;

export const OPTIONAL_TOP_SONGS_COLUMNS = [
  { key: "album", label: "Album" },
  { key: "releaseDate", label: "Release date" },
  { key: "albumType", label: "Album type" },
  { key: "duration", label: "Duration" },
] as const;

export const DEFAULT_VISIBLE_TOP_SONGS_COLUMNS: string[] =
  OPTIONAL_TOP_SONGS_COLUMNS.map((c) => c.key);

export function useTrackGrid() {
  const [isMobile] = useMobile();

  return {
    rank: { unit: commonUnits.rank, key: "rank" },
    cover: { unit: commonUnits.cover, key: "cover" },
    title: { unit: commonUnits.mainTitle, key: "title" },
    album: { unit: commonUnits.secondaryTitle, key: "album" },
    releaseDate: { unit: commonUnits.duration, key: "releaseDate" },
    albumType: { unit: commonUnits.duration, key: "albumType" },
    duration: { unit: commonUnits.duration, key: "duration" },
    count: { unit: commonUnits.percentage(isMobile), key: "count" },
    total: { unit: commonUnits.percentage(isMobile), key: "total" },
    options: { unit: commonUnits.options, key: "options" },
  } as const;
}
