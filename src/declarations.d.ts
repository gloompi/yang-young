declare global {
  namespace NodeJS {
    interface Global {
      XMLHttpRequest: Document;
    } 
  }
}