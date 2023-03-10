import { Routes, Route } from "react-router-dom";
import { ViewDeveloper } from "./pages/Developers/components/ViewDeveloper";
import { IndexDevelopers } from "./pages/Developers/index";
import { IndexLevels } from "./pages/Levels";

export function Content() {
  return (
    <Routes>
      <Route path="/" element={<IndexDevelopers />} />
      <Route path="/levels" element={<IndexLevels />} />
      <Route path="/viewDeveloper/:id" element={<ViewDeveloper />} />
      <Route
        path="*"
        element={
          <>
            <h1>404</h1>
          </>
        }
      />
    </Routes>
  );
}
