import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "src/hooks/useTheme";
import { useStyles } from "./RepositoryLinks.styles";

interface RepositoryLinksProps {
  htmlUrl: string;
  homepage?: string | null;
}

export const RepositoryLinks: React.FC<RepositoryLinksProps> = ({
  htmlUrl,
  homepage,
}) => {
  const theme = useTheme();
  const styles = useStyles();

  const handleOpenLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Links</Text>

      <TouchableOpacity
        style={styles.link}
        onPress={() => handleOpenLink(htmlUrl)}
        activeOpacity={0.7}
      >
        <View style={styles.iconContainer}>
          <Ionicons name="logo-github" size={22} color={theme.colors.text.primary} />
        </View>
        <View style={styles.linkInfo}>
          <Text style={styles.linkLabel}>View on GitHub</Text>
          <Text style={styles.linkUrl} numberOfLines={1}>
            {htmlUrl}
          </Text>
        </View>
        <Ionicons name="open-outline" size={20} color={theme.colors.text.tertiary} />
      </TouchableOpacity>

      {homepage && (
        <TouchableOpacity
          style={styles.link}
          onPress={() => handleOpenLink(homepage)}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="globe" size={22} color={theme.colors.text.primary} />
          </View>
          <View style={styles.linkInfo}>
            <Text style={styles.linkLabel}>Homepage</Text>
            <Text style={styles.linkUrl} numberOfLines={1}>
              {homepage}
            </Text>
          </View>
          <Ionicons name="open-outline" size={20} color={theme.colors.text.tertiary} />
        </TouchableOpacity>
      )}
    </View>
  );
};
