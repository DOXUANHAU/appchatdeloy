import { infinity } from "ldrs";
infinity.register();
function InfinityComponent() {
  return (
    <section style={{ marginLeft: "1rem" }}>
      <l-infinity
        size="55"
        stroke="4"
        stroke-length="0.15"
        bg-opacity="0.1"
        speed="1.3"
        color="black"
      ></l-infinity>
    </section>
  );
}
export default InfinityComponent;
