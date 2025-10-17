import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "src/hooks/useTheme";
import { useStyles } from "./RepositoryHeader.styles";

interface RepositoryHeaderProps {
  name: string;
  owner: string;
  avatarUrl: string;
  isPrivate: boolean;
  isFork: boolean;
}

export const RepositoryHeader: React.FC<RepositoryHeaderProps> = ({
  name,
  owner,
  avatarUrl,
  isPrivate,
  isFork,
}) => {
  const theme = useTheme();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.owner} numberOfLines={1}>
          {owner}
        </Text>
        <View style={styles.badges}>
          {isPrivate && (
            <View style={styles.badge}>
              <Ionicons name="lock-closed" size={12} color={theme.colors.text.tertiary} />
              <Text style={styles.badgeText}>Private</Text>
            </View>
          )}
          {isFork && (
            <View style={styles.badge}>
              <Ionicons name="git-branch" size={12} color={theme.colors.text.tertiary} />
              <Text style={styles.badgeText}>Fork</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
