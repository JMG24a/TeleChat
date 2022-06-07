import React from "react";
import { Dashboard as Main } from "@containers/Dashboard";

// export const getStaticProps = async () => {
//   const res = await fetch("http://localhost:3001/api/v1/chats/", {
//     method: "GET",
//     headers: {
//       authorization: "hello",
//     },
//   });

//   const es = await res.json();
//   console.log(es);

//   return {
//     props: {
//       products: es,
//     },
//   };
// };

function Dashboard() {
  return (
    <>
      <Main />
    </>
  );
}

export default Dashboard;
