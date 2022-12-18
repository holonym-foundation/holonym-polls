import Image from "next/image";
import HolonymLogo from "img/Holonym-Logo-W.png";

export default function Footer() {
  return (
    <>
      <div id="footer">
        <h4 className="header-text" style={{ display: "flex" }}>
          Made with{" "}
          <div style={{ marginLeft: "5px", marginRight: "4px", marginTop: "1px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              style={{ width: "12px" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>{" "}
            by{" "}
          </div>
          <a href="https://holonym.id" target="_blank" rel="noopener noreferrer">
            Holonym
            {/* <Image src={HolonymLogo} alt="Holonym Logo" width={100} priority /> */}
          </a>
        </h4>
      </div>
    </>
  );
}
