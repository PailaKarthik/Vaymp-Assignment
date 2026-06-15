import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

export const EmptyBag = () => {
  const router = useRouter();

  return (
    <View style={tw`flex-1 bg-white items-center justify-center px-6`}>
      {/* Empty Bag Illustration */}
      <Text style={tw`text-8xl mb-4`}>🛍️</Text>

      {/* Empty Bag Message */}
      <Text
        style={[
          tw`text-xl font-semibold text-black mb-2 text-center`,
          { fontFamily: "Outfit-SemiBold" },
        ]}
      >
        Your Bag is Empty
      </Text>

      <Text
        style={[
          tw`text-sm text-gray-600 text-center mb-8`,
          { fontFamily: "Outfit-Regular" },
        ]}
      >
        Add items to your bag and come back to checkout
      </Text>

      {/* Continue Shopping Button */}
      <TouchableOpacity
        onPress={() => router.push("/")}
        style={tw`w-full py-4 rounded-lg bg-blue-600 items-center justify-center`}
      >
        <Text
          style={[
            tw`text-white text-base font-semibold`,
            { fontFamily: "Outfit-SemiBold" },
          ]}
        >
          Continue Shopping
        </Text>
      </TouchableOpacity>
    </View>
  );
};
