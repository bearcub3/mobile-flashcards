/* @flow */
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { applyMiddleware } from 'redux';

export default applyMiddleware<any, any, any>(thunk, logger);
