import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "src/hooks/useTheme";
import { useStyles } from "./RepositoryAbout.styles";

interface RepositoryAboutProps {
  language: string | null;
  license?: string;
  topics: string[];
  createdAt: string;
  updatedAt: string;
  defaultBranch: string;
  size?: number;
}

export const RepositoryAbout: React.FC<RepositoryAboutProps> = ({
  language,
  license,
  topics,
  createdAt,
  updatedAt,
  defaultBranch,
  size,
}) => {
  const theme = useTheme();
  const styles = useStyles();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatSize = (bytes?: number): string => {
    if (!bytes) return "0 KB";
    return `${(bytes / 1024).toFixed(2)} MB`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>

      {language && (
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <Ionicons name="code-slash" size={18} color={theme.colors.text.tertiary} />
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>Language</Text>
            <Text style={styles.value}>{language}</Text>
          </View>
        </View>
      )}

      {license && (
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <Ionicons name="document-text" size={18} color={theme.colors.text.tertiary} />
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>License</Text>
            <Text style={styles.value}>{license}</Text>
          </View>
        </View>
      )}

      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Ionicons name="git-branch" size={18} color={theme.colors.text.tertiary} />
        </View>
        <View style={styles.info}>
          <Text style={styles.label}>Default Branch</Text>
          <Text style={styles.value}>{defaultBranch}</Text>
        </View>
      </View>

      {size !== undefined && (
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <Ionicons name="cloud-download" size={18} color={theme.colors.text.tertiary} />
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>Size</Text>
            <Text style={styles.value}>{formatSize(size)}</Text>
          </View>
        </View>
      )}

      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Ionicons name="calendar" size={18} color={theme.colors.text.tertiary} />
        </View>
        <View style={styles.info}>
          <Text style={styles.label}>Created</Text>
          <Text style={styles.value}>{formatDate(createdAt)}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Ionicons name="time" size={18} color={theme.colors.text.tertiary} />
        </View>
        <View style={styles.info}>
          <Text style={styles.label}>Last Updated</Text>
          <Text style={styles.value}>{formatDate(updatedAt)}</Text>
        </View>
      </View>

      {topics.length > 0 && (
        <View style={styles.topicsContainer}>
          <Text style={styles.topicsLabel}>Topics ({topics.length})</Text>
          <View style={styles.topics}>
            {topics.map((topic, index) => (
              <View key={index} style={styles.topic}>
                <Text style={styles.topicText}>{topic}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

