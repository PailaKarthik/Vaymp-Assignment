import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
}: QuantitySelectorProps) => {
  return (
    <View
      style={[
        tw`flex-row items-center justify-center gap-2 bg-white rounded-lg border border-blue-600 p-1`,
      ]}
    >
      {/* Decrease Button */}
      <TouchableOpacity
        onPress={onDecrease}
        style={tw`w-8 h-8 rounded-md bg-blue-600 items-center justify-center`}
        activeOpacity={0.7}
      >
        <Text style={tw`text-white text-lg font-bold`}>−</Text>
      </TouchableOpacity>

      {/* Quantity Display */}
      <Text
        style={[
          tw`w-8 text-center text-base font-semibold text-blue-600`,
          { fontFamily: "Outfit-SemiBold" },
        ]}
      >
        {quantity}
      </Text>

      {/* Increase Button */}
      <TouchableOpacity
        onPress={onIncrease}
        style={tw`w-8 h-8 rounded-md bg-blue-600 items-center justify-center`}
        activeOpacity={0.7}
      >
        <Text style={tw`text-white text-lg font-bold`}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
