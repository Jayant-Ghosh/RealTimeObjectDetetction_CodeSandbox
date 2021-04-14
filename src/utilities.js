export const drawRectangle = (detections, ctx) => {
  // Loop through each prediction of objects in realtime
  detections.forEach((prediction) => {
    // Extract boxes and classes
    const [x, y, width, height] = prediction["bbox"];
    const text = prediction["class"];
    //const color = Math.floor(Math.random() * 16777215).toString(16);
    var color;
    if (text === "Person") {
      // Set styling
      //color = Math.floor(10).toString(16);
      color = "#66ff66";
    } else if (text === "Bottle" || text === "bottle") {
      color = "#4d4dff"; //Math.floor(1000).toString(16);
    } else if (text === "Book" || text === "book") {
      color = "#ffff00"; //Math.floor(1000).toString(16);
    }
    //  ctx.strokeStyle = "#" + color;

    ctx.strokeStyle = color;
    ctx.font = "24px Arial";
    ctx.beginPath();
    // ctx.fillStyle = "#" + color;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
    ctx.rect(x, y, width, height);
    ctx.stroke();
    // Draw rectangles and text
    // color = Math.floor(24).toString(16);
    
  });
};
