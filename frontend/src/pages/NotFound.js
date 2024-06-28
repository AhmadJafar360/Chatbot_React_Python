import React from "react";

function NotFound() {
  return (
    <div>
      <section className="h-100 w-100 bg-light" id="not-found">
        <div className="empty-4-5 container mx-auto d-flex align-items-center justify-content-center flex-column">
          <img className="main-img img-fluid" src="./images/404.webp" alt="main" />

          <div className="text-center w-100">
            <h1 className="title-text text-black">Opss! Something Missing</h1>
            <p className="title-caption text-dark">
              The page you're looking for isn't found. We
              <div className="d-sm-block d-none">suggest you Back to Homepage.</div>
            </p>
            <div className="d-flex justify-content-center">
              <a href="/" className="btn btn-back btn-primary d-inline-flex text-white" role={"button"}>
                Back to Homepage
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotFound;
