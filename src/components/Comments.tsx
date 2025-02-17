import * as React from "react";
import Giscus from "@giscus/react";
import { useEffect, useState } from "react";

const id = "inject-comments";

const Comments = () => {
  const [mounted, setMounted] = React.useState(false);

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );

  useEffect(() => {
    const handleThemeChange = (event) => {
      setTheme(event.detail);
    };

    window.addEventListener("themeChange", handleThemeChange);

    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
    };
  }, []);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div id={id} className="w-full">
      {mounted ? (
        <Giscus
          id={id}
          repo="manpreeeeeet/home"
          repoId="R_kgDONOhsTA"
          category="General"
          categoryId="DIC_kwDONOhsTM4CnDXZ"
          mapping="pathname"
          reactionsEnabled="0"
          emitMetadata="0"
          inputPosition="top"
          lang="en"
          theme={theme === "light" || theme === "dark" ? theme : "dark"}
        />
      ) : null}
    </div>
  );
};

export default Comments;
