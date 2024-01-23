import React, { FC, useState } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import DatePicker from "react-datepicker";
import { ChartComponent } from "../Chart/Chart";
import { Table } from "../Table/Table";
import { Categories } from "../../store/types";

import "./Statistics.css";

type StatisticsData = {
  fromDate: Date | null;
  toDate: Date | null;
  data: Categories;
};

const prepareData = (statData: StatisticsData) => {
  return Object.values(statData.data).map((el) => ({
    name: el.name,
    count: Object.entries(el.dates)
      .map((entrie) => {
        if (
          (!statData.fromDate ||
            Number(entrie[0]) >= statData.fromDate.getTime()) &&
          (!statData.toDate || Number(entrie[0]) <= statData.toDate.getTime())
        ) {
          return entrie[1].total;
        } else {
          return 0;
        }
      })
      .reduce((prev, curr) => prev + curr, 0),
  }));
};

export const Statistics: FC = (props) => {
  const categories = useSelector(
    (state: RootState) => state.settings.categories
  );
  const [category, setCategory] = useState("");
  const [fromDate, setFromDate] = useState<null | Date>(null);
  const [toDate, setToDate] = useState<null | Date>(null);

  const statisticsData = category
    ? prepareData({
        data: categories[category].subCategories,
        fromDate,
        toDate,
      })
    : prepareData({ data: categories, fromDate, toDate });

  return (
    <div className="statistics">
      <div className="statistics__filter filter">
        <div className="filter__category">
          <select
            name="category-select"
            id="category-selectr"
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          >
            <option value="">All Categories</option>
            {Object.values(categories).map((el) => {
              return <option value={el.id}>{el.name}</option>;
            })}
          </select>
        </div>
        <div className="filter__date">
          <DatePicker
            dateFormat="dd-MM-yyyy"
            selected={fromDate}
            onChange={(dates) => {
              const [start, end] = dates;
              setFromDate(start);
              setToDate(end);
            }}
            startDate={fromDate}
            endDate={toDate}
            selectsRange
            placeholderText="Filter by Date"
          />
        </div>
      </div>
      <div className="statistics__info info">
        <div className="info__graphics">
          <ChartComponent data={statisticsData}></ChartComponent>
        </div>
        <div className="info__table">
          <Table data={statisticsData}></Table>
        </div>
      </div>
    </div>
  );
};
