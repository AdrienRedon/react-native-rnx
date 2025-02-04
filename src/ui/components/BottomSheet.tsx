import React, { useRef, useState } from 'react';
import RNBottomSheet from 'reanimated-bottom-sheet';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { setActionsSheetRef } from '../hooks/useBottomSheet';
import { BottomSheetOptions } from './BottomSheetOptions';

export interface BottomSheetActionsRef {
  show: (props?: any) => void;
  hide: () => void;
}

const snapPointHeight = 300;

export const BottomSheet = () => {
  const snapPoints = [snapPointHeight, 0];
  const [isVisible, setIsVisible] = useState(false);
  const [sheetProps, setSheetProps] = useState<any>();
  const sheetRef = useRef<RNBottomSheet | undefined>();

  const show = (props?: any) => {
    setSheetProps(props);
    sheetRef.current?.snapTo(0);
    setIsVisible(true);
  };

  const hide = () => {
    sheetRef.current?.snapTo(snapPoints[snapPoints.length - 1]);
    setSheetProps(undefined);
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <TouchableOpacity
          onPress={isVisible ? hide : show}
          style={styles.backdrop}
          activeOpacity={0.9}
        />
      )}

      <RNBottomSheet
        ref={(ref) => {
          sheetRef.current = ref || undefined;
          setActionsSheetRef({
            show,
            hide,
          });
        }}
        snapPoints={snapPoints}
        initialSnap={snapPoints[snapPoints.length - 1]}
        borderRadius={17}
        enabledGestureInteraction={false}
        enabledInnerScrolling={false}
        enabledContentTapInteraction={false}
        onCloseStart={() => {
          setIsVisible(false);
        }}
        onOpenEnd={() => {
          setIsVisible(true);
        }}
        renderContent={() =>
          sheetProps && (
            <BottomSheetOptions {...sheetProps} height={snapPoints[0]} />
          )
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: '#000',
    opacity: 0.7,
  },
});
