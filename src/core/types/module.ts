import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  children?: Omit<NavItem, "children">[];
}

export interface SettingsCard {
  component: ComponentType;
  order: number;
}

export interface FlowModule {
  id: string;
  name: string;
  version: string;
  nav: NavItem;
  settingsCards: SettingsCard[];
}