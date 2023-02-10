import React from "react";
import styled from "@emotion/styled";
const Introbackground = styled.div`
  width: 100vw;
  height: 50vh;
  background-attachment: fixed;
  background-image: url(https://s.yimg.com/ny/api/res/1.2/YB1e4CbH2fDeQ00AIf5HVQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTYyOQ--/https://media.zenfs.com/en/gotv_ctitv_com_tw_678/9c4a4f69d3ede2b2680663ed75eba9ac);
  background-color: blue;
`;
const Introbody = styled.div`
  width: 100vw;
  height: 200vh;
  background-color: red;
`;
export default function IntroPage() {
  return (
    <Introbody>
      <Introbackground>Intro</Introbackground>
    </Introbody>
  );
}
