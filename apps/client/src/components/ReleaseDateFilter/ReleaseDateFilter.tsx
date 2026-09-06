import { Button, Chip, Input } from "@mui/material";
import { useState } from "react";

import { ReleaseYearRange } from "../../services/types";
import Dialog from "../Dialog";

import s from "./index.module.css";

interface ReleaseDateFilterProps {
  value: ReleaseYearRange[];
  onChange: (newRanges: ReleaseYearRange[]) => void;
}

const CURRENT_YEAR = new Date().getFullYear();

const presets: Array<{ label: string; range: ReleaseYearRange }> = [
  { label: "This year", range: { start: CURRENT_YEAR, end: CURRENT_YEAR } },
  {
    label: `${Math.floor(CURRENT_YEAR / 10) * 10}s`,
    range: {
      start: Math.floor(CURRENT_YEAR / 10) * 10,
      end: Math.floor(CURRENT_YEAR / 10) * 10 + 9,
    },
  },
  { label: "2010s", range: { start: 2010, end: 2019 } },
  { label: "2000s", range: { start: 2000, end: 2009 } },
  { label: "1990s", range: { start: 1990, end: 1999 } },
  { label: "1980s", range: { start: 1980, end: 1989 } },
  { label: "1970s", range: { start: 1970, end: 1979 } },
  { label: "Before 1970", range: { end: 1969 } },
];

function formatRange({ start, end }: ReleaseYearRange) {
  if (start && end) {
    return start === end ? `${start}` : `${start}-${end}`;
  }
  if (start) {
    return `${start}+`;
  }
  if (end) {
    return `≤${end}`;
  }
  return "All years";
}

export default function ReleaseDateFilter({
  value,
  onChange,
}: ReleaseDateFilterProps) {
  const [open, setOpen] = useState(false);
  const [pendingRanges, setPendingRanges] = useState<ReleaseYearRange[]>(value);
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");

  const openDialog = () => {
    setPendingRanges(value);
    setOpen(true);
  };

  const addPreset = (range: ReleaseYearRange) => {
    setPendingRanges([...pendingRanges, range]);
  };

  const addCustomRange = () => {
    const start = fromYear ? +fromYear : undefined;
    const end = toYear ? +toYear : undefined;
    if (start === undefined && end === undefined) {
      return;
    }
    setPendingRanges([...pendingRanges, { start, end }]);
    setFromYear("");
    setToYear("");
  };

  const removeRange = (index: number) => {
    setPendingRanges(pendingRanges.filter((_, i) => i !== index));
  };

  const apply = () => {
    onChange(pendingRanges);
    setOpen(false);
  };

  const clearAll = () => {
    setPendingRanges([]);
    onChange([]);
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={openDialog}>
        {value.length === 0
          ? "Release date: All years"
          : `Release date: ${value.map(formatRange).join(", ")}`}
      </Button>
      <Dialog
        title="Filter by release date"
        open={open}
        onClose={() => setOpen(false)}>
        <div className={s.dialogcontent}>
          <div className={s.presets}>
            {presets.map((preset) => (
              <Chip
                key={preset.label}
                label={preset.label}
                onClick={() => addPreset(preset.range)}
              />
            ))}
          </div>
          <div className={s.customrange}>
            <Input
              className={s.yearinput}
              type="number"
              placeholder="From year"
              value={fromYear}
              onChange={(ev) => setFromYear(ev.target.value)}
            />
            <Input
              className={s.yearinput}
              type="number"
              placeholder="To year"
              value={toYear}
              onChange={(ev) => setToYear(ev.target.value)}
            />
            <Button variant="outlined" onClick={addCustomRange}>
              Add range
            </Button>
          </div>
          <div className={s.chips}>
            {pendingRanges.map((range, index) => (
              <Chip
                key={`${range.start ?? ""}-${range.end ?? ""}-${index}`}
                label={formatRange(range)}
                onDelete={() => removeRange(index)}
              />
            ))}
          </div>
          <div className={s.actions}>
            <Button onClick={clearAll}>Clear all</Button>
            <Button variant="contained" onClick={apply}>
              Apply
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
