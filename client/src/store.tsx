import { applyMiddleware, createStore } from 'redux';

import rootReducer from './reducers';

import thunk from 'redux-thunk';

const w: any = window as any;
const devtools: any = w.devToolsExtension
  ? w.devToolsExtension()
  : (f: any) => f;
const middleware = applyMiddleware(thunk);
const store: any = middleware(devtools(createStore))(rootReducer);

export default store;
