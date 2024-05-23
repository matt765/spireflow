import { useTooltip } from "../../../hooks/useTooltip";

export const useNavbarTooltips = () => {
  const paletteTooltip = useTooltip();
  const languageTooltip = useTooltip();
  const userTooltip = useTooltip();

  return {
    paletteTooltip,
    languageTooltip,
    userTooltip,
  };
};
