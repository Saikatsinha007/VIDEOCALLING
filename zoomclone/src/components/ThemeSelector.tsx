import { EuiThemeColorMode } from "@elastic/eui";
import React, { Suspense, useEffect, useState } from "react";
// React.lazy() is a function that allows us to render dynamic imports in the same way as regular components. 
//Using dynamic imports alongside the React.
//lazy() will enable us to import a component just before it renders on a screen. 
const LightTheme = React.lazy(() => import("./Themes/LightTheme"));
const DarkTheme = React.lazy(() => import("./Themes/DarkTheme"));

export default function ThemeSelector({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<EuiThemeColorMode>("light");
  useEffect(() => {
    const theme = localStorage.getItem("zoom-theme");
    if (theme) {
      setTheme(theme as EuiThemeColorMode);
    }
  }, []);

  return (
    <>

    {/*  <Suspense> component that lets you “wait” for some code to load 
    and declaratively specify a loading state (like a spinner) while we’re waiting: */}
      <Suspense fallback={<></>}>
        {theme === "dark" ? <DarkTheme /> : <LightTheme />}
      </Suspense>
      {children}
    </>
  );
}