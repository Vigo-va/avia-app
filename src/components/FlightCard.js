import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
// Icons
import baggageIconFree from '../assets/images/icons/suitcase-free.svg';
import baggageIconPaid from '../assets/images/icons/suitcase-paid.svg';
import baggageIconOff from '../assets/images/icons/suitcase-off.svg';

import exchangeIconFree from '../assets/images/icons/exchange-free.svg';
import exchangeIconPaid from '../assets/images/icons/exchange-paid.svg';
import exchangeIconOff from '../assets/images/icons/exchange-off.svg';

import refundIconFree from '../assets/images/icons/refund-free.svg';
import refundIconPaid from '../assets/images/icons/refund-paid.svg';
import refundIconOff from '../assets/images/icons/refund-off.svg';

import { Segments } from './Segments';
import { ServicesStatusIcon } from './ServicesStatusIcon';

export const FlightCard = (props) => {
  const [baggageInfo, setBaggageInfo] = useState(false);
  const [exchangeInfo, setExchangeInfo] = useState(false);
  const [refundInfo, setRefundInfo] = useState(false);

  const showBaggageInfo = (e) => {
    setBaggageInfo((prev) => !prev);
    let name = 'services-statuses-info-baggage';
    let statusUid = e.currentTarget.getAttribute('data-uid');
    let baggage = e.currentTarget.getElementsByClassName(name);
    if (statusUid === 'FREE') {
      baggageInfo
        ? (baggage[0].className = `${name} hidden`)
        : (baggage[0].className = `${name}`);
    } else if (statusUid === 'PAID') {
      baggageInfo
        ? (baggage[0].className = `${name} paid hidden`)
        : (baggage[0].className = `${name} paid`);
    } else {
      baggageInfo
        ? (baggage[0].className = `${name} off hidden`)
        : (baggage[0].className = `${name} off`);
    }
  };

  const showExchangeInfo = (e) => {
    let name = 'services-statuses-info-exchange';
    let statusUid = e.currentTarget.getAttribute('data-uid');
    setExchangeInfo((prev) => !prev);
    let exchange = e.currentTarget.getElementsByClassName(name);
    if (statusUid === 'FREE') {
      exchangeInfo
        ? (exchange[0].className = `${name} hidden`)
        : (exchange[0].className = `${name}`);
    } else if (statusUid === 'PAID') {
      exchangeInfo
        ? (exchange[0].className = `${name} paid hidden`)
        : (exchange[0].className = `${name} paid`);
    } else {
      exchangeInfo
        ? (exchange[0].className = `${name} off hidden`)
        : (exchange[0].className = `${name} off`);
    }
  };

  const showRefundInfo = (e) => {
    let name = 'services-statuses-info-refund';
    let statusUid = e.currentTarget.getAttribute('data-uid');
    setRefundInfo((prev) => !prev);
    let refund = e.currentTarget.getElementsByClassName(name);
    if (statusUid === 'FREE') {
      refundInfo
        ? (refund[0].className = `${name} hidden`)
        : (refund[0].className = `${name}`);
    } else if (statusUid === 'PAID') {
      refundInfo
        ? (refund[0].className = `${name} paid hidden`)
        : (refund[0].className = `${name} paid`);
    } else {
      refundInfo
        ? (refund[0].className = `${name} off hidden`)
        : (refund[0].className = `${name} off`);
    }
  };

  const days = ['Вс.', 'Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.'];
  const months = [
    'Янв.',
    'Фев.',
    'Мар.',
    'Апр.',
    'Май',
    'Июн.',
    'Июл.',
    'Авг.',
    'Сен.',
    'Окт.',
    'Ноя.',
    'Дек.',
  ];

  const data = props.data.map((item, i) => {
    let carrierName = item.flight.carrier.caption;
    let totalPrice = item.flight.price.total.amount;
    let priceSign = item.flight.price.total.currency;
    let servicesStatus = {
      baggageStatus: {
        uid: item.flight.servicesStatuses.baggage.uid,
        caption: item.flight.servicesStatuses.baggage.caption,
      },
      exchangeStatus: {
        uid: item.flight.servicesStatuses.exchange.uid,
        caption: item.flight.servicesStatuses.exchange.caption,
      },
      refundStatus: {
        uid: item.flight.servicesStatuses.refund.uid,
        caption: item.flight.servicesStatuses.refund.caption,
      },
    };

    let firstSegmentDuration = {};
    let secondSegmentDuration = {};
    const getSegmentDuration = (leg, i) => {
      let hours =
        (Math.floor(leg.duration / 60) < 10 ? '0' : '') +
        Math.floor(leg.duration / 60);
      let minutes =
        (Math.floor(leg.duration % 60) < 10 ? '0' : '') +
        Math.floor(leg.duration % 60);
      if (i === 0) {
        firstSegmentDuration = {
          hours,
          minutes,
        };
      } else {
        secondSegmentDuration = {
          hours,
          minutes,
        };
      }
    };

    let firstSegment = {
      transfer: false,
      airline: '',
      arrivalInfo: {
        city: '',
        airport: '',
        airportUid: '',
        date: {
          time: '',
          day: '',
        },
      },
      departureInfo: {
        city: '',
        airport: '',
        airportUid: '',
        date: {
          time: '',
          day: '',
        },
      },
    };
    let secondSegment = {
      transfer: false,
      airline: '',
      arrivalInfo: {
        city: '',
        airport: '',
        airportUid: '',
        date: {
          time: '',
          day: '',
        },
      },
      departureInfo: {
        city: '',
        airport: '',
        airportUid: '',
        date: {
          time: '',
          day: '',
        },
      },
    };

    const getSegment = (segment, i, length, segmentName) => {
      let arrivalDate = new Date(segment.arrivalDate);
      let departureDate = new Date(segment.departureDate);
      let airline = segment.airline.caption;
      let arrivalCity = segment.arrivalCity
        ? segment.arrivalCity.caption
        : 'Нет данных';
      let arrivalAirport = segment.arrivalAirport.caption;
      let arrivalAirportUid = segment.arrivalAirport.uid;
      let arrivalTime = `${
        (arrivalDate.getHours() < 10 ? '0' : '') + arrivalDate.getHours()
      }:${
        (arrivalDate.getMinutes() < 10 ? '0' : '') + arrivalDate.getMinutes()
      }`;
      let arrivalDay = `${arrivalDate.getDate()} ${
        months[arrivalDate.getMonth()]
      } ${days[arrivalDate.getDay()]}`;
      let departureCity = segment.departureCity
        ? segment.departureCity.caption
        : 'Нет данных';
      let departureAirport = segment.departureAirport.caption;
      let departureAirportUid = segment.departureAirport.uid;
      let departureTime = `${
        (departureDate.getHours() < 10 ? '0' : '') + departureDate.getHours()
      }:${
        (departureDate.getMinutes() < 10 ? '0' : '') +
        departureDate.getMinutes()
      }`;
      let departureDay = `${departureDate.getDate()} ${
        months[departureDate.getMonth()]
      } ${days[departureDate.getDay()]}`;

      if (length === 1) {
        if (segmentName === 'first') {
          return (firstSegment = {
            transfer: false,
            airline: airline,
            arrivalInfo: {
              city: arrivalCity,
              airport: arrivalAirport,
              airportUid: arrivalAirportUid,
              date: {
                time: arrivalTime,
                day: arrivalDay,
              },
            },
            departureInfo: {
              city: departureCity,
              airport: departureAirport,
              airportUid: departureAirportUid,
              date: {
                time: departureTime,
                day: departureDay,
              },
            },
          });
        } else {
          return (secondSegment = {
            transfer: false,
            airline: airline,
            arrivalInfo: {
              city: arrivalCity,
              airport: arrivalAirport,
              airportUid: arrivalAirportUid,
              date: {
                time: arrivalTime,
                day: arrivalDay,
              },
            },
            departureInfo: {
              city: departureCity,
              airport: departureAirport,
              airportUid: departureAirportUid,
              date: {
                time: departureTime,
                day: departureDay,
              },
            },
          });
        }
      } else if (length !== 1 && i === 0) {
        if (segmentName === 'first') {
          firstSegment.transfer = true;
          firstSegment.airline = airline;
          firstSegment.departureInfo = {
            city: departureCity,
            airport: departureAirport,
            airportUid: departureAirportUid,
            date: {
              time: departureTime,
              day: departureDay,
            },
          };
        } else {
          secondSegment.transfer = true;
          secondSegment.airline = airline;
          secondSegment.departureInfo = {
            city: departureCity,
            airport: departureAirport,
            airportUid: departureAirportUid,
            date: {
              time: departureTime,
              day: departureDay,
            },
          };
        }
      } else if (length !== 1 && i === 1) {
        if (segmentName === 'first') {
          firstSegment.arrivalInfo = {
            city: arrivalCity,
            airport: arrivalAirport,
            airportUid: arrivalAirportUid,
            date: {
              time: arrivalTime,
              day: arrivalDay,
            },
          };
        } else {
          secondSegment.arrivalInfo = {
            city: arrivalCity,
            airport: arrivalAirport,
            airportUid: arrivalAirportUid,
            date: {
              time: arrivalTime,
              day: arrivalDay,
            },
          };
        }
      }
    };

    item.flight.legs.map((leg, i) => {
      if (i === 0) {
        getSegmentDuration(leg, i);
        return leg.segments.map((segment, i) => {
          getSegment(segment, i, leg.segments.length, 'first');
        });
      } else {
        getSegmentDuration(leg, i);
        return leg.segments.map((segment, i) => {
          getSegment(segment, i, leg.segments.length, 'second');
        });
      }
    });
    return (
      <Col md={12} className={'flight-card'} key={i}>
        <div className={'header'}>
          <div className={'logo'}>{carrierName}</div>
          <div className={'services-statuses'}>
            <ServicesStatusIcon
              uid={servicesStatus.baggageStatus.uid}
              showHandler={showBaggageInfo}
              style={'services-statuses-info-baggage'}
              iconFree={baggageIconFree}
              iconPaid={baggageIconPaid}
              iconOff={baggageIconOff}
              caption={servicesStatus.baggageStatus.caption}
            />

            <ServicesStatusIcon
              uid={servicesStatus.exchangeStatus.uid}
              showHandler={showExchangeInfo}
              style={'services-statuses-info-exchange'}
              iconFree={exchangeIconFree}
              iconPaid={exchangeIconPaid}
              iconOff={exchangeIconOff}
              caption={servicesStatus.exchangeStatus.caption}
            />

            <ServicesStatusIcon
              uid={servicesStatus.refundStatus.uid}
              showHandler={showRefundInfo}
              style={'services-statuses-info-refund'}
              iconFree={refundIconFree}
              iconPaid={refundIconPaid}
              iconOff={refundIconOff}
              caption={servicesStatus.refundStatus.caption}
            />
            <div className="price">
              {totalPrice} <span className={'price-uid'}>{priceSign}</span>
            </div>
          </div>
        </div>
        <Row className={'legs'}>
          <Segments segment={firstSegment} duration={firstSegmentDuration} />
          <Segments segment={secondSegment} duration={secondSegmentDuration} />
          <div className={'choose-btn'}>
            <Button className={'legs-btn'}>Выбрать</Button>
          </div>
        </Row>
      </Col>
    );
  });
  return <Row>{data}</Row>;
};
