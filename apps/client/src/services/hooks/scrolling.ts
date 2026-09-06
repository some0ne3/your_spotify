import { useState, useRef, useEffect } from "react";

import { DEFAULT_ITEMS_TO_LOAD } from "../apis/api";
import { Interval } from "../intervals";

export function useInfiniteScroll<T>(
  interval: Interval,
  call: (
    start: Date,
    end: Date,
    nb: number,
    offset: number,
  ) => Promise<{ data: T[] }>,
  filter?: (item: T) => boolean,
  deps: unknown[] = [],
) {
  const [items, setItems] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const generation = useRef(0);

  const ref = useRef<(force?: boolean) => void>(() => {});

  ref.current = async (isNew = false) => {
    if (!hasMore && !isNew) return;
    const currentGeneration = generation.current;
    try {
      const result = await call(
        interval.start,
        interval.end,
        DEFAULT_ITEMS_TO_LOAD,
        isNew ? 0 : items.length,
      );
      if (currentGeneration !== generation.current) {
        return;
      }
      const filteredData = filter ? result.data.filter(filter) : result.data;
      if (isNew) {
        setItems([...filteredData]);
      } else {
        setItems([...items, ...filteredData]);
      }
      setHasMore(result.data.length === DEFAULT_ITEMS_TO_LOAD);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    generation.current += 1;
    setHasMore(true);
    setItems([]);
    setTimeout(() => ref.current?.(true), 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval, ...deps]);

  return { items, hasMore, onNext: ref.current };
}
