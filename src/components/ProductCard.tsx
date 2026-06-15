import type { Product } from "@/types/product";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

/**
 * ProductCard Component Props
 */
interface ProductCardProps {
  product: Product;
  onAddToBag: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToBag }: ProductCardProps) => {
  return (
    <View style={tw`w-[48%] mb-4 bg-white rounded-xl overflow-hidden`}>
      <View
        style={[
          tw`rounded-lg overflow-hidden bg-white border border-gray-200`,
          {
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.08,
            shadowRadius: 2,
            elevation: 1,
          },
        ]}
      >
        {/* Product Image Container */}
        <View style={tw`h-40 bg-gray-100 items-center justify-center`}>
          <Image
            source={{ uri: product.image }}
            style={tw`w-24 h-24`}
            resizeMode="contain"
          />
        </View>

        {/* Product Information */}
        <View style={tw`p-3`}>
          {/* Product Title */}
          <Text
            style={[
              tw`text-sm font-semibold text-black mb-1`,
              { fontFamily: "Outfit-SemiBold" },
            ]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {product.title}
          </Text>

          {/* Product Description */}
          <Text
            style={[
              tw`text-xs text-gray-600 mb-2`,
              { fontFamily: "Outfit-Regular" },
            ]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {product.description}
          </Text>

          {/* Price and Add to Bag Row */}
          <View style={tw`flex-row items-center justify-between`}>
            {/* Price */}
            <Text
              style={[
                tw`text-lg font-semibold text-blue-600`,
                { fontFamily: "Outfit-SemiBold" },
              ]}
            >
              ${product.price.toFixed(2)}
            </Text>

            {/* Add to Bag Button */}
            <TouchableOpacity
              onPress={() => onAddToBag(product)}
              style={[
                tw`rounded-lg px-3 py-2`,
                {
                  backgroundColor: "#0066FF",
                },
              ]}
            >
              <Text
                style={[
                  tw`text-white text-xs font-medium`,
                  { fontFamily: "Outfit-Medium" },
                ]}
              >
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
