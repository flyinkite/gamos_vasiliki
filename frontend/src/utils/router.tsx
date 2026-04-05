import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { NotFound } from "../components/NotFound";
import { Index } from "../components/Index";
import { Information } from "../components/Information";
import { WeddingRSVPForm } from "../components/WeddingRSVPForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Index />, // keep landing page
      },
      {
        path: "/information",
        element: <Information />, // keep info page
      },
      {
        path: "/rsvp",
        element: <WeddingRSVPForm />, // your new form
      },
    ],
  },
]);