import { trefoil } from "ldrs";

trefoil.register();
function TrefoilComponent(props) {
  return (
    <l-trefoil
      size="40"
      stroke="4"
      stroke-length="0.15"
      bg-opacity="0.1"
      speed="1.4"
      color="black"
    ></l-trefoil>
  );
}
export default TrefoilComponent;
