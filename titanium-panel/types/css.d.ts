// Allow importing plain CSS files (global and CSS modules) in TypeScript
declare module '*.css';
declare module '*.scss';
declare module '*.sass';
// For CSS modules with default export of class map
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}
