import { createStyles } from 'src/utils/createStyles';

export const useStyles = createStyles((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: theme.colors.core.primary,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: theme.fonts.size.md,
    color: theme.colors.text.primary,
  },
}));

