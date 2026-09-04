import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [randomBackground, setRandomBackground] = useState('#ffffff');

  const [numBoxes, setNumBoxes] = useState(0);
  const [numCircles, setNumCircles] = useState(0);

  const generateRandomColor = () => {
    const hexRange = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += hexRange[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const boxPosition = () => {
    const x = Math.floor(Math.random() * 300);
    const y = Math.floor(Math.random() * 600);
    return { x, y };
  };

  const handlePress = () => {
    setRandomBackground(generateRandomColor());

    const numOfBoxes = Math.floor(Math.random() * 10) + 1;
    const numOfCircles = Math.floor(Math.random() * 10) + 1;

    setNumBoxes(numOfBoxes);
    setNumCircles(numOfCircles);
  };

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView
        style={[styles.container, { backgroundColor: randomBackground }]}
      >
        {numBoxes > 0 &&
          Array.from({ length: numBoxes }).map((_, index) => {
            const boxColor = generateRandomColor();
            const { x, y } = boxPosition();
            const borderColor = generateRandomColor();
            return (
              <View
                key={index}
                style={[
                  styles.box,
                  {
                    backgroundColor: boxColor,
                    left: x,
                    top: y,
                    position: 'absolute',
                    borderColor: borderColor,
                  },
                ]}
              />
            );
          })}

        {numCircles > 0 &&
          Array.from({ length: numCircles }).map((_, index) => {
            const circleColor = generateRandomColor();
            const { x, y } = boxPosition();
            const borderColor = generateRandomColor();
            return (
              <View
                key={index}
                style={[
                  styles.circle,
                  {
                    backgroundColor: circleColor,
                    left: x,
                    top: y,
                    position: 'absolute',
                    borderColor: borderColor,
                  },
                ]}
              />
            );
          })}

        <TouchableOpacity onPress={handlePress}>
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
  actionBtn: {
    backgroundColor: '#6A1B4D',
    borderRadius: 12,
    paddingHorizontal: 40,
    paddingVertical: 10,
    position: 'relative',
  },
  actionBtnText: {
    fontSize: 18,
    textTransform: 'uppercase',
    color: '#fff',
  },
  box: {
    width: 50,
    height: 50,
    margin: 10,
    borderWidth: 3,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
    borderWidth: 3,
  },
});
