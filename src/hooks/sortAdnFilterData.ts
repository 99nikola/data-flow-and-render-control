import { useMemo } from "react";

interface ISortedAndFilteredDataHookProps<T extends Record<string, any>> {
  original: T[];
  sortBy: Record<string, any>;
  filterBy: keyof T;
  filterValue: RegExp;
}

export function useSortedAndFilteredData
  <T extends Record<string, any>>(props: ISortedAndFilteredDataHookProps<T>): T[] {
  const processedData = useMemo(() => {
    return props.original.filter(entity => {
        return (
          props.filterValue.source.length === 0 || 
          props.filterValue.test(entity[props.filterBy])
        );
    }).sort((a, b) => (props.sortBy.asc || 1) * a[props.sortBy.name].localeCompare(b[props.sortBy.name]));
  }, [props.original, props.filterValue, props.filterBy, props.sortBy]);

  return processedData;
}