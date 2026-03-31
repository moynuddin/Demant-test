import { useState } from "react";
import SignupModal from "./components/SignupModal";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="center">
        <div>
          <h1>Get started</h1>
          <p>Sign up to stay informed about the latest Demant products.</p>
        </div>
        <button className="show-modal-btn" onClick={() => setIsModalOpen(true)}>
          Show modal
        </button>
      </section>

      {isModalOpen && <SignupModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}

export default App;
