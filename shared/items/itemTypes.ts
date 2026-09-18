export type ItemType =
  | "dextrose";

export type ItemTypeConfig = {
  name: string;
  stackable: boolean;
  maxStack: number;
};

export const itemTypes: Record<
  ItemType,
  ItemTypeConfig
> = {
  dextrose: {
    name: "Dextrose",
    stackable: true,
    maxStack: 12,
  },
};