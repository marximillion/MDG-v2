import React from 'react';
import { Dimensions } from 'react-native';
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const AnimatedRect = Animated.createAnimatedComponent(Rect);

export default function Shimmer() {
  const progress = useSharedValue(0);
  const shimmer = useSharedValue(-1);

  // Start the animation loops
  React.useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 1200, easing: Easing.out(Easing.cubic) }),
      -1,
      true
    );

    shimmer.value = withRepeat(
      withTiming(2, { duration: 1500, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  // Animate the rectangle growing to full screen
  const animatedRectProps = useAnimatedProps(() => {
    return {
      width: width * progress.value,
      height: height * progress.value,
    };
  });

  // Animate gradient movement (shimmer)
  const animatedGradientProps = useAnimatedProps(() => {
    return {
      x1: `${shimmer.value * 100}%`,
      x2: `${(shimmer.value + 1) * 100}%`,
    };
  });

  const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

  return (
    <Svg width={width} height={height}>
      <Defs>
        <AnimatedLinearGradient
          id="grad"
          y1="0%"
          y2="0%"
          animatedProps={animatedGradientProps}
        >
          <Stop offset="0%" stopColor="#e0e0e0" stopOpacity="0.2" />
          <Stop offset="50%" stopColor="#ffffff" stopOpacity="0.6" />
          <Stop offset="100%" stopColor="#e0e0e0" stopOpacity="0.2" />
        </AnimatedLinearGradient>
      </Defs>

      <AnimatedRect
        x={0}
        y={0}
        fill="url(#grad)"
        animatedProps={animatedRectProps}
      />
    </Svg>
  );
}
