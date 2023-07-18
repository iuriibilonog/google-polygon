import "./App.css";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import PaintPolygon from "./components/PaintPolygon/PaintPolygon";

function App() {
  // window.initMap = PaintPolygon;

  return (
    <div className="App">
      <Wrapper apiKey={"AIzaSyC2SUyRUGe693dVqxdlv7XAry-UIaT-uHM"}>
        <PaintPolygon />
      </Wrapper>
    </div>
  );
}

export default App;
