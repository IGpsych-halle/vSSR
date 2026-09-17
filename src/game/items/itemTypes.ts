export type ItemType =
  | "dextrose";


export type ItemTypeConfig = {
  name: string;

  texture: string;

  stackable: boolean;
  maxStack: number;
};


export const itemTypes: Record<
  ItemType,
  ItemTypeConfig
> = {

  dextrose: {
    name: "Dextrose",

    texture: "dextrose",

    stackable: true,
    maxStack: 12,
  },

};