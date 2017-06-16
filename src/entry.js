//entry.js

import React from 'react';
import {render} from 'react-dom';
import initReactFastClick from 'react-fastclick';
import Test from './component/Test.js';

initReactFastClick();

render(<Test/>, document.querySelector('#App'));
