import HidingResetButton from "./HidingResetButton";
import Message from "./Message";

export default function Header() {
  return (
    <div className="Header">
      <Message />
      <HidingResetButton />
    </div>
  );
}
