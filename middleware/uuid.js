import {v5 as uuidv5} from 'uuid';
const customNamespace = 'my-custom-namespace-hello-kitty';
const namespaceArray = customNamespace.split('').map(c => c.charCodeAt(0));
export const  generateUUID = () => {
  return uuidv5(namespaceArray, uuidv5.URL)
}
