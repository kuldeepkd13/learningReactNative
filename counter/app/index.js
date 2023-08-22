// CounterScreen.js
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const CounterScreen = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if(count>0){
     setCount(count - 1);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Counter App</Text>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={increment} />
      <Button title="Decrement" onPress={decrement} />
    </View>
  );
};

export default CounterScreen;
