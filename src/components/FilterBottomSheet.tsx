import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

interface FilterBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilter: (category: string | null) => void;
  onClearAll: () => void;
}

const FILTER_CATEGORIES = [
  "Suggested Filters",
  "Gender",
  "Price",
  "Brand",
  "Fabric",
  "Fit",
  "Size",
  "Color",
  "Discounts",
  "Delivery Time",
];

const CATEGORY_OPTIONS: Record<string, string[]> = {
  "Suggested Filters": [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ],
  Gender: ["Men", "Women", "Unisex"],
  Price: ["Under $50", "$50-$100", "$100-$200", "Over $200"],
  Brand: ["Brand A", "Brand B", "Brand C"],
  Fabric: ["Cotton", "Polyester", "Wool"],
  Fit: ["Slim", "Regular", "Oversized"],
  Size: ["XS", "S", "M", "L", "XL"],
  Color: ["Red", "Blue", "Black", "White"],
  Discounts: ["10% off", "20% off", "30% off"],
  "Delivery Time": ["Express", "Standard", "Economy"],
};

export const FilterBottomSheet = ({
  visible,
  onClose,
  onApplyFilter,
  onClearAll,
}: FilterBottomSheetProps) => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Suggested Filters");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setSelectedOptions([]);
  };

  const handleToggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((opt) => opt !== option));
    } else {
      setSelectedOptions([option]);
    }
  };

  const handleApply = () => {
    console.log("Applying filter:", selectedCategory, selectedOptions);
    if (
      selectedCategory === "Suggested Filters" &&
      selectedOptions.length > 0
    ) {
      onApplyFilter(selectedOptions[0]);
    } else {
      onApplyFilter(null);
    }
    onClose();
  };

  const handleClear = () => {
    setSelectedCategory("Suggested Filters");
    setSelectedOptions([]);
    onClearAll();
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
          style={tw`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-5/6`}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={tw`flex-1`}
          >
            {/* Header */}
            <View style={tw`px-4 py-4 border-b border-gray-200`}>
              <Text
                style={[
                  tw`text-lg font-semibold text-black`,
                  { fontFamily: "Outfit-SemiBold" },
                ]}
              >
                Filters
              </Text>
            </View>

            {/* Content - Two Column Layout */}
            <View style={tw`flex-1 flex-row`}>
              {/* Left Section - Filter Categories */}
              <ScrollView style={tw`w-1/3 border-r border-gray-200 bg-gray-50`}>
                {FILTER_CATEGORIES.map((category) => (
                  <TouchableOpacity
                    key={category}
                    onPress={() => handleSelectCategory(category)}
                    style={[
                      tw`px-3 py-4 border-l-4`,
                      selectedCategory === category
                        ? tw`border-blue-600 bg-white`
                        : tw`border-transparent bg-gray-50`,
                    ]}
                  >
                    <Text
                      style={[
                        tw`text-xs`,
                        selectedCategory === category
                          ? tw`font-semibold text-blue-600`
                          : tw`font-normal text-gray-700`,
                        { fontFamily: "Outfit-Medium" },
                      ]}
                      numberOfLines={2}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Right Section - Filter Options */}
              <ScrollView style={tw`flex-1 p-4`}>
                <View style={tw`flex-row flex-wrap gap-2`}>
                  {(CATEGORY_OPTIONS[selectedCategory] || []).map((option) => (
                    <TouchableOpacity
                      key={option}
                      onPress={() => handleToggleOption(option)}
                      style={[
                        tw`px-3 py-2 rounded-full border`,
                        selectedOptions.includes(option)
                          ? tw`bg-blue-600 border-blue-600`
                          : tw`bg-white border-gray-300`,
                      ]}
                    >
                      <Text
                        style={[
                          tw`text-xs font-medium`,
                          selectedOptions.includes(option)
                            ? tw`text-white`
                            : tw`text-gray-700`,
                          { fontFamily: "Outfit-Medium" },
                        ]}
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Buttons - Apply and Clear All */}
            <View style={tw`px-4 py-4 border-t border-gray-200 flex-row gap-3`}>
              {/* Clear All Button */}
              <TouchableOpacity
                onPress={handleClear}
                style={tw`flex-1 py-3 rounded-lg border-2 border-blue-600 items-center justify-center`}
              >
                <Text
                  style={[
                    tw`text-blue-600 text-sm font-semibold`,
                    { fontFamily: "Outfit-Medium" },
                  ]}
                >
                  Clear All
                </Text>
              </TouchableOpacity>

              {/* Apply Filter Button */}
              <TouchableOpacity
                onPress={handleApply}
                style={tw`flex-1 py-3 rounded-lg bg-blue-600 items-center justify-center`}
              >
                <Text
                  style={[
                    tw`text-white text-sm font-semibold`,
                    { fontFamily: "Outfit-Medium" },
                  ]}
                >
                  Apply Filter
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
