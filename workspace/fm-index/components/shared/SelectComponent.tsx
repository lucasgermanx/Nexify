import { Select, SelectItem } from "@nextui-org/react";

export const SelectComponent = ({items, label, placeholder}:any) => {
  return (
    <>
      <Select
        items={items}
        label={label}
        labelPlacement="outside"
        placeholder={placeholder}
        className="w-full"
      >
        {(items:any) => <SelectItem key={items.value}>{items.label}</SelectItem>}
      </Select>
    </>
  );
};
