import { Dropdown, DropdownItem } from "flowbite-react";

function Test() {
  return (
    <>
      <Dropdown label="Dropdown button" dismissOnClick={false}>
        <DropdownItem>Dashboard</DropdownItem>
        <DropdownItem>Settings</DropdownItem>
        <DropdownItem>Earnings</DropdownItem>
        <DropdownItem>Sign out</DropdownItem>
      </Dropdown>

      <button className="text-"></button>
    </>
  );
}

export default Test;
