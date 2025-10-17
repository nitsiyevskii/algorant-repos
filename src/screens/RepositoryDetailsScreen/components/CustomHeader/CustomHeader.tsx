import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FavoriteButton } from "src/components/FavoriteButton/FavoriteButton";
import { useTheme } from "src/hooks/useTheme";
import { useStyles } from "./CustomHeader.styles";

interface CustomHeaderProps {
  title: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  isFavorite,
  onToggleFavorite,
}) => {
  const theme = useTheme();
  const styles = useStyles();

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={28} color={theme.colors.core.primary} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>

        <View style={styles.rightContainer}>
          <FavoriteButton
            isSelected={isFavorite}
            onPress={onToggleFavorite}
            size={24}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

