import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type Shape = {
  id: string;
  backgroundColor: string;
  borderColor: string;
  x: number;
  y: number;
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const [randomBackground, setRandomBackground] = useState('#ffffff');

  const [boxes, setBoxes] = useState<Shape[]>([]);
  const [circles, setCircles] = useState<Shape[]>([]);

  // Generate random HEX color
  const generateRandomColor = () => {
    const hexRange = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += hexRange[Math.floor(Math.random() * 16)];
    }

    return color;
  };

  // Generate random position
  const generateRandomPosition = () => {
    const shapeSize = 50;

    const x = Math.floor(Math.random() * (SCREEN_WIDTH - shapeSize));

    const y = Math.floor(Math.random() * (SCREEN_HEIGHT - shapeSize));

    return {
      x,
      y,
    };
  };

  // Generate one shape's complete data
  const generateShape = () => {
    const { x, y } = generateRandomPosition();

    return {
      id: Math.random().toString(),
      backgroundColor: generateRandomColor(),
      borderColor: generateRandomColor(),
      x,
      y,
    };
  };

  const handlePress = () => {
    setRandomBackground(generateRandomColor());

    const numberOfBoxes = Math.floor(Math.random() * 5) + 1;
    const numberOfCircles = Math.floor(Math.random() * 5) + 1;

    const newBoxes = Array.from({ length: numberOfBoxes }, () =>
      generateShape(),
    );
    const newCircles = Array.from({ length: numberOfCircles }, () =>
      generateShape(),
    );

    setBoxes(newBoxes);
    setCircles(newCircles);
  };

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: randomBackground,
          },
        ]}
      >
        {/* Boxes */}
        {boxes.map(box => (
          <View
            key={box.id}
            style={[
              styles.box,
              {
                backgroundColor: box.backgroundColor,
                borderColor: box.borderColor,
                left: box.x,
                top: box.y,
              },
            ]}
          />
        ))}

        {/* Circles */}
        {circles.map(circle => (
          <View
            key={circle.id}
            style={[
              styles.circle,
              {
                backgroundColor: circle.backgroundColor,
                borderColor: circle.borderColor,
                left: circle.x,
                top: circle.y,
              },
            ]}
          />
        ))}

        {/* Button */}
        <TouchableOpacity
          onPress={handlePress}
          activeOpacity={0.8}
          style={styles.buttonWrapper}
        >
          <View style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>Press Me</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonWrapper: {
    zIndex: 10,
  },

  actionBtn: {
    backgroundColor: '#6A1B4D',
    borderRadius: 12,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },

  actionBtnText: {
    fontSize: 18,
    textTransform: 'uppercase',
    color: '#fff',
    fontWeight: '600',
  },

  box: {
    width: 50,
    height: 50,
    position: 'absolute',
    borderWidth: 3,
  },

  circle: {
    width: 50,
    height: 50,
    position: 'absolute',
    borderRadius: 25,
    borderWidth: 3,
  },
});
