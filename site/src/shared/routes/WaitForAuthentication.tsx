"use client";
import { useAuthStore } from "@/store";
import useIsCSR from "@/utils/hooks/useIsCSR";
import RenderIf from "@teslo/react-ui/RenderIf";
import * as React from "react";
import Loader from "../Loader";

interface IWaitForAuthenticationProps {
  children: React.ReactNode;
}

const WaitForAuthentication: React.FunctionComponent<IWaitForAuthenticationProps> = (props) => {
  const { loading } = useAuthStore();
  const isCSR = useIsCSR();

  return (
    <React.Fragment>
      <RenderIf isTrue={loading}>
        <Loader loading={true} />
      </RenderIf>
      <RenderIf isTrue={!loading && isCSR}>{props.children}</RenderIf>
    </React.Fragment>
  );
};

export default WaitForAuthentication;
