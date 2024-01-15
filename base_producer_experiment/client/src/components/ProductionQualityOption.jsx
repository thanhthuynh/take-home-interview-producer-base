import React from "react";
import { Button } from "./Button";

export default function ProductionQualityOption({ title, imageUrl, cost, quality, on_button_click }) {
    return (
      <div className="h-50 w-50 pb-6">
        <div
          className="h-full w-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage:imageUrl
              //"url(https://media.istockphoto.com/id/638349734/photo/ttoothpaste-containers-on-white-isolated-background.jpg?s=612x612&w=0&k=20&c=eF1XyMlRaQLI9ETehA3_7En5_3D41GX7FKb8cIWeP8k=)",
              //"url(https://i.ibb.co/fF6mWV6/toothpastehigh.jpg)"
              //"url(/root/bucode/empirica-dev/sverre_experiment_test_claims/client/public/images/toothpaseamazing.jpg)" 
              //"url(/images/toothpaseamazing.jpg)"
              //"url(/images/toothpasestandard.jpg)"

          }}
          alt={title}
        />
        <div className="flex">
          <h2>{title}. <br/> {quality} quality
          {/*cost*/} </h2>
        </div>
        <Button handleClick={on_button_click} adQuality={quality} primary>
          💸 Produce this quality at a cost of ${cost} per unit
            </Button>
      </div>
    );
}