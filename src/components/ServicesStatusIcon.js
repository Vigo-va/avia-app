import React from 'react';

export const ServicesStatusIcon = (props) => {
  if (props.uid === 'FREE') {
    return (
      <i
        data-uid={props.uid}
        onMouseEnter={props.showHandler}
        onMouseLeave={props.showHandler}
      >
        <img className={'icons'} src={props.iconFree} alt={'icon'} />
        <div className={`${props.style} hidden`}>{props.caption}</div>
      </i>
    );
  } else if (props.uid === 'PAID') {
    return (
      <i
        data-uid={props.uid}
        onMouseEnter={props.showHandler}
        onMouseLeave={props.showHandler}
      >
        <img className={'icons'} src={props.iconPaid} alt={'icon'} />
        <div className={`${props.style} paid hidden`}>{props.caption}</div>
      </i>
    );
  } else {
    return (
      <i
        data-uid={props.uid}
        onMouseEnter={props.showHandler}
        onMouseLeave={props.showHandler}
      >
        <img className={'icons'} src={props.iconOff} alt={'icon'} />
        <div className={`${props.style} off hidden`}>{props.caption}</div>
      </i>
    );
  }
};
