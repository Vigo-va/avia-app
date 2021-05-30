import React from 'react';
import departure from '../assets/images/icons/departures.svg';
import arrival from '../assets/images/icons/arrivals.svg';

export const Segments = (props) => {
  return (
    <>
      <div className={'segments'}>
        <div className={'flight-roadmap'}>
          <div className={'departure-city'}>
            {props.segment.departureInfo.city},{' '}
            {props.segment.departureInfo.airport}{' '}
            <span className={'airport-uid'}>
              ({props.segment.departureInfo.airportUid})
            </span>
          </div>
          <div className={'flight-icons'}>
            <img src={departure} className={'icons'} />
            {props.segment.transfer ? (
              <span className={'transfer'}>1 пересадка</span>
            ) : (
              <></>
            )}
            <span className="divider" />
            <img src={arrival} className={'icons'} />
          </div>
          <div className={'arrival-city'}>
            {props.segment.arrivalInfo.city},{' '}
            {props.segment.arrivalInfo.airport}{' '}
            <span className={'airport-uid'}>
              ({props.segment.arrivalInfo.airportUid})
            </span>
          </div>
        </div>
        <div className={'flight-info'}>
          <div className="flight-departure-info">
            <div className="departure-time">
              {props.segment.departureInfo.date.time}
            </div>
            <div className="departure-date">
              {props.segment.departureInfo.date.day}
            </div>
          </div>
          <div className="flight-duration">
            <div className={'time'}>
              {props.duration.hours} ч {props.duration.minutes} мин
            </div>
          </div>
          <div className="flight-arrival-info">
            <div className="arrival-time">
              {props.segment.arrivalInfo.date.time}
            </div>
            <div className="arrival-date">
              {props.segment.arrivalInfo.date.day}
            </div>
          </div>
        </div>
        <div className={'footer'}>
          <div className={'flight-carrier'}>
            Рейс выполняет: {props.segment.airline}
          </div>
        </div>
      </div>
    </>
  );
};
