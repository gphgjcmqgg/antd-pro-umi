export interface IFootBtn {
  title?: string;
  icon?: string;
  onClick?: () => void;
  type?: 'primary' | 'default' | 'danger';
}