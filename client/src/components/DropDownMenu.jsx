import { Dropdown } from "flowbite-react";
import { IoIosMenu } from "react-icons/io";
import { Link } from "react-router-dom";

export function DropDownMenu() {
  return (
    <Dropdown label=""  dismissOnClick={false} renderTrigger={() => <div>{<IoIosMenu className="w-6 h-6"/>}</div>}>
      <Dropdown.Item>
      <Link to='/'>
        Home
      </Link>
      </Dropdown.Item>
      <Dropdown.Item>
      <Link to='/about'>
        About
      </Link>
      </Dropdown.Item>
      <Dropdown.Item>
      <Link to='/projects'>
        Projects
      </Link>
      </Dropdown.Item>
    </Dropdown>
  );
}
