import Footer from "./Components/Footer";
import Header from "./Components/Header";
import "../../public/css/tailwind-ecommerce.css"
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "MayBell - Online Store",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer/>
        <Header />
          {children}
        <Footer />
      </body>
    </html>
  );
}