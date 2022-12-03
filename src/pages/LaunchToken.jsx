import React from "react";
import { UploadImage } from "../components/UploadImage";
import { useWeb3 } from "../store/web3_store";

export function LaunchToken() {
  const [url, seturl] = React.useState();
  return (
    <div className="container">
      <UploadImage seturl={seturl} />
      <div className="grid grid-cols-8 w-full">
        <div className="info-card col-span-5 mb-2"></div>
        <div className="info-card col-span-3">2</div>

        <div className="info-card col-span-5 mb-2">5</div>
        <div className="info-card col-span-3">2</div>
        <div className="info-card col-span-5 mb-2">5</div>
        <div className="info-card col-span-3">2</div>
      </div>
    </div>
  );
}

// <div className="grid-area">
// <div className="info-card rea-1">1</div>
// <div className="info-card area-2">2</div>
// <div className="info-card area-3">3</div>
// <div className="info-card area-4">4</div>
// <div className="info-card area-5">55555</div>
// <div className="info-card area-6">6</div>
//{" "}
// </div>
