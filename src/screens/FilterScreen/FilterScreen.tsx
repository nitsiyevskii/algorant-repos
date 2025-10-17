import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "src/hooks/useTheme";
import { ORGANIZATION_OPTIONS, AVAILABLE_LANGUAGES } from "src/constants";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import {
  toggleOrganization,
  toggleLanguage,
  setStarMin,
  setStarMax,
  setForkMin,
  setForkMax,
  resetFilters,
} from "src/store/slices/filtersSlice";
import {
  selectOrganizationFilters,
  selectLanguageFilters,
  selectStarFilters,
  selectForkFilters,
} from "src/store/selectors/repositoriesSelectors";
import { MultiSelectField } from "./components/MultiSelectField/MultiSelectField";
import { RangeInput } from "./components/RangeInput/RangeInput";
import { useStyles } from "./FilterScreen.styles";

export const FilterScreen = () => {
  const theme = useTheme();
  const styles = useStyles();
  const dispatch = useAppDispatch();

  const selectedOrganizations = useAppSelector(selectOrganizationFilters);
  const selectedLanguages = useAppSelector(selectLanguageFilters);
  const stars = useAppSelector(selectStarFilters);
  const forks = useAppSelector(selectForkFilters);

  const handleToggleOrganization = (org: string) => {
    dispatch(toggleOrganization(org));
  };

  const handleToggleLanguage = (lang: string) => {
    dispatch(toggleLanguage(lang));
  };

  const handleStarMinChange = (value: number | null) => {
    dispatch(setStarMin(value));
  };

  const handleStarMaxChange = (value: number | null) => {
    dispatch(setStarMax(value));
  };

  const handleForkMinChange = (value: number | null) => {
    dispatch(setForkMin(value));
  };

  const handleForkMaxChange = (value: number | null) => {
    dispatch(setForkMax(value));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  const handleApply = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.closeButton}
        >
          <Ionicons name="close" size={28} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
        <TouchableOpacity onPress={handleReset}>
          <Text style={styles.resetButton}>Reset</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <RangeInput
            label="Stars"
            minValue={stars.min}
            maxValue={stars.max}
            onMinChange={handleStarMinChange}
            onMaxChange={handleStarMaxChange}
          />
        </View>
        <View style={styles.section}>
          <RangeInput
            label="Forks"
            minValue={forks.min}
            maxValue={forks.max}
            onMinChange={handleForkMinChange}
            onMaxChange={handleForkMaxChange}
          />
        </View>
        <View style={styles.section}>
          <MultiSelectField
            label="Organization"
            options={ORGANIZATION_OPTIONS}
            selectedValues={selectedOrganizations}
            onToggle={handleToggleOrganization}
            type="checkbox"
          />
        </View>
        <View style={styles.section}>
          <MultiSelectField
            label="Language"
            options={AVAILABLE_LANGUAGES}
            selectedValues={selectedLanguages}
            onToggle={handleToggleLanguage}
            type="chip"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
