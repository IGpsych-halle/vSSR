import "./Inventory.css";

import icdInventory from "../../assets/ui/icd/icd_inventory.png";

type InventoryProps = {
  isOpen: boolean;
};

export function Inventory({
  isOpen,
}: InventoryProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="inventory-overlay">
      <img
        className="inventory-background"
        src={icdInventory}
        alt=""
        draggable={false}
      />
    </div>
  );
}