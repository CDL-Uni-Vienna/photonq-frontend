import React from "react";
import MaxWidthContainer from "../Layout/MaxWidthContainer";

export default function Footer() {
  return (
    <footer
      className={
        "flex justify-center bg-primary text-white py-10 px-8 md:px-16"
      }
    >
      <MaxWidthContainer>
        <address>
          <p className={"font-bold"}>
            Department of Physics of the University of Vienna
          </p>
          <p>Boltzmanngasse 5, 1090 Vienna</p>
          <p>+43-1-4277-510 10</p>
          <p>dekanat.physik@univie.ac.at</p>
        </address>
      </MaxWidthContainer>
    </footer>
  );
}
