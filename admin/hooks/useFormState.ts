import { useState, useCallback, useRef } from 'react';

interface UseFormStateOptions<T> {
  initialData: T;
  onDataChange?: (hasChanges: boolean) => void;
  debounceMs?: number;
}

export function useFormState<T extends Record<string, any>>({
  initialData,
  onDataChange,
  debounceMs = 300
}: UseFormStateOptions<T>) {
  const [data, setData] = useState<T>(initialData);
  const [originalData, setOriginalData] = useState<T>(initialData);
  const debounceRef = useRef<TimeoutId>();

  const updateField = useCallback((path: string, value: any, section?: string) => {
    setData(prev => {
      let newData: T;
      
      if (section) {
        const sectionData = prev[section];
        if (typeof sectionData === 'object' && sectionData !== null) {
          newData = {
            ...prev,
            [section]: {
              ...sectionData,
              [path]: value
            }
          };
        } else {
          newData = prev;
        }
      } else {
        newData = {
          ...prev,
          [path]: value
        };
      }

      // Debounced change detection
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      
      debounceRef.current = setTimeout(() => {
        const hasChanges = JSON.stringify(newData) !== JSON.stringify(originalData);
        onDataChange?.(hasChanges);
      }, debounceMs);

      return newData;
    });
  }, [originalData, onDataChange, debounceMs]);

  const resetData = useCallback(() => {
    setData({ ...originalData });
  }, [originalData]);

  const saveData = useCallback((newOriginalData?: T) => {
    const dataToSave = newOriginalData || data;
    setOriginalData({ ...dataToSave });
    onDataChange?.(false);
  }, [data, onDataChange]);

  const hasChanges = JSON.stringify(data) !== JSON.stringify(originalData);

  return {
    data,
    originalData,
    updateField,
    resetData,
    saveData,
    hasChanges,
    setData,
    setOriginalData
  };
}