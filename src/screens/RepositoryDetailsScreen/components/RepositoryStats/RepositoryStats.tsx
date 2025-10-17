import React from "react";
import { View } from "react-native";
import { StatTile } from "src/components/StatTile/StatTile";
import { useTheme } from "src/hooks/useTheme";
import { useStyles } from "./RepositoryStats.styles";

interface RepositoryStatsProps {
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
}

export const RepositoryStats: React.FC<RepositoryStatsProps> = ({
  stars,
  forks,
  watchers,
  openIssues,
}) => {
  const theme = useTheme();
  const styles = useStyles();

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <View style={styles.container}>
      <StatTile
        icon="star"
        value={formatNumber(stars)}
        label="Stars"
        iconColor={theme.colors.core.warning || "#FF9500"}
      />
      <StatTile
        icon="git-branch"
        value={formatNumber(forks)}
        label="Forks"
        iconColor={theme.colors.text.tertiary || "#8E8E93"}
      />
      <StatTile
        icon="eye"
        value={formatNumber(watchers)}
        label="Watchers"
        iconColor={theme.colors.text.tertiary || "#8E8E93"}
      />
      <StatTile
        icon="alert-circle"
        value={formatNumber(openIssues)}
        label="Issues"
        iconColor={theme.colors.text.tertiary || "#8E8E93"}
      />
    </View>
  );
};

