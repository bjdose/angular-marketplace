export interface MenuLink {
  label: string;
  action: () => void;
  visible: () => boolean;
}
