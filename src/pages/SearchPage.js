import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import flightsData from '../flights.json';
import { FlightCard } from '../components/FlightCard';
import { Filter } from '../components/Filter';
import notFound from '../assets/images/icons/no-result.svg';

export const SearchPage = (props) => {
  const [data, setData] = useState([]);
  const [bestFlightData, setBestFlightData] = useState([]);
  const [dataClone, setDataClone] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [currentCount, setCurrentCount] = useState(5);

  const [withTransfers, setWithTransfers] = useState(false);
  const [withoutTransfers, setWithoutTransfers] = useState(false);
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');

  const [checked, setChecked] = useState({
    LO: false,
    BT: false,
    AF: false,
    KL: false,
    SN: false,
    TK: false,
    SU: false,
    AZ: false,
    AY: false,
    PC: false,
  });

  const check = (e) => {
    let key = e.currentTarget.getAttribute('data-airlinecode');
    let value = Object.entries(checked).some((key) => {
      if (key[0] === e.currentTarget.getAttribute('data-airlinecode')) {
        return !key[1];
      }
    });
    setChecked({
      ...checked,
      [key]: value,
    });
  };

  const filterByAirline = () => {
    scrollToTop();
    const airlineCode = Object.keys(checked).filter((key) => {
      return checked[key];
    });
    if (!priceFrom && !priceTo && !withTransfers && !withoutTransfers) {
      if (airlineCode.length === 0) {
        setDefault();
      } else if (airlineCode.length >= 1) {
        const filteredData = data.filter((flight) => {
          if (
            airlineCode.some((code) => {
              return code === Object.values(flight)[1].carrier.airlineCode;
            })
          ) {
            return flight;
          }
        });
        setCurrentCount(5);
        setDataClone(filteredData);
        setDisplayedData(filteredData.slice(0, 5));
      }
    } else if (withTransfers) {
      filterWithTransfers();
    } else if (withoutTransfers) {
      filterWithoutTransfers();
    } else {
      onPriceSearch();
    }
  };

  const setDefault = () => {
    setDataClone(data);
    setDisplayedData(data.slice(0, 5));
    setCurrentCount(5);
    console.log('default');
    scrollToTop();
  };

  const fromChangeHandler = (e) => {
    setPriceFrom(e.currentTarget.value);
  };

  const toChangeHandler = (e) => {
    setPriceTo(e.currentTarget.value);
  };

  const onPriceSearch = () => {
    scrollToTop();
    const airlineCode = Object.keys(checked).filter((key) => {
      return checked[key];
    });
    if (priceFrom && priceTo) {
      if (withTransfers || withoutTransfers) {
        if (withTransfers) {
          const filteredData = data.filter((flight) => {
            if (
              Object.values(flight)[1].legs[0].segments.length > 1 &&
              Object.values(flight)[1].legs[1].segments.length > 1 &&
              +Object.values(flight)[1].price.total.amount > +priceFrom &&
              +Object.values(flight)[1].price.total.amount < +priceTo
            ) {
              return flight;
            }
          });
          if (airlineCode.length >= 1) {
            const filteredDataWithAirline = filteredData.filter((flight) => {
              if (
                airlineCode.some((code) => {
                  return code === Object.values(flight)[1].carrier.airlineCode;
                })
              ) {
                return flight;
              }
            });
            setCurrentCount(5);
            setDataClone(filteredDataWithAirline);
            setDisplayedData(filteredDataWithAirline.slice(0, 5));
            console.log(filteredDataWithAirline);
            console.log(
              'doing filter with transfer and from to and with airline'
            );
          } else {
            setCurrentCount(5);
            setDataClone(filteredData);
            setDisplayedData(filteredData.slice(0, 5));
            console.log(filteredData);
            console.log('doing filter with transfer and from to');
          }
        } else if (withoutTransfers) {
          const filteredData = data.filter((flight) => {
            if (
              Object.values(flight)[1].legs[0].segments.length < 2 &&
              Object.values(flight)[1].legs[1].segments.length < 2 &&
              +Object.values(flight)[1].price.total.amount > +priceFrom &&
              +Object.values(flight)[1].price.total.amount < +priceTo
            ) {
              return flight;
            }
          });
          if (airlineCode.length >= 1) {
            const filteredDataWithAirline = filteredData.filter((flight) => {
              if (
                airlineCode.some((code) => {
                  return code === Object.values(flight)[1].carrier.airlineCode;
                })
              ) {
                return flight;
              }
            });
            setCurrentCount(5);
            setDataClone(filteredDataWithAirline);
            setDisplayedData(filteredDataWithAirline.slice(0, 5));
            console.log(filteredDataWithAirline);
            console.log(
              'doing filter with transfer and from to and with airline'
            );
          } else {
            setCurrentCount(5);
            setDataClone(filteredData);
            setDisplayedData(filteredData.slice(0, 5));
            console.log(filteredData);
            console.log('doing filter with transfer and from to');
          }
        }
      } else {
        const filteredData = data.filter((flight) => {
          if (
            +Object.values(flight)[1].price.total.amount > +priceFrom &&
            +Object.values(flight)[1].price.total.amount < +priceTo
          ) {
            return flight;
          }
        });
        if (airlineCode.length >= 1) {
          const filteredDataWithAirline = filteredData.filter((flight) => {
            if (
              airlineCode.some((code) => {
                return code === Object.values(flight)[1].carrier.airlineCode;
              })
            ) {
              return flight;
            }
          });
          setCurrentCount(5);
          setDataClone(filteredDataWithAirline);
          setDisplayedData(filteredDataWithAirline.slice(0, 5));
          console.log(filteredDataWithAirline);
          console.log(
            'doing filter with transfer and from to and with airline'
          );
        } else {
          setCurrentCount(5);
          setDataClone(filteredData);
          setDisplayedData(filteredData.slice(0, 5));
          console.log(filteredData);
          console.log('doing filter with transfer and from to');
        }
      }
    } else if (priceFrom && !priceTo) {
      if (withTransfers || withoutTransfers) {
        if (withTransfers) {
          const filteredData = data.filter((flight) => {
            if (
              Object.values(flight)[1].legs[0].segments.length > 1 &&
              Object.values(flight)[1].legs[1].segments.length > 1 &&
              +Object.values(flight)[1].price.total.amount > +priceFrom
            ) {
              return flight;
            }
          });
          if (airlineCode.length >= 1) {
            const filteredDataWithAirline = filteredData.filter((flight) => {
              if (
                airlineCode.some((code) => {
                  return code === Object.values(flight)[1].carrier.airlineCode;
                })
              ) {
                return flight;
              }
            });
            setCurrentCount(5);
            setDataClone(filteredDataWithAirline);
            setDisplayedData(filteredDataWithAirline.slice(0, 5));
            console.log(filteredDataWithAirline);
            console.log(
              'doing filter with transfer and from to and with airline'
            );
          } else {
            setCurrentCount(5);
            setDataClone(filteredData);
            setDisplayedData(filteredData.slice(0, 5));
            console.log(filteredData);
            console.log('doing filter with transfer and from');
          }
        } else if (withoutTransfers) {
          const filteredData = data.filter((flight) => {
            if (
              Object.values(flight)[1].legs[0].segments.length < 2 &&
              Object.values(flight)[1].legs[1].segments.length < 2 &&
              +Object.values(flight)[1].price.total.amount > +priceFrom
            ) {
              return flight;
            }
          });
          if (airlineCode.length >= 1) {
            const filteredDataWithAirline = filteredData.filter((flight) => {
              if (
                airlineCode.some((code) => {
                  return code === Object.values(flight)[1].carrier.airlineCode;
                })
              ) {
                return flight;
              }
            });
            setCurrentCount(5);
            setDataClone(filteredDataWithAirline);
            setDisplayedData(filteredDataWithAirline.slice(0, 5));
            console.log(filteredDataWithAirline);
            console.log(
              'doing filter with transfer and from to and with airline'
            );
          } else {
            setCurrentCount(5);
            setDataClone(filteredData);
            setDisplayedData(filteredData.slice(0, 5));
            console.log(filteredData);
            console.log('doing filter with transfer and from');
          }
        }
      } else {
        const filteredData = data.filter((flight) => {
          if (+Object.values(flight)[1].price.total.amount > +priceFrom) {
            return flight;
          }
        });
        if (airlineCode.length >= 1) {
          const filteredDataWithAirline = filteredData.filter((flight) => {
            if (
              airlineCode.some((code) => {
                return code === Object.values(flight)[1].carrier.airlineCode;
              })
            ) {
              return flight;
            }
          });
          setCurrentCount(5);
          setDataClone(filteredDataWithAirline);
          setDisplayedData(filteredDataWithAirline.slice(0, 5));
          console.log(filteredDataWithAirline);
          console.log(
            'doing filter with transfer and from to and with airline'
          );
        } else {
          setCurrentCount(5);
          setDataClone(filteredData);
          setDisplayedData(filteredData.slice(0, 5));
          console.log(filteredData);
          console.log('doing filter with transfer and from to');
        }
      }
    } else if (priceTo && !priceFrom) {
      if (withTransfers || withoutTransfers) {
        if (withTransfers) {
          const filteredData = data.filter((flight) => {
            if (
              Object.values(flight)[1].legs[0].segments.length > 1 &&
              Object.values(flight)[1].legs[1].segments.length > 1 &&
              +Object.values(flight)[1].price.total.amount < +priceTo
            ) {
              return flight;
            }
          });
          if (airlineCode.length >= 1) {
            const filteredDataWithAirline = filteredData.filter((flight) => {
              if (
                airlineCode.some((code) => {
                  return code === Object.values(flight)[1].carrier.airlineCode;
                })
              ) {
                return flight;
              }
            });
            setCurrentCount(5);
            setDataClone(filteredDataWithAirline);
            setDisplayedData(filteredDataWithAirline.slice(0, 5));
            console.log(filteredDataWithAirline);
            console.log(
              'doing filter with transfer and from to and with airline'
            );
          } else {
            setCurrentCount(5);
            setDataClone(filteredData);
            setDisplayedData(filteredData.slice(0, 5));
            console.log(filteredData);
            console.log('doing filter with transfer and from');
          }
        } else if (withoutTransfers) {
          const filteredData = data.filter((flight) => {
            if (
              Object.values(flight)[1].legs[0].segments.length < 2 &&
              Object.values(flight)[1].legs[1].segments.length < 2 &&
              +Object.values(flight)[1].price.total.amount < +priceTo
            ) {
              return flight;
            }
          });
          if (airlineCode.length >= 1) {
            const filteredDataWithAirline = filteredData.filter((flight) => {
              if (
                airlineCode.some((code) => {
                  return code === Object.values(flight)[1].carrier.airlineCode;
                })
              ) {
                return flight;
              }
            });
            setCurrentCount(5);
            setDataClone(filteredDataWithAirline);
            setDisplayedData(filteredDataWithAirline.slice(0, 5));
            console.log(filteredDataWithAirline);
            console.log(
              'doing filter with transfer and from to and with airline'
            );
          } else {
            setCurrentCount(5);
            setDataClone(filteredData);
            setDisplayedData(filteredData.slice(0, 5));
            console.log(filteredData);
            console.log('doing filter with transfer and from');
          }
        }
      } else {
        const filteredData = data.filter((flight) => {
          if (+Object.values(flight)[1].price.total.amount < +priceTo) {
            return flight;
          }
        });
        if (airlineCode.length >= 1) {
          const filteredDataWithAirline = filteredData.filter((flight) => {
            if (
              airlineCode.some((code) => {
                return code === Object.values(flight)[1].carrier.airlineCode;
              })
            ) {
              return flight;
            }
          });
          setCurrentCount(5);
          setDataClone(filteredDataWithAirline);
          setDisplayedData(filteredDataWithAirline.slice(0, 5));
          console.log(filteredDataWithAirline);
          console.log(
            'doing filter with transfer and from to and with airline'
          );
        } else {
          setCurrentCount(5);
          setDataClone(filteredData);
          setDisplayedData(filteredData.slice(0, 5));
          console.log(filteredData);
          console.log('doing filter with transfer and from to');
        }
      }
    } else if (!priceFrom && !priceTo) {
      if (withTransfers || withoutTransfers) {
        if (withTransfers) {
          const filteredData = data.filter((flight) => {
            if (
              Object.values(flight)[1].legs[0].segments.length > 1 &&
              Object.values(flight)[1].legs[1].segments.length > 1
            ) {
              return flight;
            }
          });
          if (airlineCode.length >= 1) {
            const filteredDataWithAirline = filteredData.filter((flight) => {
              if (
                airlineCode.some((code) => {
                  return code === Object.values(flight)[1].carrier.airlineCode;
                })
              ) {
                return flight;
              }
            });
            setCurrentCount(5);
            setDataClone(filteredDataWithAirline);
            setDisplayedData(filteredDataWithAirline.slice(0, 5));
            console.log(filteredDataWithAirline);
            console.log(
              'doing filter with transfer and from to and with airline'
            );
          } else {
            setCurrentCount(5);
            setDataClone(filteredData);
            setDisplayedData(filteredData.slice(0, 5));
            console.log(filteredData);
            console.log('doing filter with transfer and from to');
          }
        } else if (withoutTransfers) {
          const filteredData = data.filter((flight) => {
            if (
              Object.values(flight)[1].legs[0].segments.length < 2 &&
              Object.values(flight)[1].legs[1].segments.length < 2
            ) {
              return flight;
            }
          });
          if (airlineCode.length >= 1) {
            const filteredDataWithAirline = filteredData.filter((flight) => {
              if (
                airlineCode.some((code) => {
                  return code === Object.values(flight)[1].carrier.airlineCode;
                })
              ) {
                return flight;
              }
            });
            setCurrentCount(5);
            setDataClone(filteredDataWithAirline);
            setDisplayedData(filteredDataWithAirline.slice(0, 5));
            console.log(filteredDataWithAirline);
            console.log(
              'doing filter with transfer and from to and with airline'
            );
          } else {
            setCurrentCount(5);
            setDataClone(filteredData);
            setDisplayedData(filteredData.slice(0, 5));
            console.log(filteredData);
            console.log('doing filter with transfer and from to');
          }
        }
      } else {
        setDefault();
      }
    }
  };

  const filterWithTransfers = () => {
    const airlineCode = Object.keys(checked).filter((key) => {
      return checked[key];
    });
    if (priceFrom && priceTo && !withTransfers) {
      const filteredData = data.filter((flight) => {
        if (
          Object.values(flight)[1].legs[0].segments.length > 1 &&
          Object.values(flight)[1].legs[1].segments.length > 1 &&
          +Object.values(flight)[1].price.total.amount > +priceFrom &&
          +Object.values(flight)[1].price.total.amount < +priceTo
        ) {
          return flight;
        }
      });
      if (airlineCode.length >= 1) {
        const filteredDataWithAirline = filteredData.filter((flight) => {
          if (
            airlineCode.some((code) => {
              return code === Object.values(flight)[1].carrier.airlineCode;
            })
          ) {
            return flight;
          }
        });
        setCurrentCount(5);
        setDataClone(filteredDataWithAirline);
        setDisplayedData(filteredDataWithAirline.slice(0, 5));
        console.log(filteredDataWithAirline);
        console.log('doing filter with transfer and from to and with airline');
      } else {
        setCurrentCount(5);
        setDataClone(filteredData);
        setDisplayedData(filteredData.slice(0, 5));
        console.log(filteredData);
        console.log('doing filter with transfer and from to');
      }
    } else if (priceFrom && !withTransfers) {
      const filteredData = data.filter((flight) => {
        if (
          Object.values(flight)[1].legs[0].segments.length > 1 &&
          Object.values(flight)[1].legs[1].segments.length > 1 &&
          +Object.values(flight)[1].price.total.amount > +priceFrom
        ) {
          return flight;
        }
      });
      if (airlineCode.length >= 1) {
        const filteredDataWithAirline = filteredData.filter((flight) => {
          if (
            airlineCode.some((code) => {
              return code === Object.values(flight)[1].carrier.airlineCode;
            })
          ) {
            return flight;
          }
        });
        setCurrentCount(5);
        setDataClone(filteredDataWithAirline);
        setDisplayedData(filteredDataWithAirline.slice(0, 5));
        console.log(filteredDataWithAirline);
        console.log('doing filter with transfer and from and with airline');
      } else {
        setCurrentCount(5);
        setDataClone(filteredData);
        setDisplayedData(filteredData.slice(0, 5));
        console.log(filteredData);
        console.log('doing filter with transfer and from');
      }
    } else if (priceTo && !withTransfers) {
      const filteredData = data.filter((flight) => {
        if (
          Object.values(flight)[1].legs[0].segments.length > 1 &&
          Object.values(flight)[1].legs[1].segments.length > 1 &&
          +Object.values(flight)[1].price.total.amount < +priceTo
        ) {
          return flight;
        }
      });
      if (airlineCode.length >= 1) {
        const filteredDataWithAirline = filteredData.filter((flight) => {
          if (
            airlineCode.some((code) => {
              return code === Object.values(flight)[1].carrier.airlineCode;
            })
          ) {
            return flight;
          }
        });
        setCurrentCount(5);
        setDataClone(filteredDataWithAirline);
        setDisplayedData(filteredDataWithAirline.slice(0, 5));
        console.log(filteredDataWithAirline);
        console.log('doing filter with transfer and to and with airline');
      } else {
        setCurrentCount(5);
        setDataClone(filteredData);
        setDisplayedData(filteredData.slice(0, 5));
        console.log(filteredData);
        console.log('doing filter with transfer and to');
      }
    } else if (withTransfers) {
      if (priceFrom && priceTo) {
        const filteredData = data.filter((flight) => {
          if (
            +Object.values(flight)[1].price.total.amount > priceFrom &&
            +Object.values(flight)[1].price.total.amount < priceTo
          ) {
            return flight;
          }
        });
        if (airlineCode.length >= 1) {
          const filteredDataWithAirline = filteredData.filter((flight) => {
            if (
              airlineCode.some((code) => {
                return code === Object.values(flight)[1].carrier.airlineCode;
              })
            ) {
              return flight;
            }
          });
          setCurrentCount(5);
          setDataClone(filteredDataWithAirline);
          setDisplayedData(filteredDataWithAirline.slice(0, 5));
          console.log(filteredDataWithAirline);
          console.log(
            'found data with from to while other filters are disabled and with airline'
          );
        } else {
          setCurrentCount(5);
          setDataClone(filteredData);
          setDisplayedData(filteredData.slice(0, 5));
          console.log(filteredData);
          console.log(
            'found data with from to while other filters are disabled'
          );
        }
      } else if (priceFrom) {
        const filteredData = data.filter((flight) => {
          if (+Object.values(flight)[1].price.total.amount > priceFrom) {
            return flight;
          }
        });
        if (airlineCode.length >= 1) {
          const filteredDataWithAirline = filteredData.filter((flight) => {
            if (
              airlineCode.some((code) => {
                return code === Object.values(flight)[1].carrier.airlineCode;
              })
            ) {
              return flight;
            }
          });
          setCurrentCount(5);
          setDataClone(filteredDataWithAirline);
          setDisplayedData(filteredDataWithAirline.slice(0, 5));
          console.log(filteredDataWithAirline);
          console.log(
            'found data with from while filters and to disabled and with airline'
          );
        } else {
          setCurrentCount(5);
          setDataClone(filteredData);
          setDisplayedData(filteredData.slice(0, 5));
          console.log(filteredData);
          console.log('found data with from while filters and to disabled');
        }
      } else if (priceTo) {
        const filteredData = data.filter((flight) => {
          if (+Object.values(flight)[1].price.total.amount < priceTo) {
            return flight;
          }
        });
        if (airlineCode.length >= 1) {
          const filteredDataWithAirline = filteredData.filter((flight) => {
            if (
              airlineCode.some((code) => {
                return code === Object.values(flight)[1].carrier.airlineCode;
              })
            ) {
              return flight;
            }
          });
          setCurrentCount(5);
          setDataClone(filteredDataWithAirline);
          setDisplayedData(filteredDataWithAirline.slice(0, 5));
          console.log(filteredDataWithAirline);
          console.log(
            'found data with from while filters and to disabled and with airline'
          );
        } else {
          setCurrentCount(5);
          setDataClone(filteredData);
          setDisplayedData(filteredData.slice(0, 5));
          console.log(filteredData);
          console.log('found data with from while filters and from disabled');
        }
      } else {
        if (airlineCode.length >= 1) {
          const filteredDataWithAirline = data.filter((flight) => {
            if (
              airlineCode.some((code) => {
                return code === Object.values(flight)[1].carrier.airlineCode;
              })
            ) {
              return flight;
            }
          });
          setCurrentCount(5);
          setDataClone(filteredDataWithAirline);
          setDisplayedData(filteredDataWithAirline.slice(0, 5));
          console.log(filteredDataWithAirline);
          console.log('stexem?');
        } else {
          setDefault();
          console.log('jest');
        }
      }
    } else {
      const filteredData = data.filter((flight) => {
        if (
          Object.values(flight)[1].legs[0].segments.length > 1 &&
          Object.values(flight)[1].legs[1].segments.length > 1
        ) {
          return flight;
        }
      });
      if (airlineCode.length >= 1) {
        const filteredDataWithAirline = filteredData.filter((flight) => {
          if (
            airlineCode.some((code) => {
              return code === Object.values(flight)[1].carrier.airlineCode;
            })
          ) {
            return flight;
          }
        });
        setCurrentCount(5);
        setDataClone(filteredDataWithAirline);
        setDisplayedData(filteredDataWithAirline.slice(0, 5));
        console.log(filteredDataWithAirline);
        console.log(
          'found data with from while filters and to disabled and with airline'
        );
      } else {
        setCurrentCount(5);
        setDataClone(filteredData);
        setDisplayedData(filteredData.slice(0, 5));
        console.log(filteredData);
        console.log('doing filter with transfer without nothing');
      }
    }
  };

  const filterWithoutTransfers = () => {
    const airlineCode = Object.keys(checked).filter((key) => {
      return checked[key];
    });
    if (priceFrom && priceTo && !withoutTransfers) {
      const filteredData = data.filter((flight) => {
        if (
          Object.values(flight)[1].legs[0].segments.length < 2 &&
          Object.values(flight)[1].legs[1].segments.length < 2 &&
          +Object.values(flight)[1].price.total.amount > +priceFrom &&
          +Object.values(flight)[1].price.total.amount < +priceTo
        ) {
          return flight;
        }
      });
      if (airlineCode.length >= 1) {
        const filteredDataWithAirline = filteredData.filter((flight) => {
          if (
            airlineCode.some((code) => {
              return code === Object.values(flight)[1].carrier.airlineCode;
            })
          ) {
            return flight;
          }
        });
        setCurrentCount(5);
        setDataClone(filteredDataWithAirline);
        setDisplayedData(filteredDataWithAirline.slice(0, 5));
        console.log(filteredDataWithAirline);
        console.log(
          'found data with from while filters and to disabled and with airline'
        );
      } else {
        setCurrentCount(5);
        setDataClone(filteredData);
        setDisplayedData(filteredData.slice(0, 5));
        console.log(filteredData);
        console.log('doing filter with transfer and from to');
      }
    } else if (priceFrom && !withoutTransfers) {
      const filteredData = data.filter((flight) => {
        if (
          Object.values(flight)[1].legs[0].segments.length < 2 &&
          Object.values(flight)[1].legs[1].segments.length < 2 &&
          +Object.values(flight)[1].price.total.amount > +priceFrom
        ) {
          return flight;
        }
      });
      if (airlineCode.length >= 1) {
        const filteredDataWithAirline = filteredData.filter((flight) => {
          if (
            airlineCode.some((code) => {
              return code === Object.values(flight)[1].carrier.airlineCode;
            })
          ) {
            return flight;
          }
        });
        setCurrentCount(5);
        setDataClone(filteredDataWithAirline);
        setDisplayedData(filteredDataWithAirline.slice(0, 5));
        console.log(filteredDataWithAirline);
        console.log(
          'found data with from while filters and to disabled and with airline'
        );
      } else {
        setCurrentCount(5);
        setDataClone(filteredData);
        setDisplayedData(filteredData.slice(0, 5));
        console.log(filteredData);
        console.log('doing filter with transfer and from');
      }
    } else if (priceTo && !withoutTransfers) {
      const filteredData = data.filter((flight) => {
        if (
          Object.values(flight)[1].legs[0].segments.length < 2 &&
          Object.values(flight)[1].legs[1].segments.length < 2 &&
          +Object.values(flight)[1].price.total.amount < +priceTo
        ) {
          return flight;
        }
      });
      if (airlineCode.length >= 1) {
        const filteredDataWithAirline = filteredData.filter((flight) => {
          if (
            airlineCode.some((code) => {
              return code === Object.values(flight)[1].carrier.airlineCode;
            })
          ) {
            return flight;
          }
        });
        setCurrentCount(5);
        setDataClone(filteredDataWithAirline);
        setDisplayedData(filteredDataWithAirline.slice(0, 5));
        console.log(filteredDataWithAirline);
        console.log(
          'found data with from while filters and to disabled and with airline'
        );
      } else {
        setCurrentCount(5);
        setDataClone(filteredData);
        setDisplayedData(filteredData.slice(0, 5));
        console.log(filteredData);
        console.log('doing filter with transfer and to');
      }
    } else if (withoutTransfers) {
      if (priceFrom && priceTo) {
        const filteredData = data.filter((flight) => {
          if (
            +Object.values(flight)[1].price.total.amount > priceFrom &&
            +Object.values(flight)[1].price.total.amount < priceTo
          ) {
            return flight;
          }
        });
        if (airlineCode.length >= 1) {
          const filteredDataWithAirline = filteredData.filter((flight) => {
            if (
              airlineCode.some((code) => {
                return code === Object.values(flight)[1].carrier.airlineCode;
              })
            ) {
              return flight;
            }
          });
          setCurrentCount(5);
          setDataClone(filteredDataWithAirline);
          setDisplayedData(filteredDataWithAirline.slice(0, 5));
          console.log(filteredDataWithAirline);
          console.log(
            'found data with from while filters and to disabled and with airline'
          );
        } else {
          setCurrentCount(5);
          setDataClone(filteredData);
          setDisplayedData(filteredData.slice(0, 5));
          console.log(filteredData);
          console.log(
            'found data with from to while other filters are disabled'
          );
        }
      } else if (priceFrom) {
        const filteredData = data.filter((flight) => {
          if (+Object.values(flight)[1].price.total.amount > priceFrom) {
            return flight;
          }
        });
        if (airlineCode.length >= 1) {
          const filteredDataWithAirline = filteredData.filter((flight) => {
            if (
              airlineCode.some((code) => {
                return code === Object.values(flight)[1].carrier.airlineCode;
              })
            ) {
              return flight;
            }
          });
          setCurrentCount(5);
          setDataClone(filteredDataWithAirline);
          setDisplayedData(filteredDataWithAirline.slice(0, 5));
          console.log(filteredDataWithAirline);
          console.log(
            'found data with from while filters and to disabled and with airline'
          );
        } else {
          setCurrentCount(5);
          setDataClone(filteredData);
          setDisplayedData(filteredData.slice(0, 5));
          console.log(filteredData);
          console.log('found data with from while filters and to disabled');
        }
      } else if (priceTo) {
        const filteredData = data.filter((flight) => {
          if (+Object.values(flight)[1].price.total.amount < priceTo) {
            return flight;
          }
        });
        if (airlineCode.length >= 1) {
          const filteredDataWithAirline = filteredData.filter((flight) => {
            if (
              airlineCode.some((code) => {
                return code === Object.values(flight)[1].carrier.airlineCode;
              })
            ) {
              return flight;
            }
          });
          setCurrentCount(5);
          setDataClone(filteredDataWithAirline);
          setDisplayedData(filteredDataWithAirline.slice(0, 5));
          console.log(filteredDataWithAirline);
          console.log(
            'found data with from while filters and to disabled and with airline'
          );
        } else {
          setCurrentCount(5);
          setDataClone(filteredData);
          setDisplayedData(filteredData.slice(0, 5));
          console.log(filteredData);
          console.log('found data with from while filters and from disabled');
        }
      } else {
        if (airlineCode.length >= 1) {
          const filteredDataWithAirline = data.filter((flight) => {
            if (
              airlineCode.some((code) => {
                return code === Object.values(flight)[1].carrier.airlineCode;
              })
            ) {
              return flight;
            }
          });
          setCurrentCount(5);
          setDataClone(filteredDataWithAirline);
          setDisplayedData(filteredDataWithAirline.slice(0, 5));
          console.log(filteredDataWithAirline);
          console.log(
            'found data with from while filters and to disabled and with airline'
          );
        } else {
          setDefault();
          console.log('jest');
        }
      }
    } else {
      const filteredData = data.filter((flight) => {
        if (
          Object.values(flight)[1].legs[0].segments.length < 2 &&
          Object.values(flight)[1].legs[1].segments.length < 2
        ) {
          return flight;
        }
      });
      if (airlineCode.length >= 1) {
        const filteredDataWithAirline = filteredData.filter((flight) => {
          if (
            airlineCode.some((code) => {
              return code === Object.values(flight)[1].carrier.airlineCode;
            })
          ) {
            return flight;
          }
        });
        setCurrentCount(5);
        setDataClone(filteredDataWithAirline);
        setDisplayedData(filteredDataWithAirline.slice(0, 5));
        console.log(filteredDataWithAirline);
        console.log(
          'found data with from while filters and to disabled and with airline'
        );
      } else {
        setCurrentCount(5);
        setDataClone(filteredData);
        setDisplayedData(filteredData.slice(0, 5));
        console.log(filteredData);
        console.log('doing filter with transfer without nothing');
      }
    }
  };

  const withTransfersChangeHandler = () => {
    scrollToTop();
    filterWithTransfers();
    setWithTransfers((prev) => !prev);
    if (withoutTransfers) {
      setWithoutTransfers((prev) => !prev);
    }
  };

  const withoutTransfersChangeHandler = () => {
    scrollToTop();
    filterWithoutTransfers();
    setWithoutTransfers((prev) => !prev);
    if (withTransfers) {
      setWithTransfers((prev) => !prev);
    }
  };

  const resetFilter = () => {
    setPriceFrom('');
    setPriceTo('');
    setWithTransfers(false);
    setWithoutTransfers(false);
    setChecked({
      LO: false,
      BT: false,
      AF: false,
      KL: false,
      SN: false,
      TK: false,
      SU: false,
      AZ: false,
      AY: false,
      PC: false,
    });
    setDefault();
  };

  const showMore = () => {
    let current = currentCount + 5;
    setDisplayedData(dataClone.slice(0, current));
    setCurrentCount(current);
  };
  // sort
  const sortBy = (order = 'asc') => {
    scrollToTop();
    const airlineCode = Object.keys(checked).filter((key) => {
      return checked[key];
    });
    setCurrentCount(5);
    if (
      withoutTransfers ||
      withTransfers ||
      priceFrom ||
      priceTo ||
      airlineCode.length !== 0
    ) {
      console.log('filter is on');
      let filteredData = dataClone.sort(function (a, b) {
        const varA = +a.flight.price.total.amount;
        const varB = +b.flight.price.total.amount;

        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return order === 'desc' ? comparison * -1 : comparison;
      });
      setDataClone(filteredData);
      setDisplayedData(filteredData.slice(0, 5));
    } else {
      console.log('there is no filter');
      let filteredData = data.sort(function (a, b) {
        const varA = +a.flight.price.total.amount;
        const varB = +b.flight.price.total.amount;

        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return order === 'desc' ? comparison * -1 : comparison;
      });
      setDataClone(filteredData);
      setDisplayedData(filteredData.slice(0, 5));
    }
  };

  const sortByDuration = () => {
    scrollToTop();
    const airlineCode = Object.keys(checked).filter((key) => {
      return checked[key];
    });
    if (
      withoutTransfers ||
      withTransfers ||
      priceFrom ||
      priceTo ||
      airlineCode.length !== 0
    ) {
      console.log('filtered');
      setCurrentCount(5);
      let filteredData = dataClone.sort(function (a, b) {
        const varA = +a.flight.legs[0].duration + +a.flight.legs[1].duration;
        const varB = +b.flight.legs[0].duration + +b.flight.legs[1].duration;

        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return comparison;
      });
      setDataClone(filteredData);
      setDisplayedData(filteredData.slice(0, 5));
    } else {
      console.log('there is no filter');
      setCurrentCount(5);
      let filteredData = data.sort(function (a, b) {
        const varA = +a.flight.legs[0].duration + +a.flight.legs[1].duration;
        const varB = +b.flight.legs[0].duration + +b.flight.legs[1].duration;

        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return comparison;
      });
      setDataClone(filteredData);
      setDisplayedData(filteredData.slice(0, 5));
    }
  };

  // scroll to top button kekw
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(false);
    } else if (scrolled <= 300) {
      setVisible(true);
    }
  };
  window.addEventListener('scroll', toggleVisible);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Get data
  const getData = useCallback(() => {
    console.log(flightsData);
    const mappedBestFlight = [];
    const flag = [];
    flightsData.result.bestPrices.ONE_CONNECTION.bestFlights.map(
      (flight, i) => {
        if (!flag.includes(flight.carrier.airlineCode)) {
          flag.push(flight.carrier.airlineCode);
          mappedBestFlight.push(flight);
        }
      }
    );
    console.log(flag);
    setBestFlightData(mappedBestFlight);
    setData(flightsData.result.flights);
    setDataClone(flightsData.result.flights);
    setDisplayedData(flightsData.result.flights.slice(0, 5));
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Container>
      <Row>
        <Col md={3}>
          <Filter
            sortBy={sortBy}
            sortByDuration={sortByDuration}
            withTransfers={withTransfers}
            withoutTransfers={withoutTransfers}
            withoutTransfersChangeHandler={withoutTransfersChangeHandler}
            withTransfersChangeHandler={withTransfersChangeHandler}
            fromChangeHandler={fromChangeHandler}
            toChangeHandler={toChangeHandler}
            priceFrom={priceFrom}
            priceTo={priceTo}
            onPriceSearch={onPriceSearch}
            resetFilter={resetFilter}
            bestFlightData={bestFlightData}
            check={check}
            checked={checked}
            filterByAirline={filterByAirline}
            visible={visible}
            scrollToTop={scrollToTop}
          />
        </Col>
        <Col md={9}>
          {displayedData.length === 0 ? (
            <div className={'not-found'}>
              <img src={notFound} className={'not-found-icon'} /> <br />
              Авиарейсы не найдены!
            </div>
          ) : (
            <FlightCard data={displayedData} />
          )}

          <div className={'show-more-section'}>
            {dataClone.length >= currentCount ? (
              <Button className={'show-more-btn'} onClick={showMore}>
                Показать еще
              </Button>
            ) : (
              <></>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
