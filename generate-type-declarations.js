// This script generates types for FeatherIcon and named icon components
// and save as build/index.d.ts.
// Example:
/*
import type { FC, SVGProps } from "react";

export type FeatherIconName = 
  | "activity"
  | "airplay"
  // --snip--
  | "zoom-out";

export interface FeatherNamedIconProps extends SVGProps<SVGElement> {
  size?: string | number;
}

export interface FeatherIconProps extends FeatherNamedIconProps {
  icon: FeatherIconName;
}

declare const FeatherIcon: FC<FeatherIconProps>;
export default FeatherIcon;

export type Icon = FC<FeatherNamedIconProps>;
export declare const Activity: Icon;
export declare const Airplay: Icon;
// --snip--
export declare const ZoomOut: Icon;
*/

const fs = require("fs");

const dashCasetoTitleCase = (inputString) =>
  inputString
    .toLowerCase()
    .replace(/(?:^|[\s-/])\w/g, (match) => match.toUpperCase())
    .replace(/-/g, "");

const iconsText = fs.readFileSync("src/icons.json");
const iconsJson = JSON.parse(iconsText);
const icons = Object.keys(iconsJson);

const featherIconName = icons.reduce((names, name) => {
  return names + `  | "${name}"\n`;
}, "");
const namedIconDeclarations = icons.reduce((declarations, name) => {
  return (
    declarations + `export declare const ${dashCasetoTitleCase(name)}: Icon;\n`
  );
}, "");

const content = `
import type { FC, SVGProps } from "react";

export type FeatherIconName = 
${featherIconName};

export interface FeatherNamedIconProps extends SVGProps<SVGElement> {
  size?: string | number;
}

export interface FeatherIconProps extends FeatherNamedIconProps {
  icon: FeatherIconName;
}

declare const FeatherIcon: FC<FeatherIconProps>;
export default FeatherIcon;

export type Icon = FC<FeatherNamedIconProps>;
${namedIconDeclarations}
`;

fs.writeFile("build/index.d.ts", content, (err) => {
  if (err) throw err;
});

console.log("Finished generating index.d.ts.");
