import { useSelector } from "react-redux";

import { GridRowWrapper } from "../../../../components/Grid";
import Text from "../../../../components/Text";
import { useMobile } from "../../../../services/hooks/hooks";
import { selectVisibleTopSongsColumns } from "../../../../services/redux/modules/user/selector";
import { DEFAULT_VISIBLE_TOP_SONGS_COLUMNS, useTrackGrid } from "./TrackGrid";

import s from "./index.module.css";

export default function TrackHeader() {
  const [isMobile, isTablet] = useMobile();

  const trackGrid = useTrackGrid();
  const visibleColumns =
    useSelector(selectVisibleTopSongsColumns) ??
    DEFAULT_VISIBLE_TOP_SONGS_COLUMNS;

  const columns = [
    { ...trackGrid.cover, node: <div aria-label="cover" /> },
    {
      ...trackGrid.title,
      node: (
        <Text element="div" size="normal">
          Title
        </Text>
      ),
    },
    {
      ...trackGrid.album,
      node: !isTablet && visibleColumns.includes("album") && (
        <Text element="div" size="normal">
          Album name
        </Text>
      ),
    },
    {
      ...trackGrid.releaseDate,
      node: !isMobile && visibleColumns.includes("releaseDate") && (
        <Text element="div" size="normal">
          Released
        </Text>
      ),
    },
    {
      ...trackGrid.albumType,
      node: !isMobile && visibleColumns.includes("albumType") && (
        <Text element="div" size="normal">
          Type
        </Text>
      ),
    },
    {
      ...trackGrid.duration,
      node: !isMobile && visibleColumns.includes("duration") && (
        <Text element="div" size="normal">
          Duration
        </Text>
      ),
    },
    {
      ...trackGrid.count,
      node: (
        <div className={s.count}>
          <Text element="div" size="normal">
            Count
          </Text>
        </div>
      ),
    },
    {
      ...trackGrid.total,
      node: !isMobile && (
        <div className={s.total}>
          <Text element="div" size="normal">
            Total
          </Text>
        </div>
      ),
    },
    {
      ...trackGrid.options,
      node: !isMobile && <div aria-label="option-menu" />,
    },
  ];

  return <GridRowWrapper columns={columns} className={s.header} />;
}
