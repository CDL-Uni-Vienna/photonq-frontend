import clsx from "clsx";
import React from "react";
import MaxWidthContainer from "../Layout/MaxWidthContainer";
import { useRouter } from "next/router";
import Link from "next/link";

interface FooterProps {
  alwaysAtBottom?: boolean;
}

export default function Footer({ alwaysAtBottom }: FooterProps) {
  const router = useRouter();
  return (
    <footer
      className={clsx(
        "w-screen flex justify-center bg-primary text-white py-10 px-8 md:px-16",
        {
          "absolute bottom-0 left-0": alwaysAtBottom,
        }
      )}
    >
      <MaxWidthContainer>
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0">
          <div>
            <p className={"font-bold"}>Links</p>
            <div className="flex space-x-14">
              <div className="flex flex-col space-y-4 mt-3">
                <a onClick={() => router.push("/")} className="cursor-pointer">
                  Home
                </a>
                <a
                  className="cursor-pointer"
                  onClick={() => router.push("/login")}
                >
                  Sign in
                </a>
                <a
                  className="cursor-pointer"
                  onClick={() => router.push("/register")}
                >
                  Register
                </a>
              </div>
              <div className="flex flex-col space-y-4 mt-3">
                <a
                  className="cursor-pointer"
                  onClick={() => router.push("/how-to-guides")}
                >
                  Documentation
                </a>
                <a
                  className="cursor-pointer"
                  onClick={() => router.push("/legal")}
                >
                  Terms & Conditions
                </a>
                <a
                  className="cursor-pointer"
                  onClick={() => router.push("/impressum")}
                >
                  Impressum
                </a>
              </div>
            </div>
          </div>
          <div>
            <p className={"font-bold"}>Partners</p>
            <div className="flex space-x-14">
              <div className="flex flex-col space-y-4 mt-3">
                <Link href="https://www.cdg.ac.at/">
                  <a target="_blank" className="cursor-pointer">
                    Christian Doppler Forschungsgesellschaft (CDG)
                  </a>
                </Link>
                <Link href="https://www.univie.ac.at/">
                  <a target="_blank" className="cursor-pointer">
                    University of Vienna
                  </a>
                </Link>
                <Link href="https://www.tencent.com/">
                  <a target="_blank" className="cursor-pointer">
                    Tencent Mobility Limited
                  </a>
                </Link>
              </div>
              {/*}
              <div className="flex flex-col space-y-4 mt-3">
                <Link href="https://www.univie.ac.at/">
                  <a target="_blank" className="cursor-pointer">
                    Partner 3
                  </a>
                </Link>
                <Link href="https://www.univie.ac.at/">
                  <a target="_blank" className="cursor-pointer">
                    Partner 4
                  </a>
                </Link>{" "}
                <Link href="https://www.univie.ac.at/">
                  <a target="_blank" className="cursor-pointer">
                    Partner 5
                  </a>
                </Link>
              </div>
      */}
            </div>
          </div>
          <address>
            <p className={"font-bold"}>
              PhotonQ is brought to you by
            </p>
            <p>Christian Doppler Laboratory for Photonic Quantum Computing</p>
            <p>Walther Group</p>
            <p>Faculty of Physics, University of Vienna</p>
          </address>
        </div>
        <hr className="my-4" />
        <div className="flex">
          <p>Copyright © 2022 Walther Group, Faculty of Physics, University of Vienna. All rights reserved.</p>
        </div>
      </MaxWidthContainer>
    </footer>
  );
}
