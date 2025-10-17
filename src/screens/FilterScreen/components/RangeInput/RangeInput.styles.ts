import { createStyles } from 'src/utils/createStyles';

export const useStyles = createStyles((theme) => ({
  container: {
    marginBottom: 8,
  },
  label: {
    fontSize: theme.fonts.size.lg,
    fontWeight: theme.fonts.weight.semibold,
    color: theme.colors.text.primary,
    marginBottom: 16,
  },
  rangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputWrapper: {
    flex: 1,
  },
  inputLabel: {
    fontSize: theme.fonts.size.sm,
    color: theme.colors.text.secondary,
    marginBottom: 8,
  },
  separator: {
    fontSize: theme.fonts.size.lg,
    color: theme.colors.text.secondary,
    marginHorizontal: 12,
    marginTop: 20,
  },
  input: {
    backgroundColor: theme.colors.input.background,
    borderWidth: 1,
    borderColor: theme.colors.input.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: theme.fonts.size.md,
    color: theme.colors.text.primary,
  },
}));

