import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useStyles } from "./StatTile.styles";

interface StatTileProps {
  icon: keyof typeof Ionicons.glyphMap;
  value: string | number;
  label: string;
  iconColor: string;
}

export const StatTile: React.FC<StatTileProps> = ({
  icon,
  value,
  label,
  iconColor,
}) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={28} color={iconColor} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

