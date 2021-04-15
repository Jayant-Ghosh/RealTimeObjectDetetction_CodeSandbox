// Import dependencies
import React, { useRef } from "react";
import * as cocossd from "@tensorflow-models/coco-ssd";
import WebCam from "react-webcam";
import "./App.css";
import { drawRectangle } from "./utilities";
import "react-cam";

// Main function for Application
function App() {
  const webcamref = useRef(null);
  const canvasref = useRef(null);

  const runCoco = async () => {
    const net = await cocossd.load();
    console.log("Detection for Realtime Objects ");
    //  Loop and detect objects for realtime
    setInterval(() => {
      detect(net);
    }, 10);
  };
  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamref.current !== "undefined" &&
      webcamref.current !== null &&
      webcamref.current.video.readyState === 4
    ) {
      // Get Video Properties for Video WebCamera
      const video = webcamref.current.video;
      const videoWidth = webcamref.current.video.videoWidth;
      const videoHeight = webcamref.current.video.videoHeight;

      // Set video width and height for webcam

      webcamref.current.video.width = videoWidth;
      webcamref.current.video.height = videoHeight;

      // Set canvas height and width for video
      canvasref.current.width = videoWidth;
      canvasref.current.height = videoHeight;

      // Make Detections
      const obj = await net.detect(video);
      console.log(obj);

      // Draw mesh for Rectangle
      const ctx = canvasref.current.getContext("2d");
      drawRectangle(obj, ctx);
    }
  };

  runCoco();

  return (
    <div className="App">
      <header className="App-header">
        <WebCam
          ref={webcamref}
          muted={true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 320,
            height: 240
          }}
        />
        <canvas
          ref={canvasref}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 150,
            height: 200
          }}
        />
      </header>
    </div>
  );
}

export default App;
