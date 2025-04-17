declare module 'react-native-gesture-bottom-sheet' {
  import { Component } from 'react';
  import { ViewStyle } from 'react-native';

  export interface BottomSheetProps {
    height?: number;
    hasDraggableIcon?: boolean;
    draggable?: boolean;
    radius?: number;
    sheetBackgroundColor?: string;
    onOpen?: () => void;
    onClose?: () => void;
    gestureEnabled?: boolean;
    style?: ViewStyle;
    children?: React.ReactNode;
  }

  export default class BottomSheet extends Component<BottomSheetProps> {
    show(): void;
    close(): void;
  }
}
