declare module '*.svg?inline' {
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}

declare module '*.svg?sprite' {
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}
