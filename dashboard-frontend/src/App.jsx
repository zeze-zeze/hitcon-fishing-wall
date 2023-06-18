import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [dashboard, setDashboard] = useState({});
  useEffect(() => {
    const categories = ["fish", "ctf", "badge", "geocaching"];
    categories.forEach((category) => {
      axios.get(`/api/v1/dashboard?category=${category}`).then((resp) => {
        console.log(resp.data);
        setDashboard((prev) => {
          return { ...prev, [category]: resp.data };
        });
      });
    });
  }, []);

  return (
    <>
      <pre>{JSON.stringify(dashboard, null, 2)}</pre>
    </>
  );
}

export default App;
