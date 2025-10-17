import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "src/hooks/useTheme";
import { RepositoryFilters, DEFAULT_FILTERS } from "src/types";
import { ORGANIZATIONS } from "src/constants";
import { MultiSelectField } from "./components/MultiSelectField/MultiSelectField";
import { RangeInput } from "./components/RangeInput/RangeInput";
import { useStyles } from "./FilterScreen.styles";

export const FilterScreen = () => {
  const theme = useTheme();
  const styles = useStyles();

  const [filters, setFilters] = useState<RepositoryFilters>(DEFAULT_FILTERS);

  const organizations = [
    { label: "Pera Wallet", value: ORGANIZATIONS.perawallet },
    { label: "Algorand Foundation", value: ORGANIZATIONS.algorandfoundation },
    { label: "Algorand", value: ORGANIZATIONS.algorand },
  ];

  const languages = [
    { label: "TypeScript", value: "TypeScript" },
    { label: "JavaScript", value: "JavaScript" },
    { label: "Python", value: "Python" },
    { label: "Go", value: "Go" },
    { label: "Java", value: "Java" },
    { label: "Rust", value: "Rust" },
    { label: "Swift", value: "Swift" },
    { label: "Kotlin", value: "Kotlin" },
  ];

  const toggleOrganization = (org: string) => {
    setFilters((prev) => ({
      ...prev,
      organizations: prev.organizations.includes(org)
        ? prev.organizations.filter((o) => o !== org)
        : [...prev.organizations, org],
    }));
  };

  const toggleLanguage = (lang: string) => {
    setFilters((prev) => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter((l) => l !== lang)
        : [...prev.languages, lang],
    }));
  };

  const updateStarRange = (type: "min" | "max", value: number | null) => {
    setFilters((prev) => ({
      ...prev,
      stars: {
        ...prev.stars,
        [type]: value,
      },
    }));
  };

  const updateForkRange = (type: "min" | "max", value: number | null) => {
    setFilters((prev) => ({
      ...prev,
      forks: {
        ...prev.forks,
        [type]: value,
      },
    }));
  };

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
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
          <MultiSelectField
            label="Organization"
            options={organizations}
            selectedValues={filters.organizations}
            onToggle={toggleOrganization}
            type="checkbox"
          />
        </View>
        <View style={styles.section}>
          <MultiSelectField
            label="Language"
            options={languages}
            selectedValues={filters.languages}
            onToggle={toggleLanguage}
            type="chip"
          />
        </View>
        <View style={styles.section}>
          <RangeInput
            label="Stars"
            minValue={filters.stars.min}
            maxValue={filters.stars.max}
            onMinChange={(value) => updateStarRange("min", value)}
            onMaxChange={(value) => updateStarRange("max", value)}
          />
        </View>
        <View style={styles.section}>
          <RangeInput
            label="Forks"
            minValue={filters.forks.min}
            maxValue={filters.forks.max}
            onMinChange={(value) => updateForkRange("min", value)}
            onMaxChange={(value) => updateForkRange("max", value)}
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
