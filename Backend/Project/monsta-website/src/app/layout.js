import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./commanComponents/Header";
import Footer from "./commanComponents/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import { Provider } from 'react-redux';
import { store } from './ReduxToolkit/store';
import MainLayout from './MainLayout';
import { ToastContainer } from 'react-toastify';

export const metadata = {
  title: "Home",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainLayout>
          <ToastContainer/>
          <Header />
          {children}
          <Footer />
        </MainLayout>
      </body>
    </html>
  );
}
