import React from "react";

export default function QuantenComputingUiPreview() {
  return (
    <div className={"md:flex justify-between space-y-5 md:space-y-0"}>
      <PreviewComponent
        title={"Learn Quantum Computing from the start"}
        scr={"/images/getting-started-screen.svg"}
      />
      <PreviewComponent
        title={"Run intuitive experiments"}
        scr={"/images/add-screen.svg"}
      />
      <PreviewComponent
        title={"Get Results for your Experiments"}
        scr={"/images/loading-screen.svg"}
      />
    </div>
  );
}

function PreviewComponent(props: { title: string; scr: string }) {
  return (
    <div className={"text-center w-full space-y-4"}>
      <embed className={"w-full h-auto"} src={props.scr} />
      <p className={"font-bold text-lg"}>{props.title}</p>
    </div>
  );
}
