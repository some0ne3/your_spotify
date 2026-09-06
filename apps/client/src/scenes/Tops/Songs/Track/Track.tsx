import clsx from "clsx";
import { Fragment } from "react";
import { useSelector } from "react-redux";

import { GridRowWrapper } from "../../../../components/Grid";
import InlineAlbum from "../../../../components/InlineAlbum";
import InlineArtist from "../../../../components/InlineArtist";
import InlineTrack from "../../../../components/InlineTrack";
import LongClickableTrack from "../../../../components/LongClickableTrack";
import PlayButton from "../../../../components/PlayButton";
import Text from "../../../../components/Text";
import TrackOptions from "../../../../components/TrackOptions";
import { useMobile } from "../../../../services/hooks/hooks";
import { selectVisibleTopSongsColumns } from "../../../../services/redux/modules/user/selector";
import { msToDuration } from "../../../../services/stats";
import { Artist, Album, Track as TrackType } from "../../../../services/types";
import { DEFAULT_VISIBLE_TOP_SONGS_COLUMNS, useTrackGrid } from "./TrackGrid";

import s from "./index.module.css";

interface TrackProps {
  track: TrackType;
  artists: Artist[];
  album?: Album;
  playable?: boolean;
  count: number;
  totalCount: number;
  duration: number;
  totalDuration: number;
  rank: number;
}

export default function Track(props: TrackProps) {
  const [isMobile, isTablet, isDesktop] = useMobile();
  const trackGrid = useTrackGrid();
  const visibleColumns =
    useSelector(selectVisibleTopSongsColumns) ??
    DEFAULT_VISIBLE_TOP_SONGS_COLUMNS;

  const {
    track,
    album,
    artists,
    playable,
    duration,
    totalDuration,
    count,
    totalCount,
    rank,
  } = props;

  const columns = [
    {
      ...trackGrid.rank,
      node: (
        <Text size="normal" element="strong" className={s.mlrank}>
          #{rank}
        </Text>
      ),
    },
    {
      ...trackGrid.cover,
      node: playable && (
        <PlayButton id={track.id} covers={album?.images ?? []} />
      ),
    },
    {
      ...trackGrid.title,
      node: (
        <div className={clsx("otext", s.names)}>
          <InlineTrack element="div" track={track} size="normal" />
          <div className="subtitle">
            {artists.map((art, k, a) => (
              <Fragment key={art.id}>
                <InlineArtist artist={art} noStyle size="normal" />
                {k !== a.length - 1 && ", "}
              </Fragment>
            ))}
          </div>
        </div>
      ),
    },
    {
      ...trackGrid.album,
      node: !isTablet && visibleColumns.includes("album") && album && (
        <InlineAlbum
          element="div"
          className="otext"
          album={album}
          size="normal"
        />
      ),
    },
    {
      ...trackGrid.releaseDate,
      node: !isMobile && visibleColumns.includes("releaseDate") && album && (
        <Text element="div" size="normal">
          {album.release_date?.split("-")[0]}
        </Text>
      ),
    },
    {
      ...trackGrid.albumType,
      node: !isMobile && visibleColumns.includes("albumType") && album && (
        <Text element="div" size="normal">
          {album.album_type &&
            album.album_type.charAt(0).toUpperCase() +
              album.album_type.slice(1)}
        </Text>
      ),
    },
    {
      ...trackGrid.duration,
      node: !isMobile && visibleColumns.includes("duration") && (
        <Text element="div" size="normal">
          {msToDuration(track.duration_ms)}
        </Text>
      ),
    },
    {
      ...trackGrid.count,
      node: (
        <Text
          element="div"
          size="normal"
          className={isMobile ? "right" : undefined}>
          {count}
          {!isMobile && (
            <>
              {" "}
              <Text size="normal">
                ({Math.floor((count / totalCount) * 10000) / 100}%)
              </Text>
            </>
          )}
        </Text>
      ),
    },
    {
      ...trackGrid.total,
      node: !isMobile && (
        <Text element="div" className="center" size="normal">
          {msToDuration(duration)}
          {isDesktop && (
            <>
              {" "}
              <Text size="normal">
                ({Math.floor((duration / totalDuration) * 10000) / 100}%)
              </Text>
            </>
          )}
        </Text>
      ),
    },
    { ...trackGrid.options, node: !isMobile && <TrackOptions track={track} /> },
  ];

  return (
    <LongClickableTrack track={track}>
      <GridRowWrapper
        columns={columns}
        className={clsx("play-button-holder", s.row)}
      />
    </LongClickableTrack>
  );
}
