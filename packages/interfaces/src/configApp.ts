export interface ColorsAdmin {
  topLogoContainer: string;
  headerTop: string;
  textColor: string;
  textSubtitleSidebar: string;
  hoverNavToggle: string;
  sidebarContainer: string;
  sidebarItemHover: string;
  sidebarItemDropdown: string;
  sidebarDropdownCollapsedContainer: string;
  loaderColor: string;
  backgroundHome: string;
  isThemed: boolean;
  isThemeDarkLogin: boolean;
  isHeaderTop: boolean;
}

export interface ConfigApp {
  colorsAdmin: Partial<ColorsAdmin>;
  chatGptKey: string;
  emailPort?: number;
  emailHost?: string;
  emailUser?: string;
  emailPassword?: string;
  emailFrom?: string;
  emailName?: string;
  emailSecure?: string;
}

export interface ConfigAppDto extends Partial<ConfigApp> {}
