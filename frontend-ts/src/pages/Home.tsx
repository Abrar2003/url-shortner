import React, { useState } from "react";
import Form2 from "../components/Form2";
import "../components/form2.css";
import axios from "axios";
import StickyButton from "../components/StickyButton";
import { Link } from "react-router-dom";
import CopyButton from "../components/CopyButton";
const server=import.meta.env.VITE_SERVER

interface FormData {
  originalUrl: string;
  title: string;
  description: string;
  expiring: string;
}

const Home: React.FC = () => {
  const [output, setOutput] = useState<string>("");

  const handleGenerate = async (formData: FormData) => {
    try {
      const { originalUrl, title, description, expiring } = formData;
      const res = await axios.post(`${server}/short`, {
        original_url: originalUrl,
        title,
        description,
        expiration_date: expiring,
      });
      setOutput(res.data.short_url);
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="login-root">
      <div
        className="box-root flex-flex flex-direction--column"
        style={{ minHeight: "100vh", flexGrow: 1 }}
      >
        <div className="loginbackground box-background--white padding-top--64">
          <div className="loginbackground-gridContainer">
            <div
              className="box-root flex-flex"
              style={{ gridArea: "top / start / 8 / end" }}
            >
              <div
                className="box-root"
                style={{
                  backgroundImage:
                    "linear-gradient(white 0%, rgb(247, 250, 252) 33%)",
                  flexGrow: 1,
                }}
              ></div>
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: "4 / 2 / auto / 5" }}
            >
              <div
                className="box-root box-divider--light-all-2 animationLeftRight tans3s"
                style={{ flexGrow: 1 }}
              />
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: "6 / start / auto / 2" }}
            >
              <div
                className="box-root box-background--blue800"
                style={{ flexGrow: 1 }}
              />
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: "7 / start / auto / 4" }}
            >
              <div
                className="box-root box-background--blue animationLeftRight"
                style={{ flexGrow: 1 }}
              />
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: "8 / 4 / auto / 6" }}
            >
              <div
                className="box-root box-background--gray100 animationLeftRight tans3s"
                style={{ flexGrow: 1 }}
              />
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: "2 / 15 / auto / end" }}
            >
              <div
                className="box-root box-background--cyan200 animationRightLeft tans4s"
                style={{ flexGrow: 1 }}
              />
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: "3 / 14 / auto / end" }}
            >
              <div
                className="box-root box-background--blue animationRightLeft"
                style={{ flexGrow: 1 }}
              />
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: "4 / 17 / auto / 20" }}
            >
              <div
                className="box-root box-background--gray100 animationRightLeft tans4s"
                style={{ flexGrow: 1 }}
              />
            </div>
            <div
              className="box-root flex-flex"
              style={{ gridArea: "5 / 14 / auto / 17" }}
            >
              <div
                className="box-root box-divider--light-all-2 animationRightLeft tans3s"
                style={{ flexGrow: 1 }}
              />
            </div>
          </div>
        </div>
        <div
          className="box-root padding-top--24 flex-flex flex-direction--column"
          style={{ flexGrow: 1, zIndex: 9 }}
        >
          <Form2
            onGenerate={(formData: FormData) => handleGenerate(formData)}
          />
          {output ? (
          <>
            <div className="w-5/12 mx-auto bg-white rounded-lg shadow-lg border border-gray-300">
              <pre className="flex flex-col justify-center items-center gap-2 p-2">
                <span className="text-xl font-bold font-serif">
                  Hurray, Shorted Link Generated
                </span>
                <div className="flex items-center gap-4 p-2">
                  <a className="text-blue-600 underline text-lg" href={output} target="blank">{output}</a>
                  <CopyButton textToCopy={output} />
                </div>
              </pre>
            </div>
          </>
          ) : null}
          <Link to={"/all-urls"}>
            <StickyButton onClick={scrollToTop} label="All URL's" />
          </Link>
        </div>
      </div>
      {/* Integrate the StickyButton component */}
    </div>
  );
};

export default Home;
