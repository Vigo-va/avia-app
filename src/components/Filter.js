import React from 'react';
import descSort from '../assets/images/icons/desc-sort.svg';
import ascSort from '../assets/images/icons/asc-sort.svg';
import timeSort from '../assets/images/icons/time-sort.svg';
import { InputGroup, FormControl, Button, Form } from 'react-bootstrap';
import toTop from '../assets/images/icons/to-top.svg';

export const Filter = (props) => {
  const airlines = props.bestFlightData.map((airline, i) => {
    let airlineCode = airline.carrier.airlineCode;
    return (
      <div className={'form-check'}>
        <input
          type="checkbox"
          id={airlineCode}
          className="form-check-input"
          checked={props.checked[airlineCode]}
          onChange={props.filterByAirline}
        />
        <label
          data-airlinecode={airlineCode}
          htmlFor={airlineCode}
          className="form-check-label"
          onClick={props.check}
        >
          <span className="firstPart">{airline.carrier.caption}</span>{' '}
          <span className="lastPart">
            от {airline.price.amount} {airline.price.currency}
          </span>
        </label>
      </div>
    );
  });
  const sortDesc = () => {
    props.sortBy('desc');
  };
  const sortAsc = () => {
    props.sortBy('asc');
  };
  return (
    <div className={'filter'}>
      <Button
        className={'scroll-btn'}
        onClick={props.scrollToTop}
        hidden={props.visible}
      >
        <img src={toTop} className={'icon'} />
      </Button>
      <div className={'sort-section'}>
        <div className={'title'}>
          <h6>Сортировать</h6>
        </div>
        <div className={'sort-buttons'}>
          <Button className={'sort-btn'} onClick={sortAsc}>
            <img className={'sort-icon'} src={descSort} alt={'desc'} />
            <span>По возрастанию цены</span>
          </Button>
          <Button className={'sort-btn'} onClick={sortDesc}>
            <img className={'sort-icon'} src={ascSort} alt={'asc'} />
            <span>По убыванию цены</span>
          </Button>
          <Button className={'sort-btn'} onClick={props.sortByDuration}>
            <img className={'sort-icon'} src={timeSort} alt={'time'} />
            <span>По времени в пути</span>
          </Button>
        </div>
      </div>
      <div className={'filter-section'}>
        <div className={'title'}>
          <h6>Фильтрация</h6>
        </div>
        <Form>
          <Form.Check
            checked={props.withoutTransfers}
            className={'filter-switch'}
            type="switch"
            id="without-transfer"
            label="Без пересадок"
            onChange={props.withoutTransfersChangeHandler}
          />
          <Form.Check
            checked={props.withTransfers}
            className={'filter-switch'}
            type="switch"
            label="1 - Пересадка"
            id="with-transfer"
            onChange={props.withTransfersChangeHandler}
          />
        </Form>
      </div>

      <div className={'price-section'}>
        <div className={'title'}>
          <h6>Цена</h6>
        </div>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text className={'label'}>Цена</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            className={'price-inputs'}
            placeholder={'От'}
            name={'from'}
            onBlur={props.onPriceSearch}
            onChange={props.fromChangeHandler}
            value={props.priceFrom}
          />
          <FormControl
            className={'price-inputs'}
            placeholder={'До'}
            name={'to'}
            onBlur={props.onPriceSearch}
            onChange={props.toChangeHandler}
            value={props.priceTo}
          />
        </InputGroup>
        <div className={'title'}>
          <h6>Авиакомпании</h6>
        </div>
        <div className={'airlines'}>{airlines}</div>
        <div className={'set-default-section'}>
          <Button className={'set-default-btn'} onClick={props.resetFilter}>
            Сброс
          </Button>
        </div>
      </div>
    </div>
  );
};
