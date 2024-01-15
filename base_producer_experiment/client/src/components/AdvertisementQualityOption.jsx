import React from "react";
import { Button } from "./Button";

export default function AdvertisementQualityOption({ title, imageUrl, quality, on_button_click }) {
    return (
      <div className="h-50 w-50 pb-6">
        <div
          className="h-full w-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage:
              imageUrl
              //"url(https://media.istockphoto.com/id/638349734/photo/ttoothpaste-containers-on-white-isolated-background.jpg?s=612x612&w=0&k=20&c=eF1XyMlRaQLI9ETehA3_7En5_3D41GX7FKb8cIWeP8k=)",
          }}
          alt={title}
        />
        <div className="flex">
          <h2>{title}. <br/> </h2>
          {/*{price} points per unit sold</h2>*/}
        </div>
        <Button handleClick={on_button_click} adQuality={quality} primary>
          📣 Advertise as {quality} quality
            </Button>
      </div>
    );
  }