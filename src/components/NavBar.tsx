import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  return (
    <div className="flex justify-between">
      <div>
        <p>Garden Waste Management</p>
      </div>
      <div className="flex justify-center">
        <p>Postcode</p>
        <p>Waste Type</p>
        <p>Select Skip</p>
        <p>Permit Check</p>
        <p>Choose Date</p>
        <p>Payment</p>
      </div>
      <ThemeToggle />
    </div>
  );
};

export default NavBar;
