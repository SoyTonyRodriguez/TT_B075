import React from "react";
import Header from "./components/Header";
import MainContent from "./pages/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <MainContent className="flex-grow" />
      <Footer />
    </div>
  );
}

export default App;
