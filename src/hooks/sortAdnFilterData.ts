import { useMemo } from "react";

interface ISortedAndFilteredDataHookProps<T extends Record<string, any>> {
  original: T[];
  sortBy: keyof T;
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
    }).sort((a, b) => a[props.sortBy].localeCompare(b[props.sortBy]));
  }, [props.original, props.filterValue, props.filterBy, props.sortBy]);

  return processedData;
}