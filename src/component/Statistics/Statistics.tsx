import React, { FC, useState } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import DatePicker from "react-datepicker";
import { ChartComponent } from "../Chart/Chart";
import { Table } from "../Table/Table";
import { Categories, CostDate } from "../../store/types";
import type { Dates } from "../../store/types";

import "./Statistics.css";

type StatisticsData = {
  fromDate: Date | null;
  toDate: Date | null;
  data: Categories;
};

function getFieldValues(
  object: { [key: string | symbol]: any },
  fieldName: string,
) {
  let dates: Dates[] = [];

  getProp(object, fieldName);

  function getProp(object: { [key: string | symbol]: any }, fieldName: string) {
    for (let field in object) {
      if (
        typeof object[field] === "object" &&
        Object.values(object[field]).length > 0
      ) {
        if (field === fieldName) {
          console.log(object[field]);
          dates.push({ ...object[field] });
        } else {
          getProp(object[field], fieldName);
        }
      }
    }
  }
  console.log(dates);
  return dates;
}

const prepare = (statData: StatisticsData) => {
  return Object.entries(statData.data).map((item) => {
    return {
      id: item[1].id,
      name: item[1].name,
      count: getFieldValues(item[1], "dates")
        .map((el) => {
          if (
            (!statData.fromDate ||
              Number(Object.keys(el)[0]) >= statData.fromDate.getTime()) &&
            (!statData.toDate ||
              Number(Object.keys(el)[0]) <= statData.toDate.getTime())
          ) {
            return Object.values(el)[0].total;
          } else {
            return 0;
          }
        })
        .reduce((p, c) => p + c, 0),
    };
  });
};

export const Statistics: FC = (props) => {
  const categories = useSelector(
    (state: RootState) => state.settings.categories,
  );
  const [category, setCategory] = useState("");
  const [fromDate, setFromDate] = useState<null | Date>(null);
  const [toDate, setToDate] = useState<null | Date>(null);

  const statisticsData = category
    ? prepare({
        data: categories[category].subCategories,
        fromDate,
        toDate,
      })
    : prepare({ data: categories, fromDate, toDate });

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
            onChange={(dates: any) => {
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
          {statisticsData ? (
            <ChartComponent data={statisticsData}></ChartComponent>
          ) : (
            ""
          )}
        </div>
        <div className="info__table">
          {statisticsData ? <Table data={statisticsData}></Table> : ""}
        </div>
      </div>
    </div>
  );
};
