// Home splash screen to display general information about the app.

import React from 'react';
import { Jumbotron } from 'reactstrap';
import {ReactComponent as LogoSVG} from '../airplane-logo.svg';
import ZipcodeSearchBox from './ZipcodeSearchBox';

const Home = (props) => {
  return (
    <div>
      <Jumbotron className='jumbotron'>
        <LogoSVG style={{height: '33vh'}}/>
        <h1 className="display-3 centerText">Fly with confidence.</h1>
        <p className="lead centerText">Solutions for the model aircraft enthusiast</p>
        <hr className="my-2" />
        <p className="centerText">Your aircraft. Your airfields. Know where, when, and what to fly. Never get caught unprepared on a perfect flying day again!</p>
        <ZipcodeSearchBox path='/search-location' buttonText='See Current Weather'></ZipcodeSearchBox>
      </Jumbotron>
    </div>
  );
};

export default Home;