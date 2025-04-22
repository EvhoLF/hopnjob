import React, { useState, useCallback, forwardRef } from 'react';
import { View, LayoutChangeEvent } from 'react-native';
import BottomSheet, { BottomSheetProps } from 'react-native-gesture-bottom-sheet';

export interface BottomPopProps extends Omit<BottomSheetProps, 'height'> {
  /** Минимальная высота листа, если содержимого пока нет */
  minHeight?: number;
}

const BottomPop = forwardRef<BottomSheet, BottomPopProps>(
  ({ children, minHeight = 100, ...sheetProps }, ref) => {
    const [sheetHeight, setSheetHeight] = useState<number>(minHeight);

    const handleLayout = useCallback((event: LayoutChangeEvent) => {
      const { height } = event.nativeEvent.layout;
      if (height !== sheetHeight) setSheetHeight(height);
    }, [sheetHeight]);

    return (
      <BottomSheet
        ref={ref}
        height={sheetHeight}
        {...sheetProps}
      >
        <View onLayout={handleLayout}>
          {children}
        </View>
      </BottomSheet>
    );
  }
);

BottomPop.displayName = 'BottomPop';

export default BottomPop;
