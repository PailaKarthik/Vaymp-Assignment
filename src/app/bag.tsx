import { EmptyBag } from "@/components/EmptyBag";
import { QuantitySelector } from "@/components/QuantitySelector";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromBag,
} from "@/redux/slices/bagSlice";
import type { BagItem } from "@/types/bag";
import type { RootState } from "@/redux/store";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons"; /**
 * Bag Screen
 * Displays shopping bag with products, quantities, and summary
 */
export default function BagScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { items, totalItems, grandTotal } = useAppSelector(
    (state: RootState) => state.bag,
  );

  const renderHeader = () => (
    <View
      style={tw`px-4 pt-12 pb-4 flex-row items-center justify-between border-b border-gray-200`}
    >
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.push("/")}
        style={tw`w-6 h-6 items-center justify-center`}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text
        style={[
          tw`text-lg font-bold text-black`,
          { fontFamily: "Outfit-SemiBold" },
        ]}
      >
        My Bag
      </Text>

      {/* Placeholder for alignment */}
      <View style={tw`w-6 h-6`} />
    </View>
  );

  const renderBagItem = ({ item }: { item: BagItem }) => (
    <View>
      <View style={tw`px-4 py-4 flex-row gap-3`}>
        {/* Product Image */}
        <View
          style={[
            tw`w-20 h-20 rounded-lg bg-gray-100 items-center justify-center`,
          ]}
        >
          <Image
            source={{ uri: item.product.image }}
            style={tw`w-16 h-16`}
            resizeMode="contain"
          />
        </View>

        {/* Product Details */}
        <View style={tw`flex-1`}>
          {/* Title */}
          <Text
            style={[
              tw`text-sm font-semibold text-black mb-1`,
              { fontFamily: "Outfit-SemiBold" },
            ]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.product.title}
          </Text>

          {/* Price */}
          <Text
            style={[
              tw`text-base font-semibold text-blue-600 mb-2`,
              { fontFamily: "Outfit-SemiBold" },
            ]}
          >
            ${item.product.price.toFixed(2)}
          </Text>

          {/* Quantity Selector and Remove */}
          <View style={tw`flex-row items-center justify-between pr-5`}>
            <QuantitySelector
              quantity={item.quantity}
              onIncrease={() => dispatch(increaseQuantity(item.product.id))}
              onDecrease={() => {
                if (item.quantity > 1) {
                  dispatch(decreaseQuantity(item.product.id));
                }
              }}
            />

            {/* Remove Button */}
            <TouchableOpacity
              onPress={() => dispatch(removeFromBag(item.product.id))}
              activeOpacity={0.7}
            >
              <MaterialIcons
                name="delete-outline"
                size={24}
                color="red"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View style={tw`h-px bg-gray-200 mx-4`} />
    </View>
  );

  /**
   * Summary Section
   */
  const renderSummary = () => (
    <View style={tw`px-4 py-4 border-t border-gray-200 bg-white`}>
      {/* Total Items */}
      <View style={tw`flex-row items-center justify-between mb-3`}>
        <Text
          style={[tw`text-sm text-gray-600`, { fontFamily: "Outfit-Medium" }]}
        >
          Total Items
        </Text>
        <Text
          style={[
            tw`text-sm font-semibold text-black`,
            { fontFamily: "Outfit-SemiBold" },
          ]}
        >
          {totalItems}
        </Text>
      </View>

      {/* Grand Total */}
      <View
        style={tw`flex-row items-center justify-between border-t border-gray-200 pt-3`}
      >
        <Text
          style={[
            tw`text-base font-semibold text-black`,
            { fontFamily: "Outfit-SemiBold" },
          ]}
        >
          Grand Total
        </Text>
        <Text
          style={[
            tw`text-lg font-semibold text-blue-600`,
            { fontFamily: "Outfit-SemiBold" },
          ]}
        >
          ${grandTotal.toFixed(2)}
        </Text>
      </View>

      {/* Checkout Button */}
      <TouchableOpacity
        style={tw`mt-4 w-full py-4 rounded-lg bg-blue-600 items-center justify-center`}
      >
        <Text
          style={[
            tw`text-white text-base font-semibold`,
            { fontFamily: "Outfit-SemiBold" },
          ]}
        >
          Proceed to Checkout
        </Text>
      </TouchableOpacity>
    </View>
  );

  /**
   * Empty Bag State
   */
  if (items.length === 0) {
    return (
      <View style={tw`flex-1 bg-white`}>
        {renderHeader()}
        <EmptyBag />
      </View>
    );
  }

  /**
   * Filled Bag State
   */
  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Header */}
      {renderHeader()}

      {/* free delivary */}
      <View
        style={tw`px-4 py-2 bg-green-100 border border-green-300 rounded-lg my-2 mx-4`}
      >
        <Text
          style={[
            tw`text-sm text-center text-green-800`,
            { fontFamily: "Outfit-Medium" },
          ]}
        >
          🥳 Free delivery on orders over $50 🎉
        </Text>
      </View>

      {/* Bag Items List */}
      <FlatList
        data={items}
        renderItem={renderBagItem}
        keyExtractor={(item) => String(item.product.id)}
        scrollEnabled={true}
        contentContainerStyle={tw`pb-32`}
      />

      {/* Fixed Summary Section */}
      <View style={tw`absolute bottom-0 left-0 right-0`}>
        {renderSummary()}
      </View>
    </View>
  );
}
