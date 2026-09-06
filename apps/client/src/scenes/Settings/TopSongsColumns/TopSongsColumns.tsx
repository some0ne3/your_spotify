import { Checkbox, FormControlLabel } from "@mui/material";
import { useSelector } from "react-redux";

import Text from "../../../components/Text";
import TitleCard from "../../../components/TitleCard";
import { changeVisibleTopSongsColumns } from "../../../services/redux/modules/settings/thunk";
import { selectVisibleTopSongsColumns } from "../../../services/redux/modules/user/selector";
import { useAppDispatch } from "../../../services/redux/tools";
import {
  DEFAULT_VISIBLE_TOP_SONGS_COLUMNS,
  OPTIONAL_TOP_SONGS_COLUMNS,
} from "../../Tops/Songs/Track/TrackGrid";

export function TopSongsColumns() {
  const dispatch = useAppDispatch();
  const visibleColumns =
    useSelector(selectVisibleTopSongsColumns) ??
    DEFAULT_VISIBLE_TOP_SONGS_COLUMNS;

  const toggleColumn = (key: string) => {
    const newColumns = visibleColumns.includes(key)
      ? visibleColumns.filter((c) => c !== key)
      : [...visibleColumns, key];
    dispatch(changeVisibleTopSongsColumns(newColumns)).catch(console.error);
  };

  return (
    <TitleCard title="Top songs columns">
      <Text element="span" size="normal">
        Columns to show in the top songs list.
      </Text>
      {OPTIONAL_TOP_SONGS_COLUMNS.map((column) => (
        <FormControlLabel
          key={column.key}
          control={
            <Checkbox
              checked={visibleColumns.includes(column.key)}
              onChange={() => toggleColumn(column.key)}
            />
          }
          label={column.label}
        />
      ))}
    </TitleCard>
  );
}
