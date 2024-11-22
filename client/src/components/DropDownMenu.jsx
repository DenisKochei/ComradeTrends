import { Dropdown } from "flowbite-react";
import { IoIosMenu } from "react-icons/io";
import { Link } from "react-router-dom";

export function DropDownMenu() {
  return (
    <Dropdown
      label=""
      dismissOnClick={false}
      renderTrigger={() => <div>{<IoIosMenu className="w-6 h-6" />}</div>}
    >
      <Dropdown.Item>
        <Link to="/">Home</Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Link to="/about">About Us</Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Link to="/contacts">Contacts</Link>
      </Dropdown.Item>
    </Dropdown>
  );
}
