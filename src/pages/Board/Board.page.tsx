import Canvas from "../../components/Canvas/Canvas.component";
import Tools from "../../components/Tools/Tools.component";

export default function Board() {
  return (
    <main className={"flex"}>
      <Canvas />
      <Tools />
    </main>
  );
}
