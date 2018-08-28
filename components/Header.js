import React from 'react';
import {Image} from 'semantic-ui-react';
import {Link} from '../routes';

export default() => {
  return (
    <div className="header">
      <Image src="/static/header.png"/>
      <style jsx="jsx">
        {
          ` .header {
            width: 600px;
            height: 200px;
            top: 3%;
            border-radius: 0 40px 40px 0;
            position: fixed;
            z-index: 2;
            border-left: 0;
            border: 1px solid black;
            box-shadow: 20px 0 30px 0 rgba(60,60,60);
          }
          `
        }</style>
    </div>
  );
}
