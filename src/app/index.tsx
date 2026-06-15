import { FilterBottomSheet } from "@/components/FilterBottomSheet";
import { ProductCard } from "@/components/ProductCard";
import { SortBottomSheet } from "@/components/SortBottomSheet";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addToBag } from "@/redux/slices/bagSlice";
import { clearCategory, setCategory } from "@/redux/slices/filterSlice";
import { fetchProducts } from "@/redux/slices/productSlice";
import type { RootState } from "@/redux/store";
import { filterProducts } from "@/utils/filterProducts";
import { sortProducts } from "@/utils/sortProducts";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";

import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";


export default function ProductsScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isSortBottomSheetVisible, setIsSortBottomSheetVisible] =
    useState(false);
  const [isFilterBottomSheetVisible, setIsFilterBottomSheetVisible] =
    useState(false);
  const [selectedSort, setSelectedSort] = useState<
    "price-low-high" | "price-high-low" | "rating-high-low" | null
  >(null);

  const { products, loading, error } = useAppSelector(
    (state: RootState) => state.product,
  );
  const { totalItems } = useAppSelector((state: RootState) => state.bag);
  const selectedCategory = useAppSelector(
    (state: RootState) => state.filter.selectedCategory,
  );

  // Fetch products on mount
  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  // Filter products by selected category
  const filteredProducts = useMemo(
    () => filterProducts(products, selectedCategory),
    [products, selectedCategory],
  );

  // Apply sorting to filtered products
  const displayedProducts = useMemo(
    () =>
      selectedSort
        ? sortProducts(filteredProducts, selectedSort)
        : filteredProducts,
    [filteredProducts, selectedSort],
  );

  /**
   * Header Component
   * Brand logo, search, favourite, and bag icons
   */
  const renderHeader = () => (
    <View
      style={tw`pl-4 pr-6 pt-12 pb-4 flex-row items-center justify-between border-b border-gray-200`}
    >
      
      <Text
        style={[
          tw`px-2 font-bold text-black flex flex-row items-center gap-1`,
          { fontFamily: "Outfit-SemiBold" },
        ]}
      >
        <AntDesign name="product" size={22} color="black" />{" "}
        <Text style={[tw`text-xl`, { fontFamily: "Outfit-SemiBold" }]}>
          Products
        </Text>
      </Text>

      {/* Icons Container */}
      <View style={tw`flex-row items-center gap-4`}>
        {/* Search Icon - Static */}
        <TouchableOpacity
          style={tw`w-6 h-6 items-center justify-center`}
          activeOpacity={0.7}
        >
          <Feather name="search" size={22} color="black" />
        </TouchableOpacity>

        {/* Favourite Icon - Static */}
        <TouchableOpacity
          style={tw`w-6 h-6 items-center justify-center`}
          activeOpacity={0.7}
        >
          <MaterialIcons name="favorite-border" size={24} color="black" />
        </TouchableOpacity>

        {/* Bag Icon - Functional */}
        <TouchableOpacity
          onPress={() => router.push("/bag")}
          style={tw`w-6 h-6 items-center justify-center`}
          activeOpacity={0.7}
        >
          <SimpleLineIcons name="handbag" size={24} color="black" />
          {totalItems > 0 && (
            <View
              style={[
                tw`absolute -top-1 -right-1 w-4 h-4 rounded-full items-center justify-center bg-blue-600`,
              ]}
            >
              <Text style={tw`text-white text-xs font-bold`}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  /**
   * Bottom Action Bar
   * Sort and Filter buttons
   */
  const renderBottomBar = () => (
    <View
      style={tw`px-4 py-3 flex-row gap-2 border-t border-gray-200 bg-white`}
    >
      {/* Sort Button */}
      <TouchableOpacity
        style={[
          tw`flex flex-row flex-1 gap-1 rounded-lg border border-blue-600 py-2 items-center justify-center`,
        ]}
        activeOpacity={0.7}
        onPress={() => setIsSortBottomSheetVisible(true)}
      >
        <MaterialCommunityIcons name="sort" size={18} color="blue" style={tw`opacity-70`}/>
        <Text
          style={[
            tw`text-blue-600 text-sm font-semibold`,
            { fontFamily: "Outfit-Medium" },
          ]}
        >
          Sort
        </Text>
      </TouchableOpacity>

      {/* Filter Button */}
      <TouchableOpacity
        style={[
          tw`flex flex-row flex-1 gap-1 rounded-lg border border-blue-600 py-2 items-center justify-center`,
        ]}
        activeOpacity={0.7}
        onPress={() => setIsFilterBottomSheetVisible(true)}
      >
        <Feather name="filter" size={18} color="blue" style={tw`opacity-70`} />
        <Text
          style={[
            tw`text-blue-600 text-sm font-semibold`,
            { fontFamily: "Outfit-Medium" },
          ]}
        >
          Filter
        </Text>
      </TouchableOpacity>
    </View>
  );

  /**
   * Loading State
   */
  if (loading) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-white`}>
        <ActivityIndicator size="large" color="#0066FF" />
      </View>
    );
  }

  /**
   * Error State
   */
  if (error) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-white`}>
        <Text
          style={[
            tw`text-red-600 text-center px-4`,
            { fontFamily: "Outfit-Medium" },
          ]}
        >
          {error}
        </Text>
      </View>
    );
  }

  /**
   * Main Render
   * Header + FlatList of products + Bottom action bar + Sort/Filter Bottom Sheets
   */
  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Header */}
      {renderHeader()}

      {/* Products List */}
      <FlatList
        data={displayedProducts}
        numColumns={2}
        columnWrapperStyle={tw`justify-between`}
        contentContainerStyle={tw`px-4 pt-4 pb-20`}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onAddToBag={(product) =>
              dispatch(addToBag({ product, quantity: 1 }))
            }
          />
        )}
        keyExtractor={(item) => String(item.id)}
      />

      {/* Fixed Bottom Action Bar */}
      <View style={tw`absolute bottom-0 left-0 right-0`}>
        {renderBottomBar()}
      </View>

      {/* Sort Bottom Sheet Modal */}
      <SortBottomSheet
        visible={isSortBottomSheetVisible}
        onClose={() => setIsSortBottomSheetVisible(false)}
        onSelectSort={(option) => {
          setSelectedSort(option);
        }}
      />

      {/* Filter Bottom Sheet Modal */}
      <FilterBottomSheet
        visible={isFilterBottomSheetVisible}
        onClose={() => setIsFilterBottomSheetVisible(false)}
        onApplyFilter={(category) => {
          dispatch(setCategory(category || ""));
        }}
        onClearAll={() => {
          dispatch(clearCategory());
          setSelectedSort(null);
        }}
      />
    </View>
  );
}
