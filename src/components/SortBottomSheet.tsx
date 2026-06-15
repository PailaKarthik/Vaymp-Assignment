import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

interface SortBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onSelectSort: (
    option: "price-low-high" | "price-high-low" | "rating-high-low",
  ) => void;
}

export const SortBottomSheet = ({
  visible,
  onClose,
  onSelectSort,
}: SortBottomSheetProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const sortOptions = [
    { label: "Price Low To High", value: "price-low-high" },
    { label: "Price High To Low", value: "price-high-low" },
    { label: "Rating High To Low", value: "rating-high-low" },
  ];

  const handleSelect = (
    option: "price-low-high" | "price-high-low" | "rating-high-low",
  ) => {
    setSelectedOption(option);
    onSelectSort(option);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={tw`flex-1 bg-black/50`}
      >
        <View
          style={tw`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl`}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <View style={tw`px-4 py-4 border-b border-gray-200`}>
              <Text
                style={[
                  tw`text-lg font-semibold text-black`,
                  { fontFamily: "Outfit-SemiBold" },
                ]}
              >
                Sort By
              </Text>
            </View>

            {/* Options */}
            {sortOptions.map((option, index) => (
              <View key={option.value}>
                <TouchableOpacity
                  onPress={() => handleSelect(option.value as any)}
                  style={[
                    tw`px-4 py-4 flex-row items-center justify-between`,
                    selectedOption === option.value && tw`bg-blue-100`,
                  ]}
                >
                  <Text
                    style={[
                      tw`text-base`,
                      selectedOption === option.value
                        ? tw`font-semibold text-blue-600`
                        : tw`font-normal text-gray-700`,
                      { fontFamily: "Outfit-Medium" },
                    ]}
                  >
                    {option.label}
                  </Text>

                  {selectedOption === option.value && (
                    <View
                      style={tw`w-5 h-5 rounded-full bg-blue-600 items-center justify-center`}
                    >
                      <Text style={tw`text-white text-xs font-bold`}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>

                {index < sortOptions.length - 1 && (
                  <View style={tw`h-px bg-gray-300 mx-4`} />
                )}
              </View>
            ))}

            {/* Close Button */}
            <View style={tw`px-4 py-4 border-t border-gray-200`}>
              <TouchableOpacity
                onPress={onClose}
                style={tw`py-3 items-center justify-center`}
              >
                <Text
                  style={[
                    tw`text-blue-600 text-sm font-semibold`,
                    { fontFamily: "Outfit-Medium" },
                  ]}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
